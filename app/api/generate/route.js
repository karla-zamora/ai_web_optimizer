import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        //retrieve API key from environmnet variable
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        //set gemini model to use
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are an web optimizer help tool. You will get pieces of code by the user, and your job is to modify them slightly according to the user's need. For example, if the user wants to improve their website landing page to be more professional, you will return the formatted code with the modifications as needed. If you are asked to create code, only return the code and nothing else, no other text response allowed other than the code itself"
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