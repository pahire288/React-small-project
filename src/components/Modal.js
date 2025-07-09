import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BlogContext } from '../context/BlogContext';
import styles from './Modal.module.css';

const Modal = ({ onClose }) => {
  const { addBlog, editBlog, updateBlog } = useContext(BlogContext);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editBlog) {
      setImage(editBlog.image);
      setTitle(editBlog.title);
      setDescription(editBlog.description);
    }
  }, [editBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = { image, title, description };
    if (editBlog) {
      updateBlog(editBlog.id, blogData);
    } else {
      addBlog(blogData);
    }
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{editBlog ? 'Edit Blog' : 'Add Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Image URL" 
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Blog Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">{editBlog ? 'Update' : 'Post Blog'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root') // ensure you have a div with id 'modal-root' in index.html
  );
};

export default Modal;
