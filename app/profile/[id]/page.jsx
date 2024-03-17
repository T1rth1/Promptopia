"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
// this page is for when logged in user click on the other user's profile then we should render this page means other user's profile...
const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name"); // we take the params "name" which we pass from the PromptCard.jsx file through the url...

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`); // make the get request to this page api/users/[id]/posts/route.js and 
      // get back the all data related to that particular user...
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts(); // if params.id exist then this fetchPosts() is called
  }, [params.id]);

  return (
    <Profile
      name={userName} // we pass the name of that particular user to the profile component
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts} // pass the description and userPosts which we get back from the useEffet function
      // and this is the posts which is created by that particular user..and we render that posts of that particular user to that particular user's profile page
    />
  );
};

export default UserProfile;