import { Project } from "./Project";

const baseUrl = "http://localhost:4000"
const url = `${baseUrl}/projects`

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: any) {
    return response.json();
}

function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}

const projectAPI = {
    async get(page = 1, limit = 20) {
        try {
            let response = await fetch(`${url}?_page=${page}&limit=${limit}&_sort=name`);
            response = await checkStatus(response);
            const data = await parseJSON(response);
            return convertToProjectModels(data);
        } catch (e) {
            console.log('log client error ' + e);
            throw new Error(
                'There was an error retrieving the projects. Please try again.'
            );
        } 
    },
    async put(project: Project) {
        try {
            let response = await fetch(`${url}/${project.id}`, {
                method: 'PUT',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'Application/json'
                }
            });
            response = await checkStatus(response);
            return parseJSON(response);
        } catch (e) {
            console.log('log client error ' + e);
            throw new Error(
                'There was an error updating the project. Please try again.'
            );
        } 
    },
    async find(id: number) {
        try {
            let response = await fetch(`${url}/${id}`)
            response = await checkStatus(response);
            const data = await parseJSON(response);
            return convertToProjectModel(data);
        } catch (e) {
            console.log('log client error ' + e);
            throw new Error(
                'There was an error finding the project. Please try again.'
            );
        }
    }
} 

export { projectAPI }
