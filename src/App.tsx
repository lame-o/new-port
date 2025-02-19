import { Canvas } from "@react-three/fiber";
import DitheredWaves from "./components/DitheredWaves";
import { Dock, DockIcon } from "./components/dock";
import { Icons } from "./components/icons";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="orange-square" />
      <div className="background-waves">
        <Canvas>
          <DitheredWaves />
        </Canvas>
      </div>
      <div className="content-wrapper">
        <nav className="nav-dock">
          <Dock direction="bottom">
            <DockIcon>
              <div className="dock-tooltip" data-tooltip="Home">
                <Icons.home />
              </div>
            </DockIcon>
            <DockIcon>
              <div className="dock-tooltip" data-tooltip="Projects">
                <Icons.projects />
              </div>
            </DockIcon>
            <div className="dock-divider"></div>
            <DockIcon>
              <a href="https://github.com/lame-o" target="_blank" rel="noopener noreferrer" className="dock-tooltip" data-tooltip="GitHub">
                <Icons.gitHub />
              </a>
            </DockIcon>
            <DockIcon>
              <div className="dock-tooltip" data-tooltip="CV">
                <Icons.cv />
              </div>
            </DockIcon>
            <DockIcon>
              <a href="https://www.linkedin.com/in/liam-dwight/" target="_blank" rel="noopener noreferrer" className="dock-tooltip" data-tooltip="LinkedIn">
                <Icons.linkedin />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="mailto:liamhdwight@gmail.com" className="dock-tooltip" data-tooltip="Email">
                <Icons.email />
              </a>
            </DockIcon>
          </Dock>
        </nav>
        <div className="main-content">
          <div className="content-layout">
            <div className="info-container">
              <div className="about-section">
                <h2>About Me</h2>
                <p>Your about text goes here...</p>
              </div>
            </div>
            <div className="profile-container">
              <img src="/pfp.png" alt="Profile" className="profile-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
