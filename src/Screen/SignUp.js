import { gql, useMutation } from '@apollo/client';
import {
     faFacebookSquare,
     faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import AuthLayout from '../Components/Auth/AuthLayout';
import BottomBox from '../Components/Auth/BottomBox';
import Button from '../Components/Auth/Button';
import Formbox from '../Components/Auth/FormBox';
import FormError from '../Components/Auth/FormError';
import Input from '../Components/Auth/Input';
import PageTitle from '../Components/Auth/PageTitle';
import Separator from '../Components/Auth/Separator';
import { FatLink, TextStyle } from '../Components/shared';
import routes from '../routes';

const HeaderContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
`
const SubTitle = styled(FatLink)`
     text-align: center;
     font-size: 16px;
     margin-top: 10px;
     margin-bottom: 10px;
`
const FaceBookButton = styled.button` 
     cursor: pointer;
     span {
     margin-left: 10px;
     font-weight: 600;
     }
     border: none;
     border-radius: 3px;
     margin-top: 12px;
     background-color: ${(props) => props.theme.accent};
     color: white;
     text-align: center;
     padding: 8px 0px;
     font-weight: 600;
     width: 100%;
`
const Ex = styled(TextStyle)`
     margin-top: 20px;
     margin-bottom: 10px;
     font-size: 12px;
     text-align: center;
`
const SpanLink = styled(FatLink)`
     cursor: pointer;
`
const CREATE_ACCOUNT_MUTATION = gql`
     mutation createAccount($firstName:String!,$lastName:String!,$username:String!,$email:String!,$password:String!){
          createAccount(firstName:$firstName,lastName:$lastName,username:$username,email:$email,password:$password){
               ok
               error
          }
     }
`
function SignUp() {
     const navigate = useNavigate();
     const onCompleted = (data) => {
          const { username, password } = getValues();
          const { createAccount: { ok, error } } = data;
          if (!ok) {
               return setError("result", {
                    message: error
               })
          }
          navigate(routes.home, { state: { message: "Account created, Please Log In.", username, password } });
     }
     const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
          onCompleted
     })
     const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm({ mode: "onChange" });
     const onSubmit = (data) => {
          if (loading) {
               return;
          }
          createAccount({
               variables: {
                    ...data
               }
          })
     }
     return (
          <AuthLayout>
               <PageTitle title="Sign Up" />
               <Formbox>
                    <HeaderContainer>
                         <FontAwesomeIcon icon={faInstagram} size="3x" />
                         <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
                         <FaceBookButton>
                              <FontAwesomeIcon icon={faFacebookSquare} />
                              <span>Log in with Facebook</span>
                         </FaceBookButton>
                    </HeaderContainer>
                    <Separator text="or" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <Input {...register("email", {
                              required: "Email is Required",
                         })} type="text" placeholder="Mobile Number or Email" />
                         <FormError message={errors?.email?.message} />
                         <Input {...register("firstName", {
                              required: "Firstname is Required",
                         })} type="text" placeholder="First Nmae" />
                         <FormError message={errors?.firstName?.message} />
                         <Input {...register("lastName", {
                              required: "Lastname is Required",
                         })} type="text" placeholder="Last Name" />
                         <FormError message={errors?.lastName?.message} />
                         <Input {...register("username", {
                              required: "Username is Required",
                              minLength: {
                                   value: 5,
                                   message: "Username should be longer than 5 chars.",
                              }
                         })}
                              onFocus={() => clearErrors("result")}
                              type="text" placeholder="Username" hasError={Boolean(errors?.username?.message)}
                         />
                         <FormError message={errors?.username?.message} />
                         <Input {...register("password", { required: "Password is Required" })}
                              type="password" placeholder="Password" />
                         <FormError message={errors?.password?.message} />
                         <Ex>People who use our service may have uploaded your contact information to Instagram. <SpanLink>Learn More</SpanLink></Ex>
                         <Button type="submit" value={loading ? "Loading..." : "Sign in"} disabled={!isValid || loading} />
                    </form>

               </Formbox>
               <BottomBox cta="Have an account?" link={routes.home} linkTxt="Log in" />
          </AuthLayout>
     );
}
export default SignUp;