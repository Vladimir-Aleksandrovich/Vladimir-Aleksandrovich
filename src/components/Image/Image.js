// import { useContext } from "react"
// import { PostListContext } from "../context/PostContext"



const Image = function({pic}) {
// const {pic} = useContext(PostListContext)



    return (
      <div >
          <img src={pic} alt="фиг"/>
      </div>
        
       
    )
}
export default Image