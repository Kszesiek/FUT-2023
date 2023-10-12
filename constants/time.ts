export const weekday = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];

export   const currentDate = new Date(Date.now()); //  new Date(2023, 9, 14, 11, 0);

export function getTimeFrame(start: Date, end: Date) {
  if (start.getTime() === end.getTime()) {
    return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}`;
  }

  const timeDifference = end.getTime() - start.getTime();
  const durationHours = Math.floor(timeDifference / 3600000);
  const hoursLabel = durationHours > 0 ? `${durationHours}h` : "";
  const durationMinutes = (timeDifference % 3600000) / 60000;
  const minutesLabel = durationMinutes > 0 ? `${durationMinutes}min` : "";
  const spaceInDuration = durationHours > 0 && durationMinutes > 0 ? " " : "";

  const timeRange = `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  const durationLabel = `(${hoursLabel}${spaceInDuration}${minutesLabel})`;

  return timeRange + " " + durationLabel;
}