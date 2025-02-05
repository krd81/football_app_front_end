export const updateUserScore = (userScores, setUserScores, prediction, score) => {


    const userScoreObject = {
        'competitionId': prediction.competitionId,
        'round': prediction.round,
        'fixture_id': prediction.fixture_id,
        'score': score,
        'user': prediction.user
    };
    /*
    PROCESS
    1. SEARCH 'USERSCORES' TO SEE IF THERE IS A MATCH WITH
        THE SAME FIXTURE_ID AS THE PREDICTION PASSED AS AN ARGUMENT
    2. IF TRUE, OVER-WRITE SCORE WITH NEW SCORE
    3. IF FALSE, ADD OBJECT TO 'ALLUSERSCORES'
    4. MAKE DB CALL AND SAVE NEW DATA
    */

    let matchFound = false;
    const updatedScores = userScores.map(userScore => {
        if(prediction.fixture_id === userScore.fixture_id) {
            matchFound = true;
            console.log(`match found is true`);
            const userScoreId = userScore._id;
            console.log(`Matching fixture is: ${JSON.stringify(userScore)}`);
            console.log(`Matching fixture id is: ${userScore._id}`);
            updateScore(userScoreId);
            return { ...userScore, score: score };
        } else {
            return userScore;
        }
    });
    setUserScores(updatedScores);


    if (!matchFound) {
        // No match found, add new score object
        setUserScores([...userScores, userScoreObject]);
        saveNewScore();
    };


    async function saveNewScore () {
        const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
        console.log('saveNewScore() function called')
        const url =
            `${apiUrl}/userscores`;
        const method = 'POST';

        try {
            await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(userScoreObject),
            });
        } catch (error) {
            console.error('Failed to create score:', error);
        };
    };


    async function updateScore (id) {
        console.log('updateScore() function called')
        const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
        const url = `${apiUrl}/userscores/${id}`;
        const update = {
            score: score
        };
        const method = 'PUT';

        try {
          await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(update),
          });
        } catch (error) {
            console.error('Failed to update score:', error);
          };

    };


};
