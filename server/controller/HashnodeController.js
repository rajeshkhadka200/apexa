export const getBlog = async (req, res) => {
  const { blogURL } = req.body;

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
                content {
                  markdown
                  html
                }
                comments(first:50) {
                  edges{
                    node{
                      id 
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
    let coverImage = result.data.publication.post.coverImage;
  } catch (error) {
    console.log(error);
  }
};
