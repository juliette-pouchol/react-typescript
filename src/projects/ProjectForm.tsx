import React, { SyntheticEvent } from "react";
import { Project } from "./Project"

export interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project:Project) => void;
}

const ProjectForm = ({project:initialProject, onCancel, onSave}:ProjectFormProps) => {
    const [project, setProject] = React.useState(initialProject);
    const [errors, setErrors] = React.useState({
        name: '',
        description: '',
        budget: '',
    })
    const validate = (project: Project) => {
        const errors: any = {
            name: '',
            description: '',
            budget: '',
        }
        if (project.name.length === 0 ) {
            errors.name = 'Name is required.';
        } else if (project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget <= 0) {
            errors.budget = "Budget needs to be more than 0$."
        }
        return errors
    }
    const isValid = () => {
        return (errors.name === '' && errors.description === '' && errors.budget === '');
    }

    const handleSubmit = (event:SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) {
            return;
        }
        onSave(project);
    };
    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = { 
            [name]:updatedValue,
        }
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            return updatedProject
        });
        setErrors(() => validate(updatedProject))
    }
    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label form="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="enter name" 
                value={project.name} 
                onChange={handleChange} />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            
            <label form="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder="enter description" 
                value={project.description} 
                onChange={handleChange} />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}
            <label form="budget">Project Budget</label>
            <input 
                type="number" 
                name="budget" 
                placeholder="enter budget" 
                value={project.budget} 
                onChange={handleChange}/>
            {errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}
            <label form="isActive">Active?</label>
            <input
                type="checkbox" 
                name="isActive" 
                checked={project.isActive} 
                onChange={handleChange}/>

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <button type="button" className="bordered medium" onClick={onCancel}>
                    cancel
                </button>
            </div>
        </form>
    )
}

export default ProjectForm;