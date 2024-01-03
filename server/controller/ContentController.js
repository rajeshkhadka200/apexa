import MindsDB from "mindsdb-js-sdk";
export const generateContent = async (req, res) => {
  const { scope, details } = req.params;
  const content_result = await MindsDB.default.SQL.runQuery(`
  SELECT content
  FROM mindsdb.content_generator
  WHERE genre="${scope}" AND detail= "${details}";
 `);

  // const inputText = content_result.rows[0].content;
  const inputText = `
  1. Video: "Title of video"
     - description of the title.
  
  2. Reels: "Title of reel"
     - desc of title
  
  3. Blog: "Blog title"
     - Blog desc
  
  4. Social Media Post: "Title of post"
     - Post desc
  `;

  const extractData = (inputText) => {
    const items = inputText.split(/\n\d+\.\s+/).filter(Boolean);

    const result = items.map((item) => {
      const [type, rest] = item.split(":");
      const [title, desc] = rest.split("-").map((str) => str.trim());

      return {
        type: type.toLowerCase(),
        title: title.replace(/["']/g, ""),
        desc: desc.trim(),
      };
    });

    return result;
  };

  const output = extractData(inputText);
  console.log(output);
};
