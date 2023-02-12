/**
 * Save user in localStorage
 * 
 * @param data - Username, format: {user: "username"}
 */
function setSession(sessionData: string) {
  localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_TAG as string, sessionData);
}

/**
 * Get session info from localStorage
 * 
 * @returns Session Info
 */
function getSession() {
  return localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TAG as string);
}

export {setSession, getSession}