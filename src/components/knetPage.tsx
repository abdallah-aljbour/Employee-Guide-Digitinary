import React from 'react';
import styles from '../scssStyle/KnetPage.module.scss';

const KnetPage: React.FC = () => {
  return (
    <div className="app">
   
      <div className={styles.knetPage}>
        <h1>Welcome to the K-net Project</h1>
        <p>This is the K-net project page.</p>
      </div>
    </div>
  );
};

export default KnetPage;