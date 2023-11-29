import { API_URL } from "./projectServicesApi";

export const userProfile = async () => {
  const token = localStorage.getItem("token");
  try {
    const projectInfo = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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
};

export const userInfomation = async (updateData: any) => {
  const token = localStorage.getItem("token");
  try {
    const projectInfo = await fetch(`${API_URL}/user/profile`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(updateData),
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
};
