import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../scssStyle/ExpandableSection.module.scss';
interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}
const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleArenaClick = () => {
    navigate('/arena');
  };
  const handleDgateClick = () => {
    navigate('/dgate');
  };
  const handleKnetClick = () => {
    navigate('/knet');
  };
  return (
    <div className={styles.expandableSection}>
      <div className={styles.header} onClick={toggleExpand}>
        <h3>{title}</h3>
        <span className={styles.arrow}>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className={styles.content}>
          <ul>
            <li onClick={handleArenaClick}>Arena</li> {/* Add click handler for Arena */}
            <li onClick={handleDgateClick}>D Gate</li>
            <li onClick={handleKnetClick}>K-Net</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ExpandableSection;