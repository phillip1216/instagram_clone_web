import styled from 'styled-components';

const FormErrorStyle = styled.span`
     font-weight: 600;
     font-size: 12px;
     color: tomato;
     margin-top: 5px;
`

const FormError = ({ message }) => {
     return (
          message === "" || !message ? null : <FormErrorStyle>{message}</FormErrorStyle>
     )
}
export default FormError;