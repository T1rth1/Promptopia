"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    // console.log("id from",session?.user.id);
    const [myPosts, setMyPosts] = useState([]);
    const fetchPosts = async () => {
        // see app/api/prompt/route.js file to how we get the data...
        const response = await fetch(`/api/users/${session?.user.id}/posts`); // we make the call on this api and get the data and store it in a "allPost" state hook array..
        const data = await response.json(); // take the data which is in response format and store it in the data variable...
        setMyPosts(data);
      }
      useEffect(() => {
        if(session?.user.id) fetchPosts(); // here we called this fetchPosts() function in useEffect so it called repeatedely whenever the id of current logged in user is changed...
      },[session?.user.id]);
    const handleEdit = async(post) => {
        router.push(`/update-prompt?id=${post._id}`);
        // when this function is called then it navigate to this route /update-prompt?id=1232131...and for this we create one folder "update-prompt" and create one page.jsx file
        // then this is render that page.jsx file
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                }); // here we called the DELETE method of the /api/prompt/[id]route.js file called and in that file
                // we have a logic for deleting the prompt from the data base..
                const filteredPosts = myPosts.filter((p) => p._id !== post._id); // and take the all remaining prompts which is in our database except that
                // deleted prompt and update the "MyPosts" variable with this filtered prompts...
                setMyPosts(filteredPosts);
            }catch(error){
                console.log("error in deleting",error);
            }
        }
    }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit} // this both function passed to the Profile component and profile component is passed this both function to the PromptCard component
      // and in this PromptCard component when we click on the edit and delete button then this both function is trigerred and in this file profile/page.jsx file
      // whatever logic inside this both function is there is executed..
      // and handleEdit function render that /update-prompt/page.jsx file and in that file it make the PATCH request to this file /prompt/[id]/route.js file to update the current post..
      // and handleDelete direct have the logic to delete the post and make the DELETE request to this file /prompt/[id]/route.js to delete the current prompt(or post) from database..
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;