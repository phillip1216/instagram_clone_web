import styled from 'styled-components';

const EditButton = styled.input`
     border: 1px solid ${props => props.theme.boxFontColor};
     border-radius: 3px;
     margin-top: 12px;
     background-color:white;
     color: black;
     text-align: center;
     padding: 8px 0px;
     font-weight: 600;
     width: 100%;
     opacity: ${props => props.disabled ? "0.2" : "1"};
`;

export default EditButton;