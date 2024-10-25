import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';
import { useGlobalContext } from '../configs/GlobalContext';

const Tabsbar = () => {
  const { explorerHidden } = useGlobalContext();

  return (
    <div className={`${styles.tabs} ${explorerHidden && styles.fullWidth}`}>
      <Tab icon="/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/txt_icon.svg" filename="about.txt" path="/about" />
      <Tab icon="/css_icon.svg" filename="contact.css" path="/contact" />
      <Tab icon="/js_icon.svg" filename="projects.js" path="/projects" />
      <Tab icon="/json_icon.svg" filename="articles.json" path="/articles" />
      <Tab icon="/markdown_icon.svg" filename="github.md" path="/github" />
    </div>
  );
};

export default Tabsbar;
