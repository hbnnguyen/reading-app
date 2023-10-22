import '@passageidentity/passage-elements/passage-register';

function Register() {
  return (
    <div>
      <passage-register app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-register>
    </div>
  );
}
export default Register;