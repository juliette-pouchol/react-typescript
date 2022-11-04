import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import ThreePage from './ThreePage';
import HomePage from './HomePage';
import ProjectPage from './projects/ProjectPage';
import { ProjectsPage } from './projects/ProjectsPage';

function App() {
  return (
    <Router>
        <header className="sticky">
            <span className="logo">
                <img src="/assets/logo-3.svg" alt="logo" width={49} height={99} />
            </span>
            <NavLink to="/" className="button rounded">
                <span className="icon-home" />
                Home
            </NavLink>
            <NavLink to="/projects" className="button rounded">
                Projects
            </NavLink>
            <NavLink to="/three" className="button rounded">
                Three
            </NavLink>
        </header>
        <div className="container">
            <Routes >
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectPage />} />
                <Route path="/three" element={<ThreePage />} />
            </Routes>
        </div>
    </Router>
);
}

export default App;
