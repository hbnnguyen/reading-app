import '@passageidentity/passage-elements/passage-auth';
import { APP_ID } from '../App';

const Login = () => {
  return (
      <div>
        <passage-auth app-id={APP_ID}></passage-auth>
      </div>
  );
}
export default Login;