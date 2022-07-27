import styled from 'styled-components'
import Header from './Header'

const Content = styled.main`
     width: 100%;
     max-width: 935px;
     padding-top: 20px;
     margin: 0 auto;
     /* display: flex;
     align-items: center;
     justify-content: center; */
`
const Layout = ({ children }) => {
     return (
          <>
               <Header />
               <Content>
                    {children}
               </Content>
          </>
     )
}
export default Layout