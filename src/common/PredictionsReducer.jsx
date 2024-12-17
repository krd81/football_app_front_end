export default function predictionsReducer(predictions, action) {
    switch (action.type) {
        case 'updatedPrediction': {
          return predictions.map((p) => {
              if (p.fixture_id === action.prediction.fixture_id) {
                console.log(`Updated prediction: ` + JSON.stringify(p))
                return action.prediction;
              } else {
                return p;
              }
            });
        }
        case 'setPredictions': {
          return action.predictions;
        }

        case 'updated':
            break;
        case 'deleted':
            break;
        default:
            throw Error('Unknown action: ' + action.type);
    }
};