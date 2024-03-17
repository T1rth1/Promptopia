"use client"

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post,handleTagClick,handleEdit,handleDelete}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""),3000); // wait untill the 3 seconds and make "copied variable" to empty
  }
  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile"); // if the current logged in user id is same as the created post's user id then we render the /profile page
    // which is only responsible for render the profile page for that logged in user(myprofile page)

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); // otherwise render the page.jsx which is inside the
    // /profile/[id]/page.jsx and we render this page simply head over to that page means simply navigate to that page..go to that page ans see next steps
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
         onClick={handleProfileClick} // when user click on any profile of another user then this function is called..
        >
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"/>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
        {/* when user click on the copy button then it called this handleCopy function and in that function 
            we set the state "copied" with that current prompt and use writeText to clipboard function to copy this prompt to clipboard..
            and after some 3 seconds we set the "copied" state variable to empty...
        */}
          <Image
              src={copied === post.prompt ? "/assets/icons/tick.svg":"/assets/icons/copy.svg"}
              /* to render the copy button and tick button logic when "copied" variable has same prompt as current prompt then render the tick image...
            and when copied variable get empty then it render the copy button */
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)} // if handleTagClick function is exist then when user clicked on the any tag then this function is called
        //  and this function is passed as the props to this component...from the Feed.jsx file it is pass as props to this PrompCard component...
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && ( // if it is check session user's id is same as post creator's id
      // and also check if the current path is profile path or not and if both condition is true then it is render this bewlow "div"..
      // and in this div it called the handleEdit and handleDelete function which is passed as a props to this PromptCard component...
      // and this props is passed from the profile.jsx file..
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          > Edit </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          > Delete </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard