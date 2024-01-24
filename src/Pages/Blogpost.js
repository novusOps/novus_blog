import React,{useEffect, useState} from 'react'
import './blog.css'
import BlogItem from '../Components/BlogItem'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";


const Blogpost = (props) => {
    const token = localStorage.getItem("token");
    const [blogPosts, setBlogPosts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dependency, setDependency] = useState(false)

    const navigate=useNavigate();

    useEffect(() => {
        getPost();
<<<<<<< HEAD
      }, [token, dependency]);
=======
      }, [token,dependency]);
>>>>>>> edea17f9353e2b275c64693af0be356df8daa5dd


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
              setBlogPosts(response.data.Payload);
              console.log("🚀 ~ getPost ~ response:", response)
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
            <i className="fa-solid fa-backward" ></i>
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
              changedependency={()=>handleChange()}
              onDeleteSuccess={props.onDeleteSuccess}
              
            />
          ))}

      </div>
      {blogPosts.length > 2 && (
          <div className='pagination-buttons'>
            
            <button onClick={handleNextClick} disabled={activeIndex + 2 >= blogPosts.length}>
            <i className="fa-solid fa-forward" ></i>
            </button>
          </div>
        )}
</div>
    </div>
  )
}

export default Blogpost
