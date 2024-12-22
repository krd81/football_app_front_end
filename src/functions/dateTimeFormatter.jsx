// Helper function to convert date/time objects

export default function dateFormatter1 (dateToFormat) {
    const date = new Date(dateToFormat);
  const day = date.toISOString().slice(8,10);
  const month = date.toISOString().slice(5,7);
  const year = date.toISOString().slice(2,4);

  return `${day}/${month}/${year}`;
}

export function dateFormatter2(dateToFormat) {
  const date = new Date(dateToFormat);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const day = date.getDate();
  const dayWithSuffix = `${day}${daySuffix(day)}`;
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate.replace(day, dayWithSuffix)
}

const daySuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};


export function timeFormatter(timeToFormat) {
  const time = new Date(`1970-01-01T${timeToFormat}Z`);
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes === 0 ? '' : `.${minutes}`;

  if (formattedHours) {
    return `${formattedHours}${formattedMinutes}${period}`;
  }
}