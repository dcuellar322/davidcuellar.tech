export const EXPERIENCE_START_DATE = new Date(2010, 0, 1);

export function getYearsSince(startDate: Date, now = new Date()) {
  let years = now.getFullYear() - startDate.getFullYear();
  const anniversary = new Date(
    now.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );

  if (now < anniversary) {
    years -= 1;
  }

  return years;
}

export function getExperienceYears(now = new Date()) {
  return getYearsSince(EXPERIENCE_START_DATE, now);
}
