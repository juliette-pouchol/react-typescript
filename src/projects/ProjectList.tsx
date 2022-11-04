import { Project } from "./Project"
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import React from 'react'

export interface ProjectListProps {
    projects:Project[];
    onSave: (project:Project) => void;
}

const ProjectList = ({projects, onSave}: ProjectListProps) => {
    const [projectBeingEdited, setProjectBeingEdited] = React.useState({})
    const handleEdit = (projectBeingEdited:Project) => {
        setProjectBeingEdited(projectBeingEdited)
    }
    const handleCancel = () => {
        setProjectBeingEdited({})
    }

    return (
        <div className="row">
            {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                    {project === projectBeingEdited ? 
                    <ProjectForm project={project} onCancel={handleCancel} onSave={onSave}/> : 
                    <ProjectCard project={project} onEdit={handleEdit}/>}
                </div>))}
        </div>
    )
}

export default ProjectList