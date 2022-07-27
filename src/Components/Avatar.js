import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'

const AvatarStyle = styled.div`
     width: ${(props) => (props.lg ? "35px" : "25px")};
     height: ${(props) => (props.lg ? "35px" : "25px")};
     border-radius: 25px;
     background-color: #dbdbdc;
     display: flex;
     align-items:flex-end;
     justify-content: center;
     overflow: hidden;
     img{
          width: 100%;
     }

`

const Avatar = ({ url = "", lg = false }) => {
     return (
          <AvatarStyle lg={lg}>
               {url ? <img src={url}></img> : <FontAwesomeIcon icon={faUserLarge} color="white" size={lg ? "2xl" : "xl"} />}
          </AvatarStyle>
     )
}
export default Avatar;