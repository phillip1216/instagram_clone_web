import { gql, useMutation } from '@apollo/client';
import PropTypes from "prop-types";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '../../Hooks/useUser';
import Comment from './Comment';

const CREATE_COMMENT_MUTATION = gql`
     mutation createComment($photoId: Int!, $payLoad: String!){
          createComment(photoId: $photoId, payLoad: $payLoad) {
               ok
               id
          }
     }
`

const CommentsContainer = styled.div`
     margin-top: 20px;
`;
const CommentCount = styled.span`
     opacity: 0.7;
     margin: 10px 0px;
     display: block;
     font-weight: 600;
     font-size: 10px;
`;
const CommentForm = styled.div`
     display: flex;
     align-items: center;
     width: 100%;
     padding: 15px;
     border-top: 1px solid ${props => props.theme.boxFontColor};
`;
const Form = styled.form`
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
`
const Input = styled.input`
     width: 90%;
     height: 100%;
`
const Button = styled.input`
     background-color: inherit;
     color: ${props => props.theme.accent};
     cursor: pointer;
`

const Comments = ({ photoId, comments, commentsNumber, author, caption }) => {
     const { data: userData } = useUser();
     const { register, handleSubmit, setValue, getValues } = useForm();
     const updateComment = (cache, result) => {
          const { payLoad } = getValues();
          setValue("payLoad", "")
          const { data: { createComment: { ok, id } } } = result;
          if (ok && userData.me) {
               const newComment = {
                    __typename: "Comment",
                    id,
                    isMine: true,
                    payLoad,
                    user: {
                         ...userData.me
                    }
               }
               cache.modify({
                    id: `Photo:${photoId}`,
                    fields: {
                         comments(prev) {
                              return [...prev, newComment];
                         },
                         commentsNumber(prev) {
                              return prev + 1;
                         }
                    }
               })
          }
     }
     const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
          update: updateComment
     })

     const onValid = (data) => {
          const { payLoad } = data;
          if (loading) {
               return;
          }
          createComment({
               variables: {
                    photoId,
                    payLoad
               }
          });
     }

     return (
          <CommentsContainer>
               <Comment author={author} payload={caption} />
               <CommentCount>
                    {commentsNumber === 1 ? "1 comment" : `${commentsNumber} comments`}
               </CommentCount>
               {comments?.map(comment =>
                    <Comment key={comment.id} photoId={photoId} isMine={comment.isMine} id={comment.id} author={comment.user.username} payload={comment.payLoad} />
               )}
               <CommentForm>
                    <Form onSubmit={handleSubmit(onValid)}>
                         <Input
                              {...register("payLoad", {
                                   required: true
                              })}
                              type="text"
                              placeholder="Add a comment..."
                         />
                         <Button type="submit" value="Post" />
                    </Form>
               </CommentForm>
          </CommentsContainer>
     )
}
Comments.propTypes = {
     photoId: PropTypes.number.isRequired,
     author: PropTypes.string.isRequired,
     caption: PropTypes.string,
     commentsNumber: PropTypes.number.isRequired,
     comments: PropTypes.arrayOf(
          PropTypes.shape({
               id: PropTypes.number.isRequired,
               user: PropTypes.shape({
                    avatar: PropTypes.string,
                    username: PropTypes.string.isRequired,
               }),
               payLoad: PropTypes.string.isRequired,
               isMine: PropTypes.bool.isRequired,
               createdAt: PropTypes.string.isRequired,
          })
     ),
};

export default Comments