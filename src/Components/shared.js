import styled from 'styled-components';

export const BaseBox = styled.div`
     background-color: ${(props) => props.theme.boxBgColor} ;
     border: 1px solid ${(props) => props.theme.boxFontColor};
     width: 100%;
`;

export const FatLink = styled.span`
     font-weight: 800;
     color: rgba(142,142,142);
`
export const FatText = styled.span`
     font-weight: 600;
     color:  ${(props) => props.theme.fontColor};
`
export const TextStyle = styled.span`
     font-weight: 200;
     color: rgba(142,142,142);
`