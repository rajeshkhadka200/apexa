import {
  getPercentage,
  getSentiment,
  getSummary,
  removeMarkdownSyntax,
} from "../utils/function.js";
import Blog from "../model/blog.schema.js";

export const getBlog = async (req, res) => {
  const { blogURL, user_id } = req.body;
  const urlObject = new URL(blogURL);
  const hostPart = urlObject.host;
  const slugPart = urlObject.pathname.replace(/^\/+/, "");

  try {
    let response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query Pubs {
            publication(host: "${hostPart}") {
              id
              title
              post(
                slug: "${slugPart}"
              ) {
                coverImage {
                  url
                }
                content {
                  markdown
                  html
                }
                comments(first:50) {
                  edges{
                    node{
                      id 
                      author{
                        username
                        profilePicture
                      }
                        content{
                        text
                      }
                    }
                  }
                }
                title
              }
            }
          }
        `,
      }),
    });

    let result = await response.json();
    let comments = result.data.publication.post.comments.edges;
    let markdown = result.data.publication.post.content.markdown;
    let title = result.data.publication.post.title;
    let creatorName = result.data.publication.title;
    let coverImage = result.data.publication.post.coverImage.url;
    const blogData = await Blog.findOne({ "details.blog_url": blogURL });
    const commentsArray = [];
    comments.forEach((comment) => {
      commentsArray.push({
        username: comment.node.author.username,
        profilePicture: comment.node.author.profilePicture,
        comment: comment.node.content.text.replace(/(\r\n|\n|\r)/gm, ""),
      });
    });
    if (blogData) {
      console.log("Blog exist in DB");
      if (commentsArray.length > blogData.prevComment) {
        console.log("New comments found");
        const sentiment = await getSentiment(
          blogData.prevComment,
          commentsArray,
          "hashnode"
        );

        console.log("The total no. of new sentiment: ", sentiment.length);
        console.log(sentiment);

        const {
          appreciation_percentage,
          hate_percentage,
          neutral_percentage,
          spam_percentage,
        } = getPercentage(sentiment);

        const newAppreciation =
          (blogData.insights.appreciation * blogData.prevComment +
            appreciation_percentage * sentiment.length) /
          (blogData.prevComment + sentiment.length);

        const newHate =
          (blogData.insights.hate * blogData.prevComment +
            hate_percentage * sentiment.length) /
          (blogData.prevComment + sentiment.length);

        const newNeutral =
          (blogData.insights.neutral * blogData.prevComment +
            neutral_percentage * sentiment.length) /
          (blogData.prevComment + sentiment.length);

        const newSpam =
          (blogData.insights.spam * blogData.prevComment +
            spam_percentage * sentiment.length) /
          (blogData.prevComment + sentiment.length);

        const newLike = newAppreciation + (100 - newHate - newAppreciation) / 2;
        const newDislike = 100 - newLike;

        //update the data in DB
        const updatedData = await Blog.findOneAndUpdate(
          { "details.blog_url": blogURL },
          {
            insights: {
              appreciation: newAppreciation,
              hate: newHate,
              neutral: newNeutral,
              spam: newSpam,
              overall: {
                like: newLike,
                dislike: newDislike,
              },
            },
            prevComment: commentsArray.length,
          },
          { new: true }
        );

        //send to frontend
        return res.status(200).json({
          message: "Success",
          data: updatedData,
        });
      }

      //send to frontend
      return res.status(200).json({
        message: "Success",
        data: blogData,
      });
    } else {
      console.log("Processing for new Blog");
      const sentiment = await getSentiment(0, commentsArray, "hashnode");
      console.log("The total no. of new sentiment: ", sentiment.length);
      console.log(sentiment);

      const {
        appreciation_percentage,
        hate_percentage,
        neutral_percentage,
        spam_percentage,
        like_percentage,
        dislike_percentage,
      } = getPercentage(sentiment);
      const repharesMarkdown = removeMarkdownSyntax(markdown);
      const summary = await getSummary(repharesMarkdown, "hashnode");

      //save to db
      const blog = new Blog({
        user_id: user_id,
        details: {
          blog_url: blogURL,
          title: title,
          creator: creatorName,
          creator_pic: "",
          thumbnail: coverImage,
          comment: commentsArray.length,
          like: 45,
        },
        insights: {
          appreciation: appreciation_percentage,
          hate: hate_percentage,
          neutral: neutral_percentage,
          spam: spam_percentage,
          overall: {
            like: like_percentage,
            dislike: dislike_percentage,
          },
        },
        summary: summary,
        prevComment: commentsArray.length,
      });

      await blog.save();

      //send to frontend
      res.status(200).json({
        message: "Success",
        data: blog,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteblogHistory = async (req, res) => {
  const { blog_url } = req.body;
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      "details.blog_url": blog_url,
    });

    return res.status(200).json({
      mesg: deletedBlog.details.blog_url + " Deleted syccessfully",
      id: deletedBlog.details.blog_url,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Internal Server Error, while deleting blog tracker",
    });
  }
};
