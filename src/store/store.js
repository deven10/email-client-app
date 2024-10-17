import { configureStore } from "@reduxjs/toolkit";
import { allEmailsSlice } from "./features/allEmailsSlice";
import { emailSlice } from "./features/emailSlice";

export default configureStore({
  reducer: {
    allEmails: allEmailsSlice.reducer,
    email: emailSlice.reducer,
  },
});
