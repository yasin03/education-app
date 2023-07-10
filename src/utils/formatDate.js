export const formatDate = (date) => {
  const options = { day: "numeric", month: "long" };
  const newDate = new Date(date);
  return newDate.toLocaleDateString("tr-TR", options);
};
