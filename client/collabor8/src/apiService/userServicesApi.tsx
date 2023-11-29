import { TReview } from "@/types/types";

const baseUrl = "http://localhost:3001/";

const getUserDetails = async (id: null | string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}user/profiledetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.log("error from apiServie", err);
    return err;
  }
};

const writeReview = async (update: TReview) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response: { status: number } = await fetch(`${baseUrl}user/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    });
    return response;
  } catch (err) {
    console.log("error from apiServie", err);
    return err;
  }
};

export { getUserDetails, writeReview };
