// import React, { useState } from 'react';
// import styles from '../../scssStyle/Sidebar.module.scss';
// import ExpandableSection from './ExpandableSection/ExpandableSection';
// import { useNavigate } from 'react-router-dom';
// import { Layout, Database, Terminal, Shield, Users } from 'lucide-react';
// // Import logos
// import logoWithText from '../../assets/logo-with-text.png';
// import logoWithoutText from '../../assets/logo-without-text.png';

// const Sidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
 
//   const handleHomeClick = () => {
//     navigate('/');
//   };

//   const departments = [
//     { title: 'Frontend', icon: <Layout size={24} /> },
//     { title: 'Backend', icon: <Database size={24} /> },
//     { title: 'DevOps', icon: <Terminal size={24} /> },
//     { title: 'QA', icon: <Shield size={24} /> },
//     { title: 'HR', icon: <Users size={24} /> }
//   ];

//   return (
//     <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
//       {/* Toggle Button */}
//       <button className={styles.toggleButton} onClick={toggleSidebar}>
//         {isOpen ? '✕' : '☰'}
//       </button>

//       {/* Logo Section */}
//       <div className={styles.logoContainer}>
//         <img
//           src={isOpen ? logoWithText : logoWithoutText}
//           alt="Company Logo"
//           className={styles.logo}
//           onClick={handleHomeClick}
//         />
//       </div>

//       {/* Departments Section */}
//       {isOpen ? (
//         <>
//           <h2 className={styles.title}>Departments</h2>
//           <ul className={styles.departmentList}>
//             {/* Frontend Department with Expandable Section */}
//             <li>
//               <ExpandableSection title="Frontend">
//                 <ul>
//                   <li>Arena</li>
//                   <li>D Gate</li>
//                   <li>K-Net</li>
//                 </ul>
//               </ExpandableSection>
//             </li>
//             {/* Other Departments */}
//             <li>Backend</li>
//             <li>DevOps</li>
//             <li>QA</li>
//             <li>HR</li>
//           </ul>
//         </>
//       ) : (
//         <ul className={styles.departmentList}>
//           {departments.map((dept, index) => (
//             <li
//               key={index}
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 marginBottom: '20px',
//                 color: 'black'
//               }}
//               title={dept.title}
//             >
//               {dept.icon}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.tsx
import React from 'react';
import styles from '../../scssStyle/Sidebar.module.scss';
import ExpandableSection from './ExpandableSection/ExpandableSection';
import { useNavigate } from 'react-router-dom';
import { Layout, Database, Terminal, Shield, Users } from 'lucide-react';
import logoWithText from '../../assets/logo-with-text.png';
import logoWithoutText from '../../assets/logo-without-text.png';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  const departments = [
    { title: 'Frontend', icon: <Layout size={24} /> },
    { title: 'Backend', icon: <Database size={24} /> },
    { title: 'DevOps', icon: <Terminal size={24} /> },
    { title: 'QA', icon: <Shield size={24} /> },
    { title: 'HR', icon: <Users size={24} /> }
  ];

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <button className={styles.toggleButton} onClick={onToggle}>
        {isOpen ? '✕' : '☰'}
      </button>
      
      <div className={styles.logoContainer}>
        <img
          src={isOpen ? logoWithText : logoWithoutText}
          alt="Company Logo"
          className={styles.logo}
          onClick={handleHomeClick}
        />
      </div>

      <div className={styles.departmentsContainer}>
        {isOpen ? (
          <>
            <h2 className={styles.title}>Departments</h2>
            <ul className={styles.departmentList}>
              <li>
                <ExpandableSection title="Frontend">
                  <ul>
                    <li onClick={() => navigate('/arena')}>Arena</li>
                    <li onClick={() => navigate('/dgate')}>D Gate</li>
                    <li onClick={() => navigate('/knet')}>K-Net</li>
                  </ul>
                </ExpandableSection>
              </li>
              <li>Backend</li>
              <li>DevOps</li>
              <li>QA</li>
              <li>HR</li>
            </ul>
          </>
        ) : (
          <ul className={styles.departmentList}>
            {departments.map((dept, index) => (
              <li
                key={index}
                className={styles.iconOnly}
                title={dept.title}
              >
                {dept.icon}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;