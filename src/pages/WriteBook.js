import { Text, View, TextInput, Button, Alert } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import ReadingApi from "../API";
import userContext from "../userContext";
import { useContext } from "react";


const WriteBook = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()
  const { user } = useContext(userContext);

  const onSubmit = async (data) => {
    await ReadingApi.saveUserText(user, data)
    console.log(user)

  }
    return (
      <div id="Main">
        <div id="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => 
                    <TextField id="outlined-basic" label="title" variant="outlined" 
                    {...register("title")} />}
                />
                <Controller
                    name="text"
                    control={control}
                    render={({ field }) => 
                        <TextField 
                        id="outlined-textarea"
                        multiline
                        label="Book Content"
                        {...register("text")} 
                        />}
                />
                <input type="submit" />
                </form>
        </div>
      </div>
    )
  }

export default WriteBook;