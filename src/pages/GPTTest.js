import { Text, View, TextInput, Button, Alert } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'

const GPTTest = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    //data = JSON.stringify(data)
    console.log(data)
    example(data["Query"])
  }

  async function example(query) {
    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: process.env.REACT_APP_PASSAGE_APP_ID,
      apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
    })
    console.log(query)
    const prompt = 'Give me a definition of the word ' + query + ' that an 14 year old would understand'
    const res = await api.sendMessage(prompt)
    console.log(res.text)
  }

    return (
      <div id="Main">
        <div id="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="Query"
                    control={control}
                    render={({ field }) =>
                        <TextField
                        id="outlined-textarea"
                        multiline
                        label="Query GPT"
                        {...register("Query")}
                        />}
                />
                <input type="submit" />
                </form>
        </div>
      </div>
    )
  }

export default GPTTest;