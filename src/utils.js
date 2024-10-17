// Format the date to "dd/mm/yyyy hh:mmam/pm"
export const formattedDate = (timestamp) => {
  const date = new Date(timestamp);

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};
