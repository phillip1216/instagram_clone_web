import PropTypes from "prop-types";
import { FatText } from '../shared';
import Avatar from '../Avatar';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faBookmark,
     faComment,
     faHeart,
     faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { gql, useMutation } from '@apollo/client';
import Comments from './Comments';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LIKE_MUTATION = gql`
     mutation toggleLike($toggleLikeId: Int!){
          toggleLike(id: $toggleLikeId) {
               ok
          }
     }
`

const PhotoContainer = styled.div`
     background-color: ${(props) => props.theme.bgColor};
     border: 1px solid ${(props) => props.theme.boxFontColor};
     margin-bottom: 20px;
     max-width: 615px;
     border-radius: 5px;
`
const PhotoHeader = styled.div`
     padding: 15px 20px;
     display: flex;
     align-items: center;
`
const PhotoFile = styled.img`
     width: 100%;
`;

const UserName = styled(FatText)`
     margin-left: 15px;
`
const PhotoData = styled.div`
     padding: 15px 15px 0 15px;
`
const PhotoActions = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     div{
          display: flex;
          align-items: center;
     }
     svg{
          font-size: 20px;
     }
`
const PhotoAction = styled.div`
     margin-right: 10px;
     cursor: pointer;
`
const PhotoForm = styled.div``
const Likes = styled(FatText)`
     margin-top: 15px; 
     display: block;
`


const Photo = ({ id, user, file, isLiked, likes, caption, commentsNumber, comments }) => {
     const updateToggleLike = (cache, result) => {
          const { data: { toggleLike: { ok } } } = result;
          if (ok) {
               const photoId = `Photo:${id}`;
               cache.modify({
                    id: photoId,
                    fields: {
                         isLiked(prev) {
                              return !prev
                         },
                         likes(prev) {
                              if (isLiked) {
                                   return prev - 1;
                              }
                              return prev + 1;
                         }
                    }
               })
          }
     }
     const [like] = useMutation(LIKE_MUTATION, {
          variables: {
               toggleLikeId: id
          },
          update: updateToggleLike
     })

     return (
          <PhotoContainer key={id}>
               <PhotoHeader>
                    <Link to={`users/${user?.username}`}>
                         <Avatar url={user?.avatar} lg />
                    </Link>
                    <Link to={`users/${user?.username}`}>
                         <UserName>{user?.username}</UserName>
                    </Link>
               </PhotoHeader>
               <PhotoFile src={file} />
               <PhotoData>
                    <PhotoActions>
                         <div>
                              <PhotoAction onClick={like}>
                                   {isLiked
                                        ? <FontAwesomeIcon icon={SolidHeart} color="tomato" />
                                        : <FontAwesomeIcon icon={faHeart} />
                                   }
                              </PhotoAction>
                              <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                              <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                         </div>
                         <div>
                              <FontAwesomeIcon icon={faBookmark} />
                         </div>
                    </PhotoActions>
                    <Likes>{likes === 1 ? "1 Like" : `${likes} Likes`}</Likes>
                    <Comments photoId={id} comments={comments} commentsNumber={commentsNumber} author={user.username} caption={caption} />
               </PhotoData>
          </PhotoContainer>
     )
}
Photo.propTypes = {
     id: PropTypes.number.isRequired,
     user: PropTypes.shape({
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired,
     }),
     caption: PropTypes.string,
     file: PropTypes.string.isRequired,
     isLiked: PropTypes.bool.isRequired,
     likes: PropTypes.number.isRequired,
     commentsNumber: PropTypes.number.isRequired,
};
export default Photo;