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
  return date.toLocaleDateString('en-GB', options);
}
