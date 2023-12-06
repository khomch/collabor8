import toast from "react-hot-toast";

export const API_URL = "http://localhost:3001";

export async function createProject(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const createProject = await fetch(`${API_URL}/project/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (createProject.ok) {
      const response = await createProject.json();
      return { status: 201, data: response };
    } else {
      return { status: 400, error: "Error creating project" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addRole(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const addRole = await fetch(`${API_URL}/project/role`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (addRole.ok) {
      const response = await addRole.json();
      return { status: 201, data: response };
    } else {
      return { status: 400, error: "Error adding member" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addRoles(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const addRoles = await fetch(`${API_URL}/project/roles`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (addRoles.ok) {
      const response = await addRoles.json();
      return { status: 201, data: response };
    } else {
      return { status: 400, error: "Error adding member" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeRole(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const createProject = await fetch(`${API_URL}/project/role`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (createProject.ok) {
      const response = await createProject.json();
      return { status: 201, data: response };
    } else {
      return { status: 400, error: "Error adding member" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateProject(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const editProject = await fetch(`${API_URL}/project/edit`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (editProject.ok) {
      const response = await editProject.json();
      toast("Saved successfully! ✅");
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error editing project" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectInfo(id: string) {
  try {
    const projectInfo = await fetch(`${API_URL}/project/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (projectInfo.ok) {
      const response = await projectInfo.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error getting project info" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectListing() {
  try {
    const projectListingInfo = await fetch(`${API_URL}/projects`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (projectListingInfo.ok) {
      const response = await projectListingInfo.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error getting project listing" };
    }
  } catch (error) {
    console.error(error);
  }
}
export async function applyToProject(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const applyToProject = await fetch(`${API_URL}/project/apply`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (applyToProject.ok) {
      const response = await applyToProject.json();
      return { status: 200, data: response };
    } else {
      const statusCode = applyToProject.status;
      const response = await applyToProject.json();
      return { status: statusCode, error: response.message };
    }
  } catch (error) {
    throw error;
  }
}
export async function approveUser(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const approveUser = await fetch(`${API_URL}/project/approve`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (approveUser.ok) {
      const response = await approveUser.json();
      return { status: 200, data: response };
    } else {
      const statusCode = approveUser.status;
      const response = await approveUser.json();
      return { status: statusCode, error: response.message };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function denyUser(data: object) {
  const token = localStorage.getItem("accessToken");
  try {
    const denyUser = await fetch(`${API_URL}/project/deny`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (denyUser.ok) {
      const response = await denyUser.json();
      return { status: 200, data: response };
    } else {
      const statusCode = denyUser.status;
      const response = await denyUser.json();
      return { status: statusCode, error: response.message };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getOwnerProjects() {
  try {
    const token = localStorage.getItem("accessToken");
    const projectInfo = await fetch(`${API_URL}/project-owner`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (projectInfo.ok) {
      const response = await projectInfo.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error getting project info" };
    }
  } catch (error) {
    console.error(error);
  }
}

  export async function finishUserTask(id: object ) {
    const token = localStorage.getItem("accessToken");
    try {
      const finishTask = await fetch(`${API_URL}/project/finish`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      });
      if (finishTask.ok) {
        const response = await finishTask.json();
        return { status: 200, data: response };
      } else {
        const statusCode = finishTask.status;
        const response = await finishTask.json();
        return { status: statusCode, error: response.message };
      }
    } catch (error) {
      console.error(error);
    }
  }

  export async function moveFinishedToReviewed(data: object) {
    const token = localStorage.getItem("accessToken");
    try {
      const reviewedUser = await fetch(`${API_URL}/project/review`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (reviewedUser.ok) {
        const response = await reviewedUser.json();
        return { status: 200, data: response };
      } else {
        const statusCode = reviewedUser.status;
        const response = await reviewedUser.json();
        return { status: statusCode, error: response.message };
      }
    } catch (error) {
      console.error(error);
    }
  }
