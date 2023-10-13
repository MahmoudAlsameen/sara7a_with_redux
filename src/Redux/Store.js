import { configureStore } from "@reduxjs/toolkit";
import { messageReducer } from "./MessagesSlice";

let store = configureStore({
  reducer: {
    allMessages: messageReducer,
  },
});

export default store;
