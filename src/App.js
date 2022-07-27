import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Screen/Home";
import Login from "./Screen/Login";
import NotFound from "./Screen/NotFound";
import SignUp from "./Screen/SignUp";
import { darkModeVar, isLoggedInVar, client } from "./Apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./style";
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Components/Header';
import Layout from './Components/Layout';
import Profile from './Screen/Profile';


function App() {
     const isLoggedIn = useReactiveVar(isLoggedInVar);
     const darkMode = useReactiveVar(darkModeVar);
     return (
          <ApolloProvider client={client}>
               <HelmetProvider>
                    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                         <GlobalStyles />
                         <Router>
                              <Routes>
                                   <Route path={routes.home} element={isLoggedIn ? <Layout><Home /></Layout> : <Login />} />
                                   {!isLoggedIn ?
                                        <Route path={routes.signUp} element={<SignUp />} />
                                        : null}
                                   <Route path="users/:username" element={<Layout><Profile /></Layout>} />
                                   <Route path="*" element={< NotFound />} />
                              </Routes>
                         </Router>
                    </ThemeProvider>
               </HelmetProvider>
          </ApolloProvider>

     );
}

export default App;