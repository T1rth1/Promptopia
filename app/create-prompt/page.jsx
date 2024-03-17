"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreatePrompt = () => {
    // this page also goes as the children prop for the RootLayout.jsx file..
    // and navbar and other background gradient effect is applied to this create prompt page automatically..
    // and functionality of this "/create-prompt" page is implemented in this page.jsx file..
    // how cool nextJs is!😎
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    });
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag // this "post" state hook is updated from the Form.jsx file when user clicked on the
                    // creatpost button then we change the "post" hook using setPost function in that Form.jsx file and we use it here that hook state "post"..because we passing the same hook state to the
                    // Form.jsx file..
                }) // we make a post request to this api route with passing the JSON object which contain the prompt,userId and tag of that particular prompt..
                // and we destruture this data into the prompt/new/route.js file..
            })
            if(response.ok){
                router.push("/"); // and if we post the response sucessfully then redirect to the homepage..
                
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    /> // here we create one Form component and passed the props..in this props we passing this createPrompt function, setPost hook function and submittin variable

  )
}

export default CreatePrompt