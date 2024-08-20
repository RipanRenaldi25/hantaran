export const mapDateToDB = (isoStringDate: string) => {
  const [date, timeWithTimezone] = isoStringDate.split('T');
  const [time] = timeWithTimezone.split('.');
  return `${date} ${time}`;
};

console.log(mapDateToDB(new Date().toISOString()));
