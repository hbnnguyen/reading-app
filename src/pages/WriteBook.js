import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";
import userContext from "../userContext";
import { useContext } from "react";
import './WriteBook.css';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { Navigate } from "react-router-dom";

const WriteBook = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await ReadingApi.saveUserText(user, data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div id="Main">
      <h2>Add your own text</h2>
      <div id="Form">
        <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            fullWidth={true}
            render={({ field }) =>
              <div className="title-container">
                <TextField className="title-input" id="outlined-basic" label="Title" variant="outlined"
                  {...register("title")} />
              </div>
            }
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) =>
              <TextField
                className="text-input"
                id="outlined-textarea"
                multiline
                minRows={4}
                label="Content"
                {...register("text")}
              />}
          />
          <br></br>
          <br></br>
          <Button variant="outlined" type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default WriteBook;