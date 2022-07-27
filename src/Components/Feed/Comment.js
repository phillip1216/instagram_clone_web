import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'
import { FatText } from '../shared'
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const DELETE_COMMENT_MUTATION = gql`
     mutation deleteComment($id: Int!){
          deleteComment(id: $id) {
               ok   
          }
     }
`

const CommentContainer = styled.div`
     display: flex;
     align-items: center;
     margin-bottom: 10px;
`
const CommentCaption = styled.div`
     margin-left: 10px;
     a{
          background-color: inherit;
          cursor: pointer;
          color: ${(props) => props.theme.accent};
          &:hover{
               text-decoration: underline;
          }
     }
`
const Button = styled.button`
     border: none;
     background-color: inherit;
     cursor: pointer;
     margin-left: 8px;
     svg{
          opacity: 0.7;
          font-weight: 600;
          font-size: 10px;
          color: ${(props) => props.theme.accent};
     }
`

const Comment = ({ id, isMine, photoId, author, payload }) => {
     const updateDeleteComment = (cache, result) => {
          const { data: { deleteComment: { ok } } } = result;
          if (ok) {
               cache.evict({ id: `Comment:${id}` });
               cache.modify({
                    id: `Photo:${photoId}`,
                    fields: {
                         commentsNumber(prev) {
                              return prev - 1;
                         }
                    }
               })
          }

     }
     const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
          variables: {
               id,
          },
          update: updateDeleteComment
     })
     const onClick = () => {
          deleteCommentMutation()
     }
     return (
          <CommentContainer>
               <Link to={`users/${author}`}>
                    <FatText>{author}</FatText>
               </Link>
               <CommentCaption>
                    {
                         payload.split(" ").map((word, index) =>
                              /#[\w]+/g.test(word)
                                   ? (<React.Fragment key={index}> <Link to={`/hashtags/${word}`}>{word}</Link>{" "}</React.Fragment>)
                                   : /@[\w]+/g.test(word)
                                        ? (<React.Fragment key={index}> <Link to={`/username/${word}`}>{word}</Link>{" "}</React.Fragment>)
                                        : (<React.Fragment key={index}><span key={index}>{word}</span>{" "}</React.Fragment>)
                         )
                    }
               </CommentCaption >
               {isMine ? <Button onClick={onClick}><FontAwesomeIcon icon={faTrashAlt} /></Button> : null}
          </CommentContainer >
     )
}
Comment.propTypes = {
     photoId: PropTypes.number,
     isMine: PropTypes.bool,
     id: PropTypes.number,
     author: PropTypes.string.isRequired,
     payload: PropTypes.string.isRequired,
};
export default Comment