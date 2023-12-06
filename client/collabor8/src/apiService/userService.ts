import { BASE_URL } from '@/constants/api';
import { TLoginDetails, TRegisterDetails, TReview } from '@/types/types';

const login = async (user: TLoginDetails) => {
  try {
    const response = await fetch(`${BASE_URL}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    localStorage.setItem('accessToken', responseData.token);
    return responseData;
  } catch (err) {
    return err;
  }
};

const register = async (user: TRegisterDetails) => {
  try {
    const response = await fetch(`${BASE_URL}user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    localStorage.setItem('accessToken', responseData.token);
    return responseData;
  } catch (err) {
    return err;
  }
};

const writeReview = async (update: TReview) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}user/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    });
    if (response.ok) {
      return { status: 200, data: response };
    } else {
      return { status: 405, error: 'Something is wrong' };
    }
  } catch (err) {}
};

export { login, register, writeReview };
