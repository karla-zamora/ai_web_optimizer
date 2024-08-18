import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        //retrieve API key from environmnet variable
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        //set gemini model to use
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are an web optimizer help tool. 
            You will get pieces of code by the user, and your job is to modify them slightly according to the user's need. 
            For example, if the user wants to improve their website landing page to be more professional, 
            you will return the formatted code with the modifications as needed. Or if the user wants their page to be more colorful, only modify colors and nothing else.

            If you are asked to create code, you will return the code first, and then a short 1-2 sentence explanation depending on complexity.
            The response is formatted like this: Code:your modified code, Response:your explanation
            Your code will be ran in App.js file and App.css files only.
            Also only use native react components instead of external dependencies that would normally have to be installed.
            Make sure to use modern, elegant styling.
            If you need to use any images for any reason, use only the following link: "https://dummyimage.com/300" and nothing else.
            and resize it accordingly to the size of the font.
            Make sure every code response you provide is a react app that ends with "export default App;"`
        })
        //receive "prompt" from request
        const data = await req.json()
        //set actual prompt from request
        const prompt = data.body
        //generate ai response from the model
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text()
        //return response as json
        return NextResponse.json({output:output})
    } catch (error) {
        console.log("GenAI request error: %s", error)
    }
}