import React, { useEffect, useState } from "react";
import { BlogService } from "../../services/blog.service"; // adjust path if needed
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await BlogService.getBlogs();
        setBlogs(res.data || []); // adjust based on API response
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <>
      <div className="tp-blog-area pt-10 pb-20 tp-section-pt tp-section-pb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-testimonial-section-title text-center mb-50">
                <span className="tp-section-subtitle d-inline-block mb-15">
                  Our Latest Blog
                </span>
                <h2 className="tp-section-title fw-600">
                  Recent Blogs & Updates
                </h2>
              </div>
            </div>

            {/* ✅ Left Big Blog */}
            {blogs[0] && (
              <div className="col-xl-7">
                <div
                  class="tp-blog-item tp-blog-col-1 mb-30 wow fadeInUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".3s"
                >
                  <div class="tp-blog-thumb mb-30 fix">
                    <Link to={`/blogs-details/${blogs[0].slug}`}>
                      <img
                        className="w-100"
                        src={blogs[0].image}
                        alt={blogs[0].title}
                      />
                    </Link>
                  </div>

                  <div class="tp-blog-content">
                    <div class="tp-blog-meta-wrap d-flex flex-wrap align-items-center mb-15">
                      <span className="tp-blog-category">
                        {blogs[0].badge || "General"}
                      </span>
                      <div className="tp-blog-meta">
                        <span>
                          {new Date(blogs[0].created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        {/* <span>{blogs[0].created_at}</span> */}
                        <span>{blogs[0].author || "Admin"}</span>
                      </div>
                    </div>

                    <h3 className="tp-blog-title fw-600 mb-15">
                      <Link to={`/blog/${blogs[0].slug}`}>
                        {blogs[0].title}
                      </Link>
                    </h3>
                    <Link
                      to={`/blogs-details/${blogs[0].slug}`}
                      className="tp-btn-solid"
                    >
                      Learn more
                      <svg
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.07141 4.67188L0.750023 4.67187"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.68092 8.59474C5.68092 8.59474 9.37927 5.70593 9.37927 4.67232C9.37928 3.63872 5.68086 0.75 5.68086 0.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Right Side Blogs */}
            <div className="col-xl-5">
              {blogs.slice(1, 4).map((blog, index) => (
                <div
                  class="tp-blog-item tp-blog-col-2 mb-30 wow fadeInUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".4s"
                  key={index}
                >
                  <div class="tp-blog-thumb fix">
                    <Link to={`/blogs-details/${blog.slug}`}>
                      <img src={blog.image} alt={blog.title} />
                    </Link>
                  </div>

                  <div class="tp-blog-content">
                    <div class="tp-blog-meta-wrap d-flex flex-wrap align-items-center mb-15">
                      <span className="tp-blog-category">
                        {blog.badge || "General"}
                      </span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* <div class="tp-blog-meta-wrap d-flex flex-wrap align-items-center mb-15">
                      <span className="tp-blog-category">
                        {blog.badge || "General"}
                      </span>
                      <div className="tp-blog-meta">
                        <span>{blog.created_at}</span>
                      </div>
                    </div> */}

                    <h3 className="tp-blog-title fw-600 mb-15">
                      <Link to={`/blogs-details/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <Link
                      to={`/blogs-details/${blog.slug}`}
                      className="tp-btn-solid"
                    >
                      Learn more
                      <svg
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.07141 4.67188L0.750023 4.67187"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.68092 8.59474C5.68092 8.59474 9.37927 5.70593 9.37927 4.67232C9.37928 3.63872 5.68086 0.75 5.68086 0.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
