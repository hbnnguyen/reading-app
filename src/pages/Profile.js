import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import userContext from "../userContext";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";
import { Button } from '@mui/material/';
import './Profile.css';
import '@passageidentity/passage-elements/passage-profile';

const Profile = ({ user, setUser }) => {
  // const { user } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: ""
  });

  useEffect(function getUserInfo() {
    if (user.data) {
      setUserInfo({
        name: user.data.name,
        age: user.data.age,
        email: user.data.email
      });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // data = JSON.stringify(data);
    try {
      await ReadingApi.editUser(user, data)
      let newUser = { ...user };
      newUser.data.name = data.name;
      newUser.data.age = data.age;
      setUser(newUser);
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div>
    <div className="profile-container" id="Main">
      <div className="user-profile">
        <div className="profile-head">
          <h3>Profile</h3>
        </div>
        <div className="space">
          <b>Name:</b>
          <br></br>
          {userInfo.name}
        </div>
        <div className="space">
          <b>Age:</b>
          <br></br>
          {userInfo.age}
        </div>
        <div className="space">
          <b>Email:</b>
          <br></br>
          {userInfo.email}
        </div>
      </div>
      <div id="Form">
        <h3>Update Information</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="Name"
            control={control}
            render={({ field }) =>
              <div className="name-container">
                <TextField defaultValue={user.data && user.data.name} className="name-input" id="outlined-basic" label="Name" variant="outlined"
                  {...register("name", {
                    required: true
                  })} />
              </div>
            }
          />
          <Controller
            name="Age"
            control={control}
            render={({ field }) =>
              <TextField defaultValue={user.data && user.data.age} className="age-input" id="outlined-basic" label="Age" variant="outlined"
                {...register("age")} />}
          />
          <br></br>
          <br></br>

          <Button variant="outlined" type="submit">Submit</Button>
        </form>
      </div>
    </div>
      <div>
        <passage-profile app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-profile>
      </div>
      </div>
  );
};

export default Profile;
