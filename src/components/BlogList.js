import React, { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import Modal from './Modal';

const BlogList = () => {
  const { blogs, deleteBlog, setEditBlog } = useContext(BlogContext);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setShowModal(true);
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.image} alt="Blog" />
          <h3>{blog.title}</h3>
          <p>{blog.desc}</p>
          <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          <button onClick={() => handleEdit(blog)}>Edit</button>
        </div>
      ))}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BlogList;
