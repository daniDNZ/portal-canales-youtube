
/**
 * Returns a string date formated 
 * 
 * @param {string}strDate - String date
 * @returns String date formatted
 */
const getFormattedDate = (strDate: string) => {
  const date = new Date(strDate);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

/**
 * Returns src from a string Iframe
 * 
 * @param {string}iframeString - Iframe in string format provided by the api
 * @returns Video URL
 */
const getIframeUrl = (iframeString: string) => {
  const doc = new DOMParser().parseFromString(iframeString, "text/html");
  const iframe = doc.querySelector("iframe");
  return iframe?.src;
};

/**
 * Divide the first number by the second number and round it
 * 
 * @param n1 - First number
 * @param n2 - Second number
 * @returns Rounded average or 0
 */
const getAverage = (n1: number = 0, n2: number = 0): number => {
  return n1 && n2 ? Math.round(n1 / n2) : 0;
};



export { getFormattedDate, getIframeUrl, getAverage }

