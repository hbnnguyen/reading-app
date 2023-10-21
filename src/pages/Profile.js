import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import userContext from "../userContext";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";
import { Button } from '@mui/material/';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: ""
  });

  useEffect(function getUserInfo() {
    if (user) {
      setUserInfo({
        name: user.name,
        age: user.age,
        email: user.email
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
    await ReadingApi.editUser(user, data);
    window.location.reload();
  };

  return (
    <div id="Main">
      <div className="user-profile">
        name: {userInfo.name}
        <br></br>
        age: {userInfo.age}
        <br></br>
        email: {userInfo.email}
      </div>
      <div id="Form">
        <h3>Update User Information</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="Name"
            control={control}
            render={({ field }) =>
              <TextField id="outlined-basic" label="Name" variant="outlined"
                {...register("name", {
                  required: true
                })} />}
          />

          <Controller
            name="Age"
            control={control}
            render={({ field }) =>
              <TextField id="outlined-basic" label="Age" variant="outlined"
                {...register("age")} />}
          />
          <Button variant="outlined" type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
