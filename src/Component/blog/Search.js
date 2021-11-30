import React from 'react'
import { useState } from 'react'

// Search blog by searchTitleBlog
export default function Search({searchTitleBlog}) {
   const [text, setText] = useState("")
   const handleSearch = (event) => {
    return setText(event.target.value);
  };  

  const searchTitle = () => {
    return searchTitleBlog(text);
  };
  
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h3>Search</h3>
                </div>
                <div className="card-body">
                <div class="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                     class="form-control"
                    onChange={handleSearch}
                    />
                </div>  
                <div className="form-group text-center mt-3">
                    <button className="btn btn-outline-primary"
                    onClick={searchTitle}
                    >
                        Search
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
