export const getScores = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
    const result = await fetch(`${apiUrl}/userscores/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `null`
      }
    });
    const scoresList = await result.json();
    return scoresList;
  } catch (error) {
    console.error(error.message);
  };
};

export const getUserScores = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
    const result = await fetch(`${apiUrl}/userscores/user/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `null`
      }
    });
    const scoresList = await result.json();
    return scoresList;
  } catch (error) {
    console.error(error.message);
  };
};
