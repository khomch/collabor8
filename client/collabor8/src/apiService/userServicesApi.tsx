const baseUrl = 'http://localhost:3001/';

const getUserDetails = async (emailAddress: null | string ) => {
  try {
    const response = await fetch (`${baseUrl}user/profiledetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailAddress })
    })
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (err) {
    return err;
  };
}

export { getUserDetails };