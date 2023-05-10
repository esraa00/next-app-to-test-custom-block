export default function Page(props) {
  const blocks = props.data.data.page.blocks;
  const regex = /"content":"([^"]*)"|"url":"([^"]*)"/g;
  const finalResult = [];

  const matches = JSON.stringify(blocks).match(regex);
  matches.forEach((match) => {
    const value = match.replace(/"/g, "");
    finalResult.push(value);
  });

  console.log(finalResult);
}

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost/wordpress/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `{
  page(id: "6", idType: DATABASE_ID) {
    ... on ContentNode {
      id
      databaseId
    }
    ... on BlockEditorContentNode {
      blocks {
        __typename
        ... on CreateBlockGutenprideBlock {
          innerBlocks {
            ... on CoreParagraphBlock {
              attributes {
                ... on CoreParagraphBlockAttributes {
                  content
                }
              }
            }
            ... on CoreHeadingBlock {
            	attributes {
                ... on CoreHeadingBlockAttributes {
                  content
                }
              }
            }
            ... on CoreGalleryBlock {
              innerBlocks {
                ... on CoreImageBlock {
                  attributes {
                    ... on CoreImageBlockAttributes {
                      url
                    }
                  }
                }
              }
            }
            ... on CoreImageBlock {
              attributes {
                ... on CoreImageBlockAttributes {
                  url
                }
              }
            }
            ... on CoreListItemBlock {
              attributes {
                ... on CoreListItemBlockAttributes {
                  content
                }
              }
            }
            ... on CoreListBlock {
              innerBlocks {
                ... on CoreListItemBlock {
                  attributes {
                    ... on CoreListItemBlockAttributes {
                      content
                    }
                  }
                }
              }
            }
          }
        }
        ... on CoreParagraphBlock {
          attributes {
            ... on CoreParagraphBlockAttributes {
              content
            }
          }
        }
        ... on CoreImageBlock {
          attributes {
            ... on CoreImageBlockAttributes {
              href
            }
          }
        }
        ... on CoreParagraphBlock {
          attributes {
            ... on CoreParagraphBlockAttributes {
              content
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

    const data = await response.json();

    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
