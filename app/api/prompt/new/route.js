import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
    const { userId, prompt, tag} = await req.json();
    try{
        await connectToDB(); // now when this api/prompt/new route is triggered then it conncet with the mongoDB
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        }); // here we create a new prompt for this we created a model "Prompt" in "models" folder..and used this "Prompt"
        // model here ..this model has the creator means current loggedIn "userId" and and prompt and tag..which is coming from the 
        // page.jsx file of create-prompt folder when we make the POST request with all of this data(userId,prompt,tag) and destructure here..
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201})
    }catch(error){
        return new Response("Failed to create a new prompt",{status:500});
    }
}