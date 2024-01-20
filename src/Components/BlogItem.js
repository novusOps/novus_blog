import React from 'react'
import './BlogItem.css'
import axios from 'axios';
const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";


const BlogItem = (props ) => {
  const {Id, title,addedDate,imageUrl,isFeatured,author ,onClick} =props;
  
  const dateObject = new Date(addedDate);
  const formattedDate = dateObject.toLocaleDateString();
  const token = localStorage.getItem("token");
 



  const deletePost = async (Id) => {
    
    try {
      const response = await axios.get(`${BASE_URL}/post_login/blog/delete_blog_post/${Id}`, {
        headers: {
          Authorization: "x@pcPvmFcaUrMHQKY4@pNYG22rE&vAk&P-YmnjWx-/mGxr2wcqXXVUnW89S?d@6S",
          "Content-Type": "application/json",
          accesstoken: `${token}`,
        },
      });
      if (response.status === 200) {
        if (response.data.Status === 200) {
          localStorage.setItem("token", response.data.new_access_token);
        } else {
          
          console.error("Unsuccessful login:", response.data.Message);
        }
          
      } else {
        
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const slicedTitle = title.slice(0, 30);
   

  return (
    <div>
            <div className='blogcontets'  >

                <div className='blogtit'>
                  <div className='blogdele ' style={{display: 'flex',alignItems:'center', justifyContent:'space-between'}}>
                    <span className='title'> {slicedTitle}</span>
                    
                    <i class="fa-solid fa-trash-can" style={{color:'white', cursor:'pointer' }} onClick={()=>{deletePost(Id)}
                    }></i>

                  </div>
                    <img src={imageUrl} alt=''onClick={()=>onClick()}/>
                </div> 
                <div className='des'>
                    <span className='subtitle'>{author}</span>
                    
                   <span className='subtitle'>IsFeature:{String(isFeatured)}</span>
                   <span className='subtitle'>{formattedDate}</span>


                </div>

            </div>
    </div>
  )
}

export default BlogItem