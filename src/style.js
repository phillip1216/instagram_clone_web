import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
     accent: "#0095f6",
     fontColor: "black",
     bgColor: "rgb(250, 250, 250)",
     boxBgColor: "rgba(255,255,255)",
     boxFontColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
     accent: "#0095f6",
     fontColor: "#FAFAFA",
     bgColor: "rgb(18, 18, 18)",
     boxBgColor: "black",
     boxFontColor: "rgb(54, 54, 54)",
};

export const GlobalStyles = createGlobalStyle`
     ${reset}
     input {
          all:unset;
     }
     * {
          box-sizing:border-box;
     }
     body {
          background-color: ${(props) => props.theme.bgColor};
          font-size:14px;
          font-family:'Open Sans', sans-serif;
          color: ${(props) => props.theme.fontColor};
     }
     a {
          color:inherit;
          text-decoration: none;
     }
`;