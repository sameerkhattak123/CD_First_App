const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// Route to handle response and generate SQL query
const translateToSql =  async (req, res) => {
    const { response } = req.body;

    if (!response) {
        return res.status(400).json({ error: 'Response is required' });
    }

    try {
        // Generate SQL query based on user input
        const responseFromOpenAI = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": response },
                { "role": "user", "content": "Generate SQL query based on the response." }
            ],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
        });

        const sqlQuery = responseFromOpenAI.data.choices[0].message.content.trim();
        res.json({ sqlQuery });
    } catch (error) {
        console.error('Error generating SQL query:', error);
        res.status(500).json({ error: 'Failed to generate SQL query' });
    }
};

module.exports = {
    translateToSql,
};
