const getDate = (strDate: string) => {
  const date = new Date(strDate);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export {getDate}