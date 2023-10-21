import { Text, View, TextInput, Alert } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";
import userContext from "../userContext";
import { useContext } from "react";
import './WriteBook.css';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';

const WriteBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useContext(userContext);

  const onSubmit = async (data) => {
    await ReadingApi.saveUserText(user, data);
    navigate("/");
  };

  return (
    <div id="Main">
      <div id="Form">
        <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            // render={({ field }) =>
            // <TextField id="outlined-basic" label="Title" variant="outlined"
            // {...register("Title")} />}

            render={({ field }) =>
              <TextField id="outlined-basic" label="Title" variant="outlined"
                {...register("title")} />}
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) =>
              <TextField
              className="text-input"
                id="outlined-textarea"
                multiline
                label="Book Content"
                // {...register("Book")}
                {...register("text")}
              />}
          />
          <Button variant="outlined" type="submit">Submit</Button>
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
};

export default WriteBook;