import React, { useState, useContext } from 'react';
import Modal from './Modal';
import { BlogContext } from '../context/BlogContext';
import styles from './Header.module.css';

const Header = () => {
  const { setEditBlog } = useContext(BlogContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setEditBlog(null); 
    setShowModal(true);
  };

  return (
    <header className={styles.header}>
      <h1>Blog App</h1>
      <button className={styles.add} onClick={openModal}>Add Blog</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;
