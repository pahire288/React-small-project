import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null); // For editing

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, { ...blog, id: Date.now() }]);
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, deleteBlog, updateBlog, editBlog, setEditBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};
