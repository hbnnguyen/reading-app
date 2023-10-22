import '@passageidentity/passage-elements/passage-register';
import { APP_ID } from '../App';

function Register() {
  return (
    <div>
      <passage-register app-id={APP_ID}></passage-register>
    </div>
  );
}
export default Register;