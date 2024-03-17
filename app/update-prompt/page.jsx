"use client";

import { useEffect,useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    // this page also goes as the children prop for the RootLayout.jsx file..
    // and navbar and other background gradient effect is applied to this create prompt page automatically..
    // and functionality of this "/update-prompt" page is implemented in this page.jsx file..
    // how cool nextJs is!😎
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id"); //  after clicking on the Edit button we went on this page /update-prompt?id=${post._id} we get the id of that current post from there..
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    });
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`) // we make the request to the /api/prompt/promptId and get back the data from that route..see api/prompt/[id]/route.js file for this logic
            // for this GET function is triggered which is inside this file api/prompt/[id]/route.js 
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if(promptId) getPromptDetails(); // if promptId exist then we called this getPromptDetails function...
    },[promptId])
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // this is the same function as we created in the create-prompt route...
    if(!promptId) return alert("prompt ID not found");
        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH', // we make a request on the api/prompt/[id]/route.js file and in that file PATCH function is trigerred
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag // this "post" hook state variable is already have some value because we make a get request using the "useEffect" 
                    // function and set this "post" hook state and after this when when user clicked on the
                    // editpost button then we change the "post" hook using setPost function in that Form.jsx file and we use it here that hook state "post"..
                    // because we passing the same hook state to the Form.jsx file..
                }) // we make a post request to this api route with passing the JSON object which contain the prompt and tag of that particular prompt..
                // and we destruture this data into the /api/prompt/[id]/route.js file..and use it to update the new data(prompt and tag) into data base..
            })
            if(response.ok){
                router.push("/"); // and if we update the response sucessfully then redirect to the homepage..
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost} // here when this Edit Post page is loaded then it has already the prompt and tag filled because when this page is loaded 
        // it make a get request on this file /api/prompt/[id]/route.js and get back the data for that particular prompt and set the hookstate "post" by using this data(prompt and tag)..
        submitting={submitting}
        handleSubmit={updatePrompt}
    /> // here we create one Form component and passed the props..in this props we passing this updatePrompt function, setPost hook function and submitting variable
  )
}

export default EditPrompt