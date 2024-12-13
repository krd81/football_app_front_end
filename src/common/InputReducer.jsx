export default function inputReducer(field, action) {
    switch (action.type) {
        case 'update':
            break;
        case 'clear':
            break;
        default:
            throw Error('Unknown action: ' + action.type);
    }
}