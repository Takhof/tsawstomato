import Auth, { CognitoUser } from "@aws-amplify/auth";
import { CheckCircleOutlineSharp } from "@material-ui/icons";
import { Hub } from "aws-amplify";
import { createContext, useEffect, useState } from "react";

const userContext = createContext<CognitoUser | null>(null);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({}: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth"),
      () => {
        checkUser();
      };
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (error) {
      //no user
    }
  }

  return (
    <userContext.Provider value={(user, setUser)}>
      {children}
    </userContext.Provider>
  );
}
