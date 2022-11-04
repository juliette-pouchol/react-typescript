import { Link } from "react-router-dom";
import { Project } from "./Project";

export interface ProjectCardProps {
    project: Project;
    onEdit: (project:Project) => void;
}

const formatDescription = (description: string) => {
    return description.substring(0, 60) + '...';
}

const ProjectCard = ({project, onEdit}: ProjectCardProps) => {
    const handleEventClick = (projectBeingEdited:Project) => {
        onEdit(projectBeingEdited)
    }
    return (
        <div className="cols-sm">
            <div className="card">
                <img src={project.imageUrl} alt="project name" />
                <section className="section dark">
                    <Link to={`/projects/${project.id}`}>
                        <h5 className="strong">
                            <strong>{project.name}</strong>
                        </h5>
                        <p>{formatDescription(project.description)}</p>
                        <p>Budget : {project.budget.toLocaleString()}</p>
                    </Link>
                    <button className="bordered" onClick={() => handleEventClick(project)}>
                        <span className="icon-edit"></span>
                        Edit
                    </button>
                </section>
            </div>
        </div>
    )
}

export default ProjectCard;