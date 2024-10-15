import ThemeInfo from '../components/ThemeInfo';
import styles from '../styles/SettingsPage.module.css';

const SettingsPage = () => {
  return (
    <>
      <h2>Manage Themes</h2>
      <div className={styles.container}>
        <ThemeInfo
          name="GitHub Dark"
          icon="/github-dark.png"
          publisher="GitHub"
          theme="github-dark"
          description="GitHub theme for VS Code"
        />
        <ThemeInfo
          name="Dracula"
          icon="/dracula.png"
          publisher="Dracula Theme"
          theme="dracula"
          description="Official Dracula Theme. A dark theme for many editors, shells, and more."
        />
        <ThemeInfo
          name="Ayu Dark"
          icon="/ayu.png"
          publisher="teabyii"
          theme="ayu-dark"
          description="A simple theme with bright colors."
        />
        <ThemeInfo
          name="Ayu Mirage"
          icon="/ayu.png"
          publisher="teabyii"
          theme="ayu-mirage"
          description="A simple theme with bright colors."
        />
        <ThemeInfo
          name="Nord"
          icon="/nord.png"
          publisher="arcticicestudio"
          theme="nord"
          description="An arctic, north-bluish clean and elegant Visual Studio Code theme."
        />
        <ThemeInfo
          name="Night Owl"
          icon="/night-owl.png"
          publisher="sarah.drasner"
          theme="night-owl"
          description="A VS Code theme for the night owls out there."
        />
        <ThemeInfo
          name="Soft Light"
          icon="/light.png"
          publisher="Light Theme"
          theme="soft-light"
          description="A visually appealing light theme inspired by Visual Studio Code."
        />
        <ThemeInfo
          name="Bright Light"
          icon="/light.png"
          publisher="Light Theme"
          theme="bright-light"
          description="A vibrant and visually appealing light theme inspired by Visual Studio Code."
        />
        <ThemeInfo
          name="Muted Elegance"
          icon="/muted-elegance.png"
          publisher="NHBKhang"
          theme="muted-elegance"
          description="A sophisticated theme that balances muted tones with elegant accents, creating a serene and visually pleasing workspace."
        />
        <ThemeInfo
          name="Pastel Dream"
          icon="/pastel-dream.jpg"
          publisher="NHBKhang"
          theme="pastel-dream"
          description="A vibrant and visually appealing theme filled with colors for a lively experience."
        />
        <ThemeInfo
          name="Colorful"
          icon="/colorful.jpg"
          publisher="NHBKhang"
          theme="colorful"
          description="A vibrant theme bursting with various colors for a lively and energetic coding experience."
        />
        <ThemeInfo
          name="SoundScape"
          icon="/soundscape.png"
          publisher="SoundScape Theme"
          theme="soundscape"
          description="An immersive theme that harmonizes vibrant colors to create a lively and energetic atmosphere for coding and creativity."
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Settings' },
  };
}

export default SettingsPage;
