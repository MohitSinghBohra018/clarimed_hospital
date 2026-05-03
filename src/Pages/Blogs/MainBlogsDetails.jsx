import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogService } from '../../services/blog.service';

const MainBlogsDetails = () => {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await BlogService.getBlogDetails(slug);
      
        setBlog(response.data); 
        console.log("Fetched Blog Details:", response.data); 
      } catch (error) {
        console.error("Error loading blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchDetails();
  }, [slug]);

  if (loading) return <div className="text-center pt-100 pb-100"><h4>Loading...</h4></div>;
  if (!blog) return <div className="text-center pt-100 pb-100"><h3>Blog not found.</h3></div>;

  return (
    <>
      {/* Breadcrumb Section */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="tp-breadcrumb-title mb-0" style={{ fontSize: "38px", color: "#fff" }}>
                {blog.title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-blog-area pt-80 pb-100" style={{ backgroundColor: "#edf1f4" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-9 col-xl-8">
              <div className="postbox-details-main-wrap mb-40">
                
                <div className="postbox-details-info-wrap mb-30">
                  {/* Displaying the Badge from API */}
                  {/* <span className="postbox-badge" style={{ backgroundColor: '#346fa3', color: '#fff', padding: '5px 15px', borderRadius: '4px', marginBottom: '10px', display: 'inline-block' }}>
                    {blog.badge}
                  </span> */}
                  <h2 className="postbox-title mb-30" style={{ fontSize: '32px', fontWeight: '700' }}>
                    {blog.title}
                  </h2>
                </div>

                {/* Featured Image */}
                <div className="postbox-details-thumb mb-45">
                  <img
                    className="w-100"
                    src={blog.image}
                    alt={blog.title}
                    style={{ height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}
                  />
                </div>

                {/* Blog Content */}
                <div className="postbox-details-text mb-45">
                  <div 
                    dangerouslySetInnerHTML={{ __html: blog.description }} 
                    style={{ lineHeight: '1.8', color: '#333', fontSize: '17px' }}
                  />
                </div>

                {/* publish data  */}
                <div className="postbox-details-meta" style={{ borderTop: '1px solid #ddd', paddingTop: '20px', color: '#777' }}>
                  <span>Published on: {new Date(blog.created_at).toLocaleDateString()}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBlogsDetails;