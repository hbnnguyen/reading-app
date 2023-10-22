import { Text, View, TextInput, Button, Alert } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
// import { OpenAI } from "./src/openai/";
// import { OpenAIThing } from "../OpenAi";
import OpenAI from 'openai';
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';

const GPTTest = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //data = JSON.stringify(data)
    // console.log(data);
    example(data["Query"]);
  };

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true  // defaults to process.env["OPENAI_API_KEY"]
  });

  async function example(query) {
    // const api = new ChatGPTUnofficialProxyAPI({
    //   accessToken: process.env.REACT_APP_GPT_ACCESS_TOKEN,
    //   apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
    // });
    const prompt = 'Give me a definition of the word ' + query + ' that an 14 year old would understand';
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices[0].message.content);
    console.log(query);

    // const res = await openai.sendMessage(prompt);
    // console.log(res);

    // console.log(res.text);
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
  );
};

export default GPTTest;