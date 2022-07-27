import styled from 'styled-components';

const SeparatorStyle = styled.div`
     margin: 20px 0px 10px 0px;
     text-transform: uppercase;
     display: flex;
     justify-content: center;
     width: 100%;
     align-items: center;
     div {
     width: 100%;
     height: 1px;
     background-color: ${(props) => props.theme.boxFontColor};
     }
     span {
     margin: 0px 10px;
     font-weight: 600;
     font-size: 12px;
     color: ${(props) => props.theme.boxFontColor};
     }
`;

const Separator = ({ text }) => {
     return (
          <SeparatorStyle>
               <div></div>
               <span>{text}</span>
               <div></div>
          </SeparatorStyle>
     )
}

export default Separator;