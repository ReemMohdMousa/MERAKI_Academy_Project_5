import React from 'react'
import "./style.css"
const Comments = () => {
  return (
    <div className='comments'>
       <div className='write'>
        <img src="https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp" alt=""/>
        <input placeholder='Write a comment'/>
        <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg></button>
        </div>
        {/* comments.map */}
        
        <div className='comment'>
            <img src="https://static.photocdn.pt/images/articles/2018/12/05/articles/2017_8/beginner_photography_mistakes-1.webp" alt=""/>
      <div className='info'>
        <span>Doaa Ali</span>
        <p>Get free finance training created by experts at Corporate Finance Institute.</p>
      </div>
      <span className='date'>1 hour ago</span>
        </div>

  





    </div>
    

  )
}

export default Comments