/* Date component extracts all dates from a fixture round, sorts them into
chronological order, then returns an array with each date */

/*
1. Receive an object containing fixtures
2. Extract the date of each fixture
3. If the date is not already in the array, store the new date
4. Sort the dates chronologically
5. Return the array of dates
*/

export default function getDates (fixtures) {
    let datesArray = [];
    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'date' && !datesArray.includes(fixtures[fixture][matchElement])) {
                datesArray.push(fixtures[fixture][matchElement]);
            }
        }
    }
    return datesArray.sort((a, b) => a - b);
}
