import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';
import { useGlobalContext } from '../configs/GlobalContext';

const Tabsbar = () => {
  const { explorerHidden } = useGlobalContext();

  return (
    <div className={`${styles.tabs} ${explorerHidden && styles.fullWidth}`}>
      <Tab icon="/img/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/img/txt_icon.png" filename="about.txt" path="/about" />
      <Tab icon="/img/css_icon.svg" filename="contact.css" path="/contact" />
      <Tab icon="/img/js_icon.svg" filename="projects.js" path="/projects" />
      <Tab icon="/img/json_icon.svg" filename="articles.json" path="/articles" />
      <Tab icon="/img/markdown_icon.svg" filename="github.md" path="/github" />
    </div>
  );
};

export default Tabsbar;
