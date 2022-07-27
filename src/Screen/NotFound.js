import styled from 'styled-components'

const NotFoundBox = styled.div`
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     h1{
          font-size: 50px;
          font-weight: bold;
     }
`


const notFound = () => {
     return (
          <NotFoundBox>
               <h1>404 Not Found ERROR :( </h1>
          </NotFoundBox>
     )
}
export default notFound