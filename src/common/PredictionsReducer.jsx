export default function predictionsReducer(predictions, action) {
    switch (action.type) {
        case 'added':
            break;
        case 'updated':
            break;
        case 'deleted':
            break;
        default:
            throw Error('Unknown action: ' + action.type);
    }
}