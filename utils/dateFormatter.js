const formConstants = require("../constants/formConstants");

const dateFormatter = (timeStamp) => {
  const date = new Date(timeStamp);
  const istTime = new Date(date);
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    hourCycle: "h12",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
    istTime
  );

  const amPm = istTime.getHours() >= 12 ? "PM" : "AM";
  const result = formattedDate.replace(/(am|pm)/i, amPm);

  return result;
};

module.exports = { dateFormatter };
