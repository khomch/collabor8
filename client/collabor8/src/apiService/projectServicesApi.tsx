const API_URL = "http://localhost:3001";

export async function createProject(data: object){
    try {         
        const createProject = await fetch(`${API_URL}/project/create`,{
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });

        if(createProject.ok){
            const response = await createProject.json();
            return {status: 201, data: response};
        } else {
            return {status: 400, error: 'Error creating project'};
        }        
    } catch (error) {
        console.error(error);
    }
}

export async function editProject(data: object){
    try {         
        const editProject = await fetch(`${API_URL}/project/edit`,{
            method:"PUT",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });

        if(editProject.ok){
            const response = await editProject.json();
            return {status: 200, data: response};
        } else {
            return {status: 400, error: 'Error editing project'};
        }        
    } catch (error) {
        console.error(error);
    }
}

export async function getProjectInfo(id: string){
    try {         
        const projectInfo = await fetch(`${API_URL}/project/${id}`,{
            method:"GET",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
        });

        if(projectInfo.ok){
            const response = await projectInfo.json();
            return {status: 200, data: response};
        } else {
            return {status: 400, error: 'Error getting project info'};
        }        
    } catch (error) {
        console.error(error);
    }
}

export async function getProjectListing(){
    try {
        const projectListingInfo = await fetch(`${API_URL}/projects`,{
            method:"GET",
            mode:"cors",
            headers:{"Content-Type":"application/json"}
        });

        if(projectListingInfo.ok){
            const response = await projectListingInfo.json();
            return {status: 200, data: response};
        } else {
            return {status: 400, error: 'Error getting project listing'};
        }
    } catch (error) {
        console.error(error);
    }
}

