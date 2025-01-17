import React from 'react';
import styles from '../scssStyle/DgatePage.module.scss';

const DgatePage: React.FC = () => {
  return (
    <div className="app">
   
      <div className={styles.dgatePage}>
        <h1>Welcome to the Dgate Project</h1>
        <p>This is the Dgate project page.</p>
      </div>
    </div>
  );
};

export default DgatePage;