export const getPredictions = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
    const result = await fetch(`${apiUrl}/predictions/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `null`
      }
    });
    const predictionsList = await result.json();
    return predictionsList;
  } catch (error) {
    console.error(error.message);
  };
};

export const getUserPredictions = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
    const result = await fetch(`${apiUrl}/predictions/user/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `null`
      }
    });
    const predictionsList = await result.json();
    return predictionsList;
  } catch (error) {
    console.error(error.message);
  };
};
