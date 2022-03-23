import { useContext } from "react"
import { PostListContext } from "../context/PostContext"


const PostItem = function({id, text, pic}) {


    const {deletePost} = useContext(PostListContext)
    const deleteHandler = function() {
        deletePost(id)
    }

   return(
        
        <li className="Card d-flex flex-column align-items-center w-30">
               <div>
          <img className="image w-100" src={pic} alt="фиг"/>
               </div>
           <span>
               {text}
           </span>
           <div>
               <button onClick={deleteHandler} type="button" className="btn btn-danger">Delete</button>
           </div>
       </li>
     
    )
}
export default PostItem