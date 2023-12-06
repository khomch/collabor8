import { TUserInfo } from "@/types/types";
import { API_URL } from "./projectServicesApi";

export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const userProfile = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (userProfile.ok) {
      const response = await userProfile.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error getting userProfile" };
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (updateData: TUserInfo) => {
  const token = localStorage.getItem("accessToken");
  try {
    const projectInfo = await fetch(`${API_URL}/user/profile`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (projectInfo.ok) {
      const response = await projectInfo.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: "Error getting update profile" };
    }
  } catch (error) {
    console.error(error);
  }
};
