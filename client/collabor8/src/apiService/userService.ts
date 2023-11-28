import { TLoginDetails, TRegisterDetails } from "@/types/types"

const baseUrl = 'http://localhost:3001/';

const login = async (user: TLoginDetails) => {
  try {
    const response = await fetch (`${baseUrl}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    return responseData;
  } catch (err) {
    return err;
  };
}

const register = async (user: TRegisterDetails) => {
  try {
     const response = await fetch (`${baseUrl}user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    return responseData;
  } catch (err) {
    return err;
  }
}

export { login, register };