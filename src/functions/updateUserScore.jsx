import { useContext, useState, useMemo } from 'react'
import { AppContext } from '../contexts/AppContext'

export const UpdateUserScore = (round, fixtureId, score) => {
    const { selectedCompetition, allUserScores, setAllUserScores, currentUser } = useContext(AppContext);
    const comp = selectedCompetition;
    // const scores = allUserScores;

    const userScoreObject = {
        'competitionId': comp.id,
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
    */

    const matchId = allUserScores.filter(scores => {
        return scores.user && scores.user_id === currentUser._id
            && scores.competitionId === selectedCompetition.id
            && scores.round === round
            && scores.fixture_id === fixtureId;
        }).map(scores => scores._id);


    if (matchId) {
        // Match found, update the score
        const updatedScores = allUserScores.map(scores => {
            if (matchId.includes(scores._id)) {
                return { ...scores, score: score };
            };
            return scores;
        });
        setAllUserScores(updatedScores);
    } else {
        // No match found, add new score object
        setAllUserScores([...allUserScores, userScoreObject]);
    };




};
