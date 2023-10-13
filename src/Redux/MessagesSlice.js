import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getAllMessages = createAsyncThunk(
  "messages/getAllMessages",
  async function () {
    let response = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      { headers: { token: localStorage.getItem("userToken") } }
    );
    return response.data.allMessages; // Extract only the necessary data
  }
);
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData) => {
   
      const response = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/message",
        messageData
      );
      return response.data.messaged; // Extract the necessary data
    
  }
);

let initialState = { messages: [], counter: 0 };
let messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log("Message sent successfully:", action.payload);
    });
    
  },
});

export let messageReducer = messageSlice.reducer;
export let { increase, decrease } = messageSlice.actions;
