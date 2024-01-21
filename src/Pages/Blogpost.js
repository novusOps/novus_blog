import React,{useEffect, useState} from 'react'
import './blog.css'
import BlogItem from '../Components/BlogItem'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";


const Blogpost = () => {
    const token = localStorage.getItem("token");
    const [blogPosts, setBlogPosts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dependency, setDependency] = useState(false)

    const navigate=useNavigate();

    useEffect(() => {
        getPost();
        console.log('vivek is our god')
      }, [token,dependency]);


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
              
              console.error("Unsuccessful login:", response.data.Message);
            }
              console.log("🚀 ~ getPost ~ response.data.Payload:", response.data.Payload)
          } else {
            
            console.error("Unexpected status code:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const handleBlogClick=(item)=>{
        navigate('/blogdetails', {state:item})
    }
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => prevIndex + 2);
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };
  
  const handleChange=()=>{
    setDependency((prev)=>!prev)

  }
  return (
    <div>
              <div className='container' style={{display:'flex', alignItems:'center'}}> 
              {blogPosts.length > 2 && (
          <div className='pagination-buttons'>
            <button onClick={handlePrevClick} disabled={activeIndex === 0}>
            <i class="fa-solid fa-backward" ></i>
              {/* Previous */}
            </button>
            </div>
        )}
            <div className='blogs' style={{display:'flex', justifyContent:'center'}}>
            {blogPosts.slice(activeIndex, activeIndex+2).map((item) => (
            <BlogItem
                Id={item.blog_id}

              title={item.title}
              addedDate={item.added_date}
              imageUrl={item.blog_image_url}
              isFeatured={item.is_featured}
              author={item.author_name}
              onClick={() => handleBlogClick(item)}
              // dependency={dependency}
              changedependency={()=>handleChange()}
              
            />
          ))}

      </div>
      {blogPosts.length > 2 && (
          <div className='pagination-buttons'>
            {/* <button onClick={handlePrevClick} disabled={activeIndex === 0}>
              Previous
            </button> */}
            <button onClick={handleNextClick} disabled={activeIndex + 2 >= blogPosts.length}>
            <i class="fa-solid fa-forward" ></i>
            </button>
          </div>
        )}
</div>
    </div>
  )
}

export default Blogpost