import React from 'react';
import styles from '../scssStyle/mainHome.module.scss';

const MainHome: React.FC = () => {
  return (
    <div className={styles.mainHome}>
      <h1>Employee Guide Digitinary</h1>
      <p>Welcome to the employee guide! This is the main content area.</p>
    </div>
  );
};

export default MainHome;