import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function useScope(currentPage) {
  const { user } = useContext(UserContext);
  let inScope = false;
  for (let scope in user.scope) {
    if (user.scope[scope] == currentPage) {
      inScope = true;
    }
  }

  return [user, inScope];
}
