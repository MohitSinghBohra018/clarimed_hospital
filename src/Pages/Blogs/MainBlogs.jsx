import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogService } from "../../services/blog.service";

const MainBlogs = () => {

   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


   useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await BlogService.getBlogs();
        
        setBlogs(response.data || response); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);
  return (

    <>
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
        data-background="assets/img/breadcrumb/bg-6.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title fs-10 text-center mb-0"
                  style={{ fontSize: "38px" }}
                >
                  Blogs
                </h2>

                <p
                  className="tp-breadcrumb-title text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "5px" }}
                >
                  Stay informed with the latest healthcare insights, wellness
                  tips, and expert guidance from ClariMed India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tp-blog-area tp-tour-ptb tp-animate-tab pt-40 pb-40" style={{backgroundColor:'rgb(214, 226, 230)'}} >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content p-relative">
                <div className="tab-pane active" id="london" role="tabpanel">
                  <div className="row">
                   {loading ? (
              <div className="col-12 text-center"><h4>Loading Blogs...</h4></div>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                    <div className="col-xl-4 col-lg-6 col-md-6 " key={blog.id}>
                      <div className="tp-blog-item tp-blog-3-item mb-30">
                        <div className="tp-blog-thumb fix mb-30">
                          <Link to={`/blogs-details/${blog.slug}`} className="d-block">
                            <img
                              className="w-100"
                             src={blog.image || "assets/img/blog/default.jpg"} // Fallback image
                          alt={blog.title}
                            />
                          </Link>
                        </div>
                        <div className="tp-blog-content">
                          
                         <h3 className="tp-blog-title fw-600" style={{fontSize:'21px'}}>
                             <Link to={`/blogs-details/${blog.slug}`}>
                          {blog.title}
                        </Link>
                          </h3>
                        </div>
                      </div>
                    </div>
                    ))
            ) : (
              <div className="col-12 text-center"><h3>No Blogs Found</h3></div>
            )}
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-tour-area-end */}
    </>
  );
};

export default MainBlogs;


