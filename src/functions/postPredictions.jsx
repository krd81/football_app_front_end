export const savePrediction = async (prediction) => {
      const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
      const url = `${apiUrl}/predictions`;
      const method = 'POST';
    try {
        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `null`
            },
            body: JSON.stringify(prediction)
        });
    } catch (error) {
      console.error('Failed to create new prediction:', error.message);
    };
  };