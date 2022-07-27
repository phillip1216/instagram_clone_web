import styled from 'styled-components';

const Input = styled.input`
     width: 100%;
     border-radius: 3px;
     padding: 7px;
     background-color:  ${(props) => props.theme.bgColor};
     border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.boxFontColor};
     margin-top: 5px;
     box-sizing: border-box;
     &::placeholder {
     font-size: 12px;
     }
`;
export default Input;