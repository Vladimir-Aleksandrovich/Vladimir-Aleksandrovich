import { useState } from "react"
import { useContext } from "react"
import { PostListContext } from "../context/PostContext"

function Form() {
 
  const [textInput, setText] = useState('')
  const [picInput, setPic] = useState('')
  const {addNewPost} = useContext(PostListContext)


  const changePic = function(e) {
  
    setPic(e.target.value)
  }
  const changeText = function(e) {

    setText(e.target.value)
  }
  const submitHandler= function(e) {
   e.preventDefault()

  const PicTrim = picInput.trim()
  const TextTrim = textInput.trim()
    if (PicTrim && TextTrim) {
     addNewPost(TextTrim, PicTrim)
     setText('')
     setPic('')
    }
  }
  
  
  
    return (
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center">
        <div>
          <input onChange={changePic} type="text" className="form-control" placeholder="url..." id="exampleInputEmail1" aria-describedby="emailHelp" value={picInput}/>
        </div>
        <div className="mb-3"> 
          <input onChange={changeText} type="text" className="form-control" placeholder="текст поста" id="exampleInputPassword1" value={textInput}/>
        </div>
        <button type="submit" className="btn btn-primary mb-3">Добавить пост</button>
      </form>
        
    )
}
export default Form