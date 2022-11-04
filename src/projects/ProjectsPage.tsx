import ProjectList from './ProjectList'
import { Project } from './Project'
import React from 'react'
import { projectAPI } from './projectAPI'

export const ProjectsPage = () => {
    const [projects, setProjects] = React.useState<Project[]>([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage] = React.useState(1)
    
    React.useEffect(() => {
        setLoading(true);
        projectAPI
            .get(currentPage)
            .then((data) => {
                setError(undefined);
                setLoading(false);
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data])
                }
            })
            .catch((e) => {
                setLoading(false);
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    }, [currentPage])

    const saveProject = (project:Project) => {
        projectAPI
            .put(project)
            .then((updatedProject) => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                })
                setProjects(updatedProjects);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    }

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1)
    }

    return (
        <div>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                <div className="card large error">
                  <section>
                    <p>
                      <span className="icon-alert inverse "></span>
                      {error}
                    </p>
                  </section>
                </div>
              </div>
            )}
            <ProjectList projects={projects} onSave={saveProject}/>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
            {(!loading && !error) && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>                
            )}
        </div>
    )
}