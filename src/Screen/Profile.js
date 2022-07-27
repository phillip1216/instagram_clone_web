import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Auth/Button';
import PageTitle from '../Components/Auth/PageTitle';
import { FatText } from '../Components/shared';
import { PHOTO_FRAGMENT } from '../fragments';
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditButton from '../Components/Auth/EditButton';
import useUser from '../Hooks/useUser';


const SEE_PROFILE_QUERY = gql`
     ${PHOTO_FRAGMENT}
     query seeProfile($username: String!) {
          seeProfile(username: $username) {
               firstName
               lastName
               username
               bio
               email
               avatar
               photos {
                    ...PhotoFragment
               }
               totalFollowing
               totalFollowers
               isMe
               isFollowing
          }
     }
`;

const FOLLOW_USER_MUTATION = gql`
     mutation followUser($username: String!){
     followUser(username: $username) {
          ok
     }
}
`
const UNFOLLOW_USER_MUTATION = gql`
     mutation unFollow($username: String!){
          unFollow(username: $username) {
               ok
          }
     }
`

const ProfileContainer = styled.div`
`
const ProfileHeader = styled.div`
     padding: 10px 20px;
     display: flex;
`
const Avatar = styled.img`
     margin-left: 70px;
     height: 160px;
     width: 160px;
     border-radius: 70%;
     margin-right: 130px;
     background-color: #2c2c2c;
     border: none;
`;
const Column = styled.div`

`
const Row = styled.div`
     margin-bottom: 30px;
     display: flex;
`
const Username = styled.span`
     font-size: 26px;
`
const List = styled.div`
     display: flex;
`
const Item = styled.div`
     font-size: 16px;
     margin-right: 20px;
`
const Value = styled(FatText)`
     margin-left: 5px;
`
const NameBio = styled.div`
     margin-bottom: 20px;    
     display: flex;
     flex-direction: column;
`
const Name = styled(FatText)`
margin-bottom: 5px;
`
const Bio = styled.span`
     opacity: 0.7;
     display: block;
     font-size: 16px;
`
const First = styled(FatText)`
`
const Last = styled(FatText)`
     margin-left: 5px;
`
const Email = styled.span`
     opacity: 0.7;
     display: block;
     font-size: 12px;
     color: ${props => props.theme.accent};
`
const Grid = styled.div`
     display: grid;
     grid-auto-rows: 290px;
     grid-template-columns: repeat(3, 1fr);
     gap: 30px;
     margin-top: 50px;
     border-top: 1px solid ${props => props.theme.boxFontColor};
     padding-top: 50px;
`
const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-color: white;
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
     as: "span",
})`
  margin-left: 20px;
  margin-top: 0px;
  padding: 5px 10px;
  cursor: pointer;
`;
const ProfileEditBtn = styled(EditButton).attrs({
     as: "span",
})`
  margin-left: 20px;
  margin-top: 0px;
  padding: 5px 10px;
  cursor: pointer;
`;
const Profile = () => {
     const { username } = useParams();
     const { data: userData } = useUser();
     // const { me } = userData;
     console.log(userData)
     const updateFollow = (cache, result) => {
          const { data: { followUser: { ok } } } = result;
          if (ok) {
               cache.modify({
                    id: `User:${username}`,
                    fields: {
                         isFollowing(prev) {
                              return true;
                         },
                         totalFollowers(prev) {
                              return prev + 1;
                         }
                    }
               });
               cache.modify({
                    id: `User:${userData?.me?.username}`,
                    fields: {
                         totalFollowing(prev) {
                              return prev + 1;
                         }
                    }
               });

          }
     }
     const updateUnFollow = (cache, result) => {
          const { data: { unFollow: { ok } } } = result;
          if (ok) {
               cache.modify({
                    id: `User:${username}`,
                    fields: {
                         isFollowing(prev) {
                              return false;
                         },
                         totalFollowers(prev) {
                              return prev - 1;
                         }
                    }
               });
               cache.modify({
                    id: `User:${userData?.me?.username}`,
                    fields: {
                         totalFollowing(prev) {
                              return prev - 1;
                         }
                    }
               });
          }
     }
     const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
          variables: {
               username,
          }, update: updateFollow
     })
     const [unFollow] = useMutation(UNFOLLOW_USER_MUTATION, {
          variables: {
               username,
          }, update: updateUnFollow
     })
     const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
          variables: {
               username,
          }
     })
     const user = data?.seeProfile;
     const getButton = (seeProfile) => {
          const { isMe, isFollowing } = seeProfile;
          if (isMe) {
               return <ProfileEditBtn>Edit Profile</ProfileEditBtn>;
          }
          if (isFollowing) {
               return <ProfileBtn onClick={unFollow}>Unfollow</ProfileBtn>;
          } else {
               return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
          }
     };
     return (
          <ProfileContainer>
               <PageTitle
                    title={
                         loading ? "Loading..." : `${user?.username} 's Profile`
                    }
               />
               <ProfileHeader>
                    <Avatar src={user?.avatar} />
                    <Column>
                         <Row>
                              <Username>
                                   {user?.username}
                              </Username>
                              {data?.seeProfile ? getButton(data.seeProfile) : null}
                         </Row>
                         <Row>
                              <List>
                                   <Item>
                                        <span>Posts<Value>{user?.photos?.length}</Value></span>
                                   </Item>
                                   <Item>
                                        <span>Followers<Value>{user?.totalFollowers}</Value></span>
                                   </Item>
                                   <Item>
                                        <span>Following<Value>{user?.totalFollowing}</Value></span>
                                   </Item>
                              </List>
                         </Row>
                         <NameBio>
                              <Name>
                                   <First> {user?.firstName}</First>
                                   <Last> {user?.lastName}</Last>
                              </Name>
                              <Bio>
                                   {user?.bio}
                              </Bio>
                         </NameBio>
                         <Row>
                              <Email>{user?.email}</Email>
                         </Row>
                    </Column>
               </ProfileHeader>
               <Grid>
                    {data?.seeProfile?.photos.map((photo) => (
                         <Photo key={photo.id} bg={photo.file}>
                              <Icons>
                                   <Icon>
                                        <FontAwesomeIcon icon={faHeart} />
                                        {photo.likes}
                                   </Icon>
                                   <Icon>
                                        <FontAwesomeIcon icon={faComment} />
                                        {photo?.commentsNumber ? photo?.commentsNumber : 0}
                                   </Icon>
                              </Icons>
                         </Photo>
                    ))}
               </Grid>
          </ProfileContainer >
     )
}
export default Profile;