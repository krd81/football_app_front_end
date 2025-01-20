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

/*
    let matchId = '';
    for (let userScore of allUserScores) {
        if (userScore._id) {
            matchId = userScore._id;
        };
    };
        console.log("Outputs from updateUserScore")
        console.log(`Filtered score._id: ${matchId}`)

    if (matchId && matchId.length > 10) {
        // Match found, update the score
        const updatedScores = allUserScores.map(userScore => {
            if (matchId.includes(userScore._id)) {
                return { ...userScore, score: score };
            };
            return userScore;
        });
        setAllUserScores(updatedScores);
        // console.log(`All User Scores: ${JSON.stringify(allUserScores)}`)
        updateScore();
    } else {
        // No match found, add new score object
        setAllUserScores([...allUserScores, userScoreObject]);
        // console.log(`All User Scores: ${JSON.stringify(allUserScores)}`)
        saveNewScore();
    };
*/


    async function saveNewScore () {
        const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
        console.log('saveNewScore() function called')
        const url =
            // `${apiUrl}/userscores/competition/${selectedCompetition.id}/round/${round}/user/${currentUser._id}`;
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
