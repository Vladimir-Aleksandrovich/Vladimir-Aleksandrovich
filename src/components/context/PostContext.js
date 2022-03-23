import { createContext, useEffect, useState } from "react";

const LSPostsKey = "posts"

const PostListContext = createContext()

const PostListProvider = ({children}) => {
    const [posts, setPosts] = useState([])
  const addNewPost = (text, pic) => {
    setPosts(prev => [...prev, {
      id: Date.now(),
      pic,
      text,
    }])
  }
  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }
 
  useEffect(() => {
    const dataFromLs = localStorage.getItem(LSPostsKey)
    if (dataFromLs) {
      setPosts(JSON.parse(dataFromLs))

    }
  }, [])


  useEffect(() => {
    localStorage.setItem(LSPostsKey, JSON.stringify(posts))
  }, [posts])

  return (
     <PostListContext.Provider value={{posts, addNewPost, deletePost}}>
{
    children
}
     </PostListContext.Provider>


  )
}
export default PostListProvider

export {
    PostListContext
}
