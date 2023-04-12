const axios = require("axios");

module.exports = async (req, res) => {
  const API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        prompt: req.body.prompt,
        max_tokens: req.body.max_tokens || 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};
