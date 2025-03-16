import Tab from './Tab';
import styles from '../../styles/Tabsbar.module.css';
import { useGlobalContext } from '../../configs/GlobalContext';

const Tabsbar = () => {
  const { explorerHidden } = useGlobalContext();

  return (
    <div className={`${styles.tabs} ${explorerHidden && styles.fullWidth}`}>
      <Tab icon="/img/icon/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/img/icon/txt_icon.png" filename="about.txt" path="/about" />
      <Tab icon="/img/icon/css_icon.svg" filename="contact.css" path="/contact" />
      <Tab icon="/img/icon/js_icon.svg" filename="projects.js" path="/projects" />
      <Tab icon="/img/icon/json_icon.svg" filename="articles.json" path="/articles" />
      <Tab icon="/img/icon/markdown_icon.svg" filename="github.md" path="/github" />
    </div>
  );
};

export default Tabsbar;
