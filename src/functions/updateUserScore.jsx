import useApp from '../hooks/useApp'

export const UpdateUserScore = (round, fixtureId, score) => {
    const { selectedCompetition, allUserScores, setAllUserScores, currentUser } = useApp();

    const userScoreObject = {
        'competitionId': selectedCompetition.id,
        'round': round,
        'fixture_id': fixtureId,
        'score': score,
        'user': currentUser
    };
    /*
    PROCESS
    1. SEARCH 'ALLUSERSCORES' TO SEE IF A MATCH EXISTS
    2. IF TRUE, OVER-WRITE SCORE WITH NEW SCORE
    3. IF FALSE, ADD OBJECT TO 'ALLUSERSCORES'
    4. MAKE DB CALL AND SAVE NEW DATA
    */

    let matchId = '';
    for (let userScore of allUserScores) {
        if (userScore._id) {
            matchId = userScore._id;
        };
    };



        console.log("Outputs from updateUserScore")

        console.log(`Filtered score._id: ${matchId}`)

        // console.log(JSON.stringify(matchId));



    if (matchId && matchId.length > 10) {
        // Match found, update the score
        const updatedScores = allUserScores.map(userScore => {
            if (matchId.includes(userScore._id)) {
                return { ...userScore, score: score };
            };
            return userScore;
        });
        setAllUserScores(updatedScores);
        updateScore();
    } else {
        // No match found, add new score object
        setAllUserScores([...allUserScores, userScoreObject]);
        saveNewScore();
    };



    async function saveNewScore () {
    const apiUrl = 'http://127.0.0.1:8005/userscores';

        const url =
            `${apiUrl}/competition/${selectedCompetition.id}/round/${round}/user/${currentUser._id}`;
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
        // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'http://127.0.0.1:8005/userscores';
        const url = `${apiUrl}/${matchId}`;
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
