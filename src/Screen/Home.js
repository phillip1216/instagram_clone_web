import { gql, useQuery } from '@apollo/client';
import Photo from '../Components/Feed/Photo';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

const FEED_QUERY = gql`
     ${PHOTO_FRAGMENT}
     ${COMMENT_FRAGMENT}
     query seeFeed{
          seeFeed {
               ...PhotoFragment
               user {
                    username
                    avatar
                    __typename
               }
               caption
               comments {
                    ...CommentFragment
               }
               createAt
               isMine
               __typename
          }
     }
`
const Home = () => {
     const { data } = useQuery(FEED_QUERY);
     console.log(data)
     return (
          <div>
               {data?.seeFeed?.map(photo =>
                    <Photo key={photo.id} {...photo} />
               )}
          </div>
     )
}

export default Home