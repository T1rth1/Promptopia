import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit}) => { // destructure the props which we passed earlier..
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
            {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
        </p>
        <form 
            onSubmit={handleSubmit} // when below both button which has type is "submit" is clicked then this handleSubmit get called
            // and this function comes from the page.jsx file of "create-prompt" folder
            // and this "handleSubmit" function  is a "createPrompt" function in that file..see that file
            // and this "createPrompt" function is set the "submitting" variable true and based on in this file "submitting" variable passed is updated..
            // and after component rendered which has to be...and it make the POST request on the api route /api/prompt/new...go to this folder 
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e)=> setPost({...post,prompt:e.target.value})} // here we spread out the prompt which is entered by the user
                        // means other variable remain unchanged..and this setPost function comes from page.jsx file of create-prompt folder
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"   
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag <span className="font-normal">(#product,#webdevelopment,#idea)</span>
                    </span>
                    <textarea
                        value={post.tag}
                        onChange={(e)=> setPost({...post,tag:e.target.value})} // same as above ,here "tag" is spread out to the "post" hook state
                        placeholder="#tag"
                        required
                        className="form_input"   
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <button
                        type="submit"
                        disabled={submitting} // when submitting is true then this button got disabled means it still appear but when user clicked functionality of button is not worked
                        // means button is not remain clickable while "submitting" variable is true...
                        className="px-5 pt-1.5 pb-2 border border-black text-sm transition-all hover:bg-primary-orange outline outline-1 rounded-full hover:text-white"
                    >
                    <Link href="/" className="text-sm"> {/*head over to the the home route */}
                        Cancel
                    </Link>
                    </button>
                    <button
                        type="submit"
                        disabled={submitting} // same as above this button disabled when submitting variable is true
                        className="outline outline-1 border border-black px-5 pt-1.5 pb-2 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...`:type} {/* means if form is submitting currently then render "creating..." or "updating..."
                        otherwise render the only "create" and "update" */}
                    </button>
                </div>
            </form>
    </section>
  )
}

export default Form