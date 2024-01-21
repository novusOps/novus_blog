import React from 'react'

const UpdatePost = () => {


    const handleChange = async(e) => {
        const { name, value } = e.target;
    
        
          setBlog((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }

    const handleAddSubtitle = () => {
        setSubtitles((prevSubtitles) => [...prevSubtitles, { subtitle: "" }]);
        setBlog((prevFormData) => ({
          ...prevFormData,
          content: [
            ...prevFormData.content,
            { subtitle: "", description: [""] },
          ],
        }));
      };
    
      const handleRemoveSubtitle = (index) => {
        if (subtitles.length > 1) {
          setSubtitles((prevSubtitles) => {
            const updatedSubtitles = [...prevSubtitles];
            updatedSubtitles.splice(index, 1);
            return updatedSubtitles;
          });
          setBlog((prevFormData) => {
            const updatedContent = [...prevFormData.content];
            updatedContent.splice(index, 1);
            return { ...prevFormData, content: updatedContent };
          });
        }
      };
    
      const handleSubtitleChange = (index, e) => {
        const { value } = e.target;
        setSubtitles((prevSubtitles) => {
          const updatedSubtitles = [...prevSubtitles];
          updatedSubtitles[index] = { subtitle: value };
          return updatedSubtitles;
        });
        setBlog((prevFormData) => {
          const updatedContent = [...prevFormData.content];
          updatedContent[index].subtitle = value;
          return { ...prevFormData, content: updatedContent };
        });
      };
    
      const handleAddDescription = (index, index2) => {
        if(blog.content[index].description[blog.content[index].description.length-1]){
          setBlog((prevFormData) => {
            const updatedContent = [...prevFormData.content];
            updatedContent[index].description[index2+1]=""
            
            return { ...prevFormData, content: updatedContent };
          });
        }
      };
    
    
    
    const handleRemoveDescription = (index, index2) => {
      if (blog.content[index].description.length > 1) {
        setBlog((prevFormData) => {
          const updatedContent = [...prevFormData.content];
          updatedContent[index].description.splice(index2, 1);
          return { ...prevFormData, content: updatedContent };
        });
      }
    };
    
    
      const handleDescriptionChange = (index,index2, e) => {
        const { value } = e.target;
        
        setBlog((prevFormData) => {
          const updatedContent = [...prevFormData.content];
          updatedContent[index].description[index2] = value;
          return { ...prevFormData, content: updatedContent };
        });
      };
  return (
    <div>
        <div className="modal" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Update Blog</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        

      <form onSubmit={handleSubmit}>
        {successMessage && <div className="success-message">{successMessage}</div>}


          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={blog.title}
            onChange={handleChange}
          />

          <label>Choose Image</label>
         
             <input
                  type="file"
                  id="imageInput"
                  style={{ height:'25px' ,'::placeholder': { height: '23px' } }}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const base64Image = e.target.result;
                        setSelectedImage({
                          media_b64: base64Image.split(",")[1],
                          file_name: file.name,
                        });
                        setFilePreview(file);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

          <div>
       {subtitles.map((sub, index) => (
         <> 
         <label>SubTitles</label>
                 <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder={`Enter subtitle ${index + 1}`}
                  name={`subtitle${index}`}
                  value={sub.subtitle}
                  onChange={(e) => handleSubtitleChange(index, e)}
                />
                <i
                  className="fa-solid fa-plus"
                  style={{ color: 'white', marginLeft: '10px' }}
                  onClick={handleAddSubtitle}
                ></i>
                {index > 0 && (
                  <>
                    <i
                      className="fa-solid fa-minus"
                      style={{ color: 'white', marginLeft: '10px' }}
                      onClick={() => handleRemoveSubtitle(index)}
                    ></i>
                  </>
                )}
              </div>
            
          <label>Descriptions</label>
          <div>
            {blog.content[index].description.map((desc, index2) => (
              <div key={index2} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <textarea
                  type="text"
                  placeholder={`Enter description ${index2 + 1}`}
                  rows={4}
                  name={`description${index2}`}
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index,index2, e)}
                />
                <i
                  className="fa-solid fa-plus"
                  style={{ color: 'white', marginLeft: '10px' }}
                  onClick={()=>handleAddDescription(index, index2)}
                ></i>
                {index2 > 0 && (
                  <>
                    <i
                      className="fa-solid fa-minus"
                      style={{ color: 'white', marginLeft: '10px' }}
                      onClick={() => handleRemoveDescription(index, index2)}
                    ></i>
                  </>
                )}
              </div>
            ))}
          </div>
          </>
          ))}
          </div>

          <div className='checkbox-wrapper'>
            <label htmlFor='isFeatured' className='checkbox-label'>
              Is Featured:
            </label>
            <input
              type='checkbox'
              id='isFeatured'
              name='is_featured'
              className='checkbox-input'
              checked={blog.is_featured}
              onChange={() => setBlog((prevFormData) => ({ ...prevFormData, is_featured: !prevFormData.is_featured }))}
            />
          </div>

          <button className='btt1' type='submit'>
            Post Blog
          </button>
        </form>


      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default UpdatePost