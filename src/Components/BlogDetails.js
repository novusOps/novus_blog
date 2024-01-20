import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './blogDetails.css'

const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";

const BlogDetails = () => {

  const location=useLocation();
  
   const item=location.state;
   
  
    const token = localStorage.getItem("token");
    
    const [blogDetails, setBlogDetails] = useState(null);
    

    useEffect(() => {
        getPostdetails();
       
      }, [token, ]);


    const getPostdetails = async () => {
    
        try {
          const response = await axios.post(`${BASE_URL}/post_login/blog/fetch_blog_post/`,{blog_id:item.blog_id}, {
            headers: {
              Authorization: "x@pcPvmFcaUrMHQKY4@pNYG22rE&vAk&P-YmnjWx-/mGxr2wcqXXVUnW89S?d@6S",
              "Content-Type": "application/json",
              accesstoken: `${token}`,
            },
          });
          console.log("🚀 ~ getPostdetails ~ response:", response)
          if (response.status === 200) {
            if (response.data.Status === 200) {
             
              setBlogDetails(response.data.Payload);
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
      if (!blogDetails) {
        return <p>Loading...</p>;
    }


    return (
      <div>
      
        <div className="blogSection">
        <div className="blog-section-details-div">
          <h5 className="blogDetailsText">
          {blogDetails.map((item) => item?.title)}

          </h5>
          <div className="logo-date-main">
            <div className="logo-left-main">
              <img width={30} src="/assets/profile-logo.svg" alt="" />
              <p>{blogDetails.map((item)=>item.author_name)}</p>
            </div>
            <div className="vertical-line" />
            <div className="logo-right-main">
              <img width={20} src="/assets/date-logo.svg" alt="" />
              <p>
              <p>{blogDetails.map(
                  (item) => item?.added_date.split('T')[0]
                )}</p>

              </p>
            </div>
          </div>
          <img
            style={{ borderRadius: '15px', objectFit: 'cover' }}
            height={'400px'}
            width={'100%'}
            src={blogDetails.map((item) => item?.blog_image_url)}
            alt="blog_image"
          />
          <div className="main-content-blogDetails">

            <div className="main-content-left-side">
              <div className="inner-left " style={{flex:2}}>
              <div className="content-inner-left">
                 
                 {blogDetails.map((item) =>
                   item?.blog_content?.map((data) => (
                     <>
                       <div
                         key={data?.content_id}
                         className="inner-content"
                        
                       >
                         <p
                           className=
                             
                               'inner-content-bold' 
                               
                           style={{margin:'0px'}}
                         >
                           {data?.content?.subtitle}
                         </p>
                         {data?.content?.description.map((desc, index) => (
                     <p style={{color:'rgba(93, 103, 125, 1)'}} key={index}>{desc}</p>
                   ))}
                       </div>
                     </>
                   ))
                 )}
               </div>
              </div>
              </div>
              </div>
              </div>
              </div>

    </div>
  )
}

export default BlogDetails