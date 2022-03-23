
import { useContext } from "react"
import { PostListContext } from "../context/PostContext"
import PostItem from "../PostItem/PostItem"




const PostList = function() {
    const {posts} = useContext(PostListContext)


    return (
      <>
      {
          posts.map((post) => {
              return (
            
            <ul >
                <PostItem id={post.id} text={post.text} pic={post.pic}/>
            </ul>
            )
        })
      }
      </>
    



    )
    
}
export default PostList