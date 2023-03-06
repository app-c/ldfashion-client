import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { LogIn } from "../pages/logIn";
import { AppAuth } from "./AppAuth";

export function Route() {
  const { user } = useAuth();

  return user?.nome ? <AppAuth /> : <LogIn />;
}
