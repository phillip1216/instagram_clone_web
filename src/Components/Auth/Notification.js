import styled from 'styled-components'

const NotificationStyle = styled.span`
     color: #2ecc71;
     font-weight: 600;
     font-size: 12px;
     margin-top: 5px;
`

const Notification = ({ msg }) => {
     return (
          msg === "" || !msg ? null : <NotificationStyle>{msg}</NotificationStyle>
     )
}
export default Notification