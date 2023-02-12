export interface IApiFetchParams {
  url: {
    kind: string,
    params: string
  },
  method: string,
  body?: unknown
}

/**
 * Function to fetch YT API. 
 * Example:
 * apiFetch({"videos/"})
 * 
 * @param param0 - Object with url, method and body(optional).
 * @returns Data or empty object.
 */
export default async function apiFetch({ url, method, body = undefined }: IApiFetchParams) {
  try {
    const options: RequestInit = {
      method,
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const finalUrl = `${process.env.REACT_APP_YT_API_URL}${url.kind}?${url.params}&key=${process.env.REACT_APP_YT_API_KEY}`
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