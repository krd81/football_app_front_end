import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export const UpdateUserScore = (round, fixtureId, score) => {
    const { selectedCompetition, allUserScores, setAllUserScores, currentUser } = useContext(AppContext);

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

    const matchId = allUserScores.filter(userScore => {

        return userScore.user && userScore.user._id === currentUser._id
            && userScore.competitionId == selectedCompetition.id
            && userScore.round == round
            && userScore.fixture_id === fixtureId;

        }).map(scores => scores._id);

        console.log("Outputs from updateUserScore")

        console.log(`Filtered score._id: ${matchId}`)


    if (matchId) {
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
    };

    console.log(JSON.stringify(allUserScores))

    function saveNewScore () {

    };


    async function updateScore () {
        // const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrl = 'http://127.0.0.1:8005';
        const url = `${apiUrl}/userscores/${matchId}`;
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
            console.error('Failed to create/update score:', error);
          };

    };


};
