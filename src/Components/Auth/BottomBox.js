import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const BottomBoxStyle = styled(BaseBox)`
     padding: 20px 0px;
     text-align: center;
     a {
     font-weight: 600;
     margin-left: 5px;
     color: ${(props) => props.theme.accent};
     }
`;
const BottomBox = ({ cta, link, linkTxt }) => {
     return (
          <BottomBoxStyle>
               <span>{cta}</span>
               <Link to={link}>{linkTxt}</Link>
          </BottomBoxStyle>
     )
}
export default BottomBox;