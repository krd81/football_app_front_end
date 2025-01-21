import useApp from '../hooks/useApp'

export const UpdateUserScore = (prediction, score) => {
    const { userScores, setUserScores } = useApp();

    const userScoreObject = {
        'competitionId': prediction.competitionId,
        'round': prediction.round,
        'fixture_id': prediction.fixture_id,
        'score': score,
        'user': prediction.user
    };
    /*
    PROCESS
    1. SEARCH 'ALLUSERSCORES' TO SEE IF THERE IS A MATCH WITH
        THE SAME FIXTURE_ID AS THE PREDICTION PASSED AS AN ARGUMENT
    2. IF TRUE, OVER-WRITE SCORE WITH NEW SCORE
    3. IF FALSE, ADD OBJECT TO 'ALLUSERSCORES'
    4. MAKE DB CALL AND SAVE NEW DATA
    */

    let matchFound = false;
    let userScoreId = '';
    const updatedScores = userScores.map(userScore => {
        if(prediction.fixture_id === userScore.fixture_id) {
            matchFound = true;
            userScoreId = userScore._id;
            return { ...userScore, score: score };
        } else {
            return userScore;
        }

    });

    if (!matchFound) {
        // No match found, add new score object
        setUserScores([...userScores, userScoreObject]);
        saveNewScore();
        displayUserScores();
    } else {
        setUserScores(updatedScores);
        updateScore();
        displayUserScores();
    };

    function displayUserScores () {
        console.log(`All User Scores: ${JSON.stringify(userScores)}`)
    }


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


    async function updateScore () {
        console.log('updateScore() function called')
        const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
        const url = `${apiUrl}/userscores/${userScoreId}`;
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
