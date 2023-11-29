const baseUrl = 'http://localhost:3001/';

const getUserDetails = async (id: null | string ) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch (`${baseUrl}user/profiledetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    })
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.log('error from apiServie',err)
    return err;
  };
}

export { getUserDetails };