import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    // this GET request is used in the /update-prompt/page.jsx file to update the state variable "post" with already created prompt and tag...
    // using useEffect function
    try{
        await connectToDB(); // here we connect to DB using this function connectToDB()..
        const prompt = await Prompt.findById(params.id) // this search for all documents in the "Prompt" collection
                                    .populate('creator'); 
        if(!prompt) return new Response("Prompt not found",{ status: 404});
        return new Response(JSON.stringify(prompt), { status: 200}); // send back the whole response to the front-end..
        // this response contains prompt,tag and added "creator" whole object with creator's id,email,username,profilePicture attatched..
    }catch(error){
        return new Response("Failed to fetch all prompts",{status:500});
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id); // we take the id from the "update-prompt?id=12345" route
        // using params.id
        // here we take the new updated prompt and tag which we passed as a json..
        if(!existingPrompt) return new Response("Prompt not found",{status:404});
        existingPrompt.prompt = prompt; // now we update the existingPrompt's prompt by the new updated prompt
        existingPrompt.tag = tag; // update the tag also 
        await existingPrompt.save(); // save the new updated prompt to the data base..
        return new Response(JSON.stringify(existingPrompt),{status:200})
    }catch(error){
        return new Response("Failed to update prompt",{status:500});
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try{
        console.log("prompt deleted",params.id);

        await connectToDB();
        // "/create-prompt?id=12334" we get the this id using this params.id..
        const deletedPrompt = await Prompt.findOneAndDelete({ _id: params.id }); // just remove that particular prompt by using it's id only..
        if (!deletedPrompt) {
            console.log("Prompt not found for deletion:",params.id);
            return new Response("Prompt not found", { status: 404 });
        }

        console.log("Prompt deleted successfully:", deletedPrompt);
        return new Response("Prompt deleted successfully!", { status: 200 });
    }catch(error){
        return new Response("Failed to delete prompt",{status:500});
    }
}