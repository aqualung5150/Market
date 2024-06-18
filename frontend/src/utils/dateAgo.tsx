const dateAgo = (timestamp: Date, locale = "ko-KR") => {
  const diff = (new Date().getTime() - timestamp.getTime()) / 1000;
  const days = Math.floor(diff / (24 * 60 * 60));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const time = new Intl.DateTimeFormat(locale).format(timestamp);

  if (years > 0 || months > 0 || days > 1) {
    return time;
  } else if (days > 0) {
    return rtf.format(0 - days, "day");
  } else {
    return null;
  }
};

export default dateAgo;
