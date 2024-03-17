"use client"
import PromptCard from "@components/PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{name} Profile</span>
         </h1>
         <p className="desc text-left">{desc}</p>
         <div className="mt-10 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={()=> handleEdit && handleEdit(post)} // it is pass this both handleEdit and handleDelete function while passing the "post"  as a argument to this both function
                    // means for every different post this both function have different arguments(post)..this both function is passed as a props to this Profile.jsx component..
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile