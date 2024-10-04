import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function useScope(currentPage) {
  const { user } = useContext(UserContext);
  let inScope = false;
  console.log("====================================");
  console.log("checking", currentPage, "in", user.scope);
  console.log("====================================");
  for (let scope in user.scope) {
    if (user.scope[scope] == currentPage) {
      inScope = true;
    }
  }

  return [user, inScope];
}
