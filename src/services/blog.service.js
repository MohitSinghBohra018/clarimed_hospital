import api from "../api/axiosInstance";



export const BlogService = {
  // Fetches from {{localUrl}}/blogs
  getBlogs: () => api.get('/blogs'),
  getBlogDetails: (slug) => api.get(`/blogs/${slug}`),
};

export const TestimonialService = {
  getTestimonials: () => api.get('/testimonials'),
};


export const NewsService = {
  // Fetches from {{localUrl}}/news-events
  getNewsEvents: () => api.get('/news-events'),
  getNewsEventDetails: (slug) => api.get(`/news-events/${slug}`),
};



