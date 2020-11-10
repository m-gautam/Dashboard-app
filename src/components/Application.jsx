import React, { useContext } from "react";

import HomePage from "../HomePage";
import { Router } from "@reach/router";
import SignIn from "../SignIn";
import { UserContext } from "../providers/UserProvider";

const Application = () => {
  const user = useContext(UserContext);

  return user ? (
    <HomePage />
  ) : (
    <Router>
      <SignIn path="/" />
    </Router>
  );
};

export default Application;
