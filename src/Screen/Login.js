import { gql, useMutation } from '@apollo/client';
import {
     faFacebookSquare,
     faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { logUserIn } from '../Apollo';
import AuthLayout from '../Components/Auth/AuthLayout';
import BottomBox from '../Components/Auth/BottomBox';
import Button from '../Components/Auth/Button';
import Formbox from '../Components/Auth/FormBox';
import FormError from '../Components/Auth/FormError';
import Input from '../Components/Auth/Input';
import Notification from '../Components/Auth/Notification';
import PageTitle from '../Components/Auth/PageTitle';
import Separator from '../Components/Auth/Separator';
import routes from '../routes';

const FacebookLogin = styled.div`
     color: #385285;
     margin-top: 20px;
     span {
     margin-left: 10px;
     font-weight: 600;
     }
`;

const LOGIN_MUTATION = gql`
     mutation Login($username: String!, $password:String!){
          login(username:$username,password:$password){
               ok
               token
               error
          }
     }
`

function Login() {
     const { state } = useLocation();
     const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors } =
          useForm({
               mode: "onChange",
               defaultValues: {
                    username: state?.username || "",
                    password: state?.password || ""
               }
          });

     const onCompleted = (data) => {
          const { login: { ok, token, error } } = data;
          if (!ok) {
               return setError("result", {
                    message: error
               })
          }
          if (token) {
               logUserIn(token)
          }
     }
     const [login, { loading }] = useMutation(LOGIN_MUTATION, {
          onCompleted
     })
     const onSubmit = (data) => {
          if (loading) {
               return;
          }
          const { username, password } = getValues();
          login({
               variables: {
                    username,
                    password
               }
          })
     }
     return (
          <AuthLayout>
               <PageTitle title="Log in" />
               <Formbox>
                    <div>
                         <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <Notification msg={state?.message} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <Input {...register("username", {
                              required: "Username is Required",
                              minLength: {
                                   value: 5,
                                   message: "Username should be longer than 5 chars.",
                              }
                         })}
                              onFocus={() => clearErrors("result")}
                              type="text" placeholder="Username" hasError={Boolean(errors?.username?.message)}
                              autoComplete='on'
                         />
                         <FormError message={errors?.username?.message} />
                         <Input {...register("password", { required: "Password is Required" })}
                              onFocus={() => clearErrors("result")}
                              type="password" placeholder="Password" autoComplete='on' />
                         <FormError message={errors?.password?.message} />
                         <Button type="submit" value={loading ? "Loading..." : "Log in"} disabled={!isValid || loading} />
                         <FormError message={errors?.result?.message} />
                    </form>
                    <Separator text="or" />
                    <FacebookLogin>
                         <FontAwesomeIcon icon={faFacebookSquare} />
                         <span>Log in with Facebook</span>
                    </FacebookLogin>
               </Formbox>
               <BottomBox cta="Don't have an account?" link={routes.signUp} linkTxt="Sign up" />
          </AuthLayout>
     );
}
export default Login;