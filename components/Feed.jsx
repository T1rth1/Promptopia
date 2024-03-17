"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
     {/* here in this function we iterate over to the allPosts and render the promptCard for each of the prompt individually */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
}
const Feed = () => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value); // set the searchText state variable by this serachBar's input

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value); // it called the filteredPrompts function by passing this search which is entered by the user..
        // and update the "searchedResults" state variable
        setSearchedResults(searchResult);
      }, 500)
    );
  }
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    // now set the "searchText" state variable value by the tag name..
    // and searchBar has a "value" as a "searchText" variable has so it automatically filled up when this "searchText" vaariable is updated..
    const searchResult = filterPrompts(tagName); // pass this "tag" name to the filteredPrompts function...
    setSearchedResults(searchResult); // get the all results back to this particular tag and set the "searchedResults" state variable by this result..
    // and now "searchText" is some value "tag name" so it is render the "PromptCardList" which has props is {searchedResults}...
  };
// console.log(allPosts);

  const fetchPosts = async () => {
    // see app/api/prompt/route.js file to how we get the data...
    const response = await fetch("/api/prompt"); // we make the call on this api and get the data and store it in a "allPost" state hook array..
    const data = await response.json(); // take the data which is in response format and store it in the data variable...
    setAllPosts(data);
  }
  useEffect(() => {
    fetchPosts(); // here we called this fetchPosts() function in useEddect so it called repeatedely when ever page reloaded...
  },[])
  // alert(posts);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
      // it searched for( or compared with the searchText) either the username or tag or email or prompt 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.creator.email) ||
        regex.test(item.prompt)
    );
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          > 
          {/* when use entered the text into this searchBar then on change it called the handleSearchChange function... 
          value of this searchBar is "searchText" variable*/}
          </input> {/* we make a search bar for searching the promptCard based on it's tag's and prompt */}
      </form>
      {searchText ? (
        // if "searchText" is there then render this below PromptCardList component...
        // which accept the state variable searchedResults as a props which is updated according to "searchText"...
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick} // when user clicked on this tag then handleTagClick function is trigerred...
        />
      ):(
        // and if searchText is not there then render the all posts
      <PromptCardList 
        data={allPosts} // we pass over this whole allPosts as a data to this "PromptCardList" component..
        handleTagClick={handleTagClick}
      />
      )}
    </section>
  )
}

export default Feed