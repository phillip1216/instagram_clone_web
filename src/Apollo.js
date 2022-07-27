import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import routes from './routes';

const TOKEN = "TOKEN"
const DARKMODE = "DARKMODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
console.log(localStorage.getItem(TOKEN))
export const logUserIn = (token) => {
     localStorage.setItem(TOKEN, token);
     isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
     localStorage.removeItem(TOKEN);
     isLoggedInVar(false);
     navigate(routes.home, { replace: true });
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARKMODE)));

export const enabledDarkMode = () => {
     localStorage.setItem(DARKMODE, "enable")
     darkModeVar(true)
}
export const disabledDarkMode = () => {
     localStorage.removeItem(DARKMODE)
     darkModeVar(false)
}

const httpLink = createHttpLink({
     uri: "http://localhost:4001/graphql",
});

const authLink = setContext((_, { headers }) => {
     return {
          headers: {
               ...headers,
               token: localStorage.getItem(TOKEN),
          },
     };
});

export const client = new ApolloClient({
     link: authLink.concat(httpLink),
     cache: new InMemoryCache({
          typePolicies: {
               User: {
                    keyFields: (obj) => `User:${obj.username}`
               }
          }
     }),
});