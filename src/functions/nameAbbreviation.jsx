// Function to shorten long team names

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
        case 'Sheffield United':
            updatedName = 'Sheffield Utd';
            break;
        case 'Peterborough United':
            updatedName = 'Peterborough';
            break;
        case 'Wycombe Wanderers':
            updatedName = 'Wycombe';
            break;
        case 'Birmingham City':
            updatedName = 'Birmingham';
            break;
        case 'Lincoln City':
            updatedName = 'Lincoln';
            break;
        case 'Blackburn Rovers':
            updatedName = 'Blackburn';
            break;
        case 'Accrington Stanley':
            updatedName = 'Accrington';
            break;
        case 'Queens Park Rangers':
            updatedName = 'QPR';
            break;
        case 'West Bromwich Albion':
            updatedName = 'West Brom';
            break;
        case 'Plymouth Argyle':
            updatedName = 'Plymouth';
            break;
        case 'Preston North End':
            updatedName = 'Preston';
            break;
        case 'Charlton Athletic':
            updatedName = 'Charlton';
            break;
        case 'Harrogate Town':
            updatedName = 'Harrogate';
            break;
        case 'Sheffield Wednesday':
            updatedName = 'Sheffield Wed';
            break;
        case 'Doncaster Rovers':
            updatedName = 'Doncaster';
            break;
        case 'Stockport County':
            updatedName = 'Stockport';
            break;
        case 'Dagenham & Redbridge':
            updatedName = 'Dagenham';
            break;
        default:
            updatedName = teamName;
    }

    return updatedName;

}

export default shortName;