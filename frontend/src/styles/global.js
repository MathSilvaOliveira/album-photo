import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    
    html, body {
        height: 100%;
        margin: 0;
        overflow: hidden; 
    }
    
    #root {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
}
  
`;

export default GlobalStyle;