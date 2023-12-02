import { TLoginDetails, TRegisterDetails, TReview } from '@/types/types';

const baseUrl = 'http://localhost:3001/';

const enterChat = async (chatInfo: { chatName: string; users: string[] }) => {
  try {
    const response = await fetch(`${baseUrl}chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatInfo),
    });
    const responseData = await response.json();
    console.log('responseData: ', responseData);
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    return responseData;
  } catch (err) {
    return err;
  }
};

export { enterChat };
