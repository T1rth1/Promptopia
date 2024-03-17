import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try{
        await connectToDB(); // here we connect to DB using this function connectToDB()..
        const prompts = await Prompt.find({}) // this search for all documents in the "Prompt" collection
        // The {} inside the find() method is an empty query object, which means it will return all documents without any specific filtering criteria..
        // means return all documents of that prompt collection..
                                    .populate('creator'); // this populate method is used for
// The .populate() method is used to populate a field in the current documents with data from another collection. 
// In this case, 'creator' is the field that will be populated. 
// This assumes that your "prompts" collection has a field named "creator" that stores references of actual user model data from the "User" collection.
// When you use .populate('creator') in a Mongoose query, 
// it replaces the reference to the creator's ID in the queried documents with the actual user model data from the "User" collection.
        return new Response(JSON.stringify(prompts), { status: 200}); // send back the whole response to the front-end..
        // this response contains prompt,tag and added "creator" whole object with creator's id,email,username,profilePicture attatched..
    }catch(error){
        return new Response("Failed to fetch all prompts",{status:500});
    }
}