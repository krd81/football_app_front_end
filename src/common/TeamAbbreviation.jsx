const shortName = (teamName) => {
    let updatedName;
    switch (teamName) {
        case 'Crystal Palace':
             updatedName ='Palace';
            break;
        case 'Ipswich Town':
            updatedName = 'Ipswich';
            break;
        case 'Manchester City':
            updatedName = 'Man City';
            break;
        case 'Manchester United':
            updatedName = 'Man Utd';
            break;
        case 'Newcastle United':
            updatedName = 'Newcastle';
            break;
        case 'Nottingham Forest':
            updatedName = 'Forest';
            break;
        case 'Tottenham Hotspur':
            updatedName = 'Spurs';
            break;
        case 'West Ham United':
            updatedName = 'West Ham';
            break;
        case 'Wolverhampton Wanderers':
            updatedName = 'Wolves';
            break;
        default:
            updatedName = teamName;
    }

    return updatedName;

}

export default shortName;