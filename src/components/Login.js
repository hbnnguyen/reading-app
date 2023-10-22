import '@passageidentity/passage-elements/passage-auth';
import { APP_ID, API_URL } from '../App';
import './Login.css';

const Login = () => {
  return (
    <div className='login'>
      <passage-auth app-id={APP_ID}></passage-auth>
    </div>
  );
};

export default Login;