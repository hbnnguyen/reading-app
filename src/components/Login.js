import '@passageidentity/passage-elements/passage-auth';
import { APP_ID, API_URL } from '../App';
// import axios from 'axios';


const Login = () => {
  return (
    <div className="form-container">
      <passage-auth app-id={APP_ID}></passage-auth>
    </div>
  );
};
export default Login;