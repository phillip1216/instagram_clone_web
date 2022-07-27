import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../Apollo';
import { useNavigate } from 'react-router-dom';


const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
     const navigate = useNavigate();
     const hasToken = useReactiveVar(isLoggedInVar);
     const { data } = useQuery(ME_QUERY, {
          skip: !hasToken,
     });
     useEffect(() => {
          if (data?.me === null) {
               logUserOut(navigate);
          }
     }, [data]);
     return { data };
}
export default useUser;