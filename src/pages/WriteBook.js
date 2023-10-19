import { Text, View, TextInput, Button, Alert } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

const WriteBook = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data = JSON.stringify(data)
    console.log(data)
  }
  //console.log(watch("Book")) // watch input value by passing the name of it

    return (
      <div id="Main">
        <div id="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="Title"
                    control={control}
                    render={({ field }) => 
                    <TextField id="outlined-basic" label="Title" variant="outlined" 
                    {...register("Title")} />}
                />
                <Controller
                    name="Book"
                    control={control}
                    render={({ field }) => 
                        <TextField 
                        id="outlined-textarea"
                        multiline
                        label="Book Content"
                        {...register("Book")} 
                        />}
                />
                <input type="submit" />
                </form>
        </div>
      </div>
    )
  }

export default WriteBook;