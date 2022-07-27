import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { isLoggedInVar } from '../Apollo';
import useUser from '../Hooks/useUser';
import routes from '../routes';
import Avatar from './Avatar';

const SHeader = styled.header`
     width: 100%;
     border-bottom: 1px solid ${(props) => props.theme.boxFontColor};
     background-color: ${(props) => props.theme.bgColor};
     padding: 18px 0px;
     display: flex;
     align-items: center;
     justify-content: center;
`;

const Wrapper = styled.div`
     max-width: calc(935px + 40px);
     padding: 0 20px ;
     width: 100%;
     display: flex;
     justify-content: space-between;
     align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
     margin-left: 15px;
`;
const IconWrap = styled.div`
display: flex;
align-items: center;
`

function Header() {
     const isLoggedIn = useReactiveVar(isLoggedInVar);
     const { data } = useUser();
     return (
          <SHeader>
               <Wrapper>
                    <Column>
                         <Link to={routes.home}>
                              <FontAwesomeIcon icon={faInstagram} size="2xl" />
                         </Link>
                    </Column>
                    <Column>
                         {isLoggedIn ? (
                              <IconWrap>
                                   <Icon>
                                        <Link to={routes.home}>
                                             <FontAwesomeIcon icon={faHome} size="xl" />
                                        </Link>
                                   </Icon>
                                   <Icon>
                                        <FontAwesomeIcon icon={faCompass} size="xl" />
                                   </Icon>
                                   <Icon>
                                        <Link to={`/users/${data?.me?.username}`}>
                                             <Avatar url={data?.me?.avatar} />
                                        </Link>
                                   </Icon>
                              </IconWrap>
                         ) : null}
                    </Column>
               </Wrapper>
          </SHeader >
     );
}
export default Header;