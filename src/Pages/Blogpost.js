import React,{useEffect, useState} from 'react'
import './blog.css'
import BlogItem from '../Components/BlogItem'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";


const Blogpost = () => {
    const token = localStorage.getItem("token");
    const [blogPosts, setBlogPosts] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        getPost();
       
      }, [token,]);


    const getPost = async () => {
    
        try {
          const response = await axios.get(`${BASE_URL}/post_login/blog/fetch_blog_post/`, {
            headers: {
              Authorization: "x@pcPvmFcaUrMHQKY4@pNYG22rE&vAk&P-YmnjWx-/mGxr2wcqXXVUnW89S?d@6S",
              "Content-Type": "application/json",
              accesstoken: `${token}`,
            },
          });
          if (response.status === 200) {
            if (response.data.Status === 200) {
              // localStorage.setItem("token", response.data.new_access_token);
              setBlogPosts(response.data.Payload);
            } else {
              // Handle unsuccessful login (e.g., show an error message)
              console.error("Unsuccessful login:", response.data.Message);
            }
              console.log("🚀 ~ getPost ~ response.data.Payload:", response.data.Payload)
          } else {
            // Handle other status codes
            console.error("Unexpected status code:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const handleBlogClick=(item)=>{
        navigate('/blogdetails', {state:item})
    }
  
  

  return (
    <div>
              <div className='container'> 

            <div className='blogs' style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {blogPosts.map((item) => (
            <BlogItem
                Id={item.blog_id}

              title={item.title}
              addedDate={item.added_date}
              imageUrl={item.blog_image_url}
              isFeatured={item.is_featured}
              author={item.author_name}
              onClick={() => handleBlogClick(item)}
              
            />
          ))}

      </div>
</div>
    </div>
  )
}

export default Blogpost