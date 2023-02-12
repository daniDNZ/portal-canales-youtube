export interface IApiFetchParams {
  kind: string,
  params: string
}

/**
 * Function to fetch YT API. 
 * Example:
 * apiFetch({"videos/"})
 * 
 * @param param0 - Object with url, method and body(optional).
 * @returns Data or empty object.
 */
export default async function apiFetch({ kind, params }: IApiFetchParams) {
  try {
    const options: RequestInit = {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const finalUrl = `${process.env.REACT_APP_YT_API_URL}${kind}?${params}&key=${process.env.REACT_APP_YT_API_KEY}`
    const request = new Request( finalUrl, options)

    const res = await fetch(request);

    if (res.status >= 400) {
      throw new Error('');
    }
    if (res.status >= 500) {
      throw new Error('');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    return {};
  }
}