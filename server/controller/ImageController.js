import { getImageURL } from "../utils/function.js";
export const generateAiImage = async (req, res) => {
  try {
    const url = await getImageURL(req.body.user_input);
    if (url) {
      res.status(200).json({
        error: false,
        imgUrl: url.rows[0].img_url,
        msg: "Image generated ",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Unable to generate",
    });
  }
};
