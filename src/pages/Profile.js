import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import userContext from "../userContext";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";

const Profile = () => {
  const { user } = useContext(userContext);

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
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div id="Profile">
      <div id="Form">
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
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Profile
