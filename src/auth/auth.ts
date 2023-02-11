export interface ICredentials {
  user: string;
  password: string;
}

/**
 * Verify credentials from mock data
 * 
 * @param {ICredentials} credentials - user, password
 * @returns {boolean} Boolean
 */
const checkAuth = (credentials: ICredentials) => {
  const mockCredentials = {
    user: "admin012",
    password: "admin012"
  }

  return credentials.user === mockCredentials.user &&
  credentials.password === mockCredentials.password ? true : false
} 

export { checkAuth };