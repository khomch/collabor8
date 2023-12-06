const baseUrl = 'http://localhost:3001';

export const generateRoles = async (projectId: { projectId: string }) => {
  const token = localStorage.getItem('accessToken');
  console.log('prompt: ', prompt);
  try {
    const response = await fetch(`${baseUrl}/ai/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectId),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.errorMsg);
    }
    return responseData;
  } catch (err) {
    return err;
  }
};
