import React from "react";
import { AuthContext } from "../context/AuthContextProvider";

/**
 * 
 * @returns AuthContext
 */
export default function useAuth() {
  return React.useContext(AuthContext);
}