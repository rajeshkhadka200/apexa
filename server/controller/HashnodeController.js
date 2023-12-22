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
              post(
                slug: "${slugPart}"
              ) {
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
              }
            }
          }
        `,
      }),
    });

    let result = await response.json();
    let comments = result.data.publication.post.comments.edges;
  } catch (error) {
    console.log(error);
  }
};
