import { useReactiveVar } from '@apollo/client';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { darkModeVar, disabledDarkMode, enabledDarkMode } from '../../Apollo';

const Container = styled.div`
     display: flex;
     height: 100vh;
     justify-content: center;
     align-items: center;
     flex-direction: column;
`;

const Wrapper = styled.div`
     max-width: 350px;
     width: 100%;
`;
const Footer = styled.div`
margin-top: 20px;
`
const DarkmodeBtn = styled.span`
cursor: pointer;
`
const AuthLayout = ({ children }) => {
     const darkMode = useReactiveVar(darkModeVar);
     const darkModeToggle = () => {
          darkMode ? disabledDarkMode() : enabledDarkMode()
     }
     return (
          <Container>
               <Wrapper>
                    {children}
               </Wrapper>
               <Footer>
                    <DarkmodeBtn onClick={() => darkModeToggle()}>
                         <FontAwesomeIcon icon={darkMode ? faSun : faMoon}></FontAwesomeIcon>
                    </DarkmodeBtn>
               </Footer>
          </Container>
     )
}
export default AuthLayout
