const api_key = process.env.GEMINI_API_KEY;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ai = new GoogleGenerativeAI(api_key);

const bot = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const model = ai.getGenerativeModel({model:'gemini-2.5-flash'});
        const result = await model.generateContent(prompt);
        return res.json({ text: result.response.text() });
    }catch(err){
        console.error(err.stack);
        return res.status(500).json({error:err.message})
    }
}

module.exports={bot};