const baseUrl = 'http://localhost:3001';

export const startChat = async (chatInfo: {
  chatName: string;
  users: string[];
  message: string;
}) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${baseUrl}/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const getChats = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const chats = await fetch(`${baseUrl}/chat/get`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (chats.ok) {
      const response = await chats.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error getting chats' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getChatMessages = async (chatId: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const messages = await fetch(`${baseUrl}/chat/get/${chatId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (messages.ok) {
      const response = await messages.json();
      return { status: 200, data: response };
    } else {
      return { status: 400, error: 'Error getting messages' };
    }
  } catch (error) {
    console.error(error);
  }
};
