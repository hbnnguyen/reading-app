import '@passageidentity/passage-elements/passage-auth';
import './Login.css';

const Login = () => {
  return (
    <div className='login'>
      <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-auth>
    </div>
  );
};

export default Login;