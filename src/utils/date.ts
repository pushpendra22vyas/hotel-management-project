export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysDifference = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isDateInRange = (date: string, start: string, end: string): boolean => {
  const checkDate = new Date(date);
  const startDate = new Date(start);
  const endDate = new Date(end);
  return checkDate >= startDate && checkDate <= endDate;
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};
