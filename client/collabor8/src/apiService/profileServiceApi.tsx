import { API_URL } from './projectServicesApi';

export const getUserProfile = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const projectInfo = await fetch(`${API_URL}/user/profiledetails`, {
      method: "GET",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (userProfile.ok) {
      const response = await userProfile.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error getting userProfile' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (updateData: any) => {
  const token = localStorage.getItem('accessToken');
  try {
    const projectInfo = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (projectInfo.ok) {
      const response = await projectInfo.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error getting project info' };
    }
  } catch (error) {
    console.error(error);
  }
};
