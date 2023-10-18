import '@passageidentity/passage-elements/passage-auth';
import { APP_ID, API_URL } from '../App';
import axios from 'axios';


const Login = () => {
  // const authToken = localStorage.getItem("psg_auth_token");
  // axios
  //   .get(`${API_URL}/${PATH}`, {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   });
  return (
    <div>
      <passage-auth app-id={APP_ID}></passage-auth>
    </div>
  );
};
export default Login;