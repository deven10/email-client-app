import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allEmails: [],
  loading: false,
  error: null,
};

const url = `https://flipkart-email-mock.now.sh/`;

// fetch all emails
export const fetchAllEmails = createAsyncThunk(
  "emails/fetchAllEmails",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      // console.log("all emails result: ", result);

      if (result.status === 200) {
        return result.data.list;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const allEmailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmails = action.payload;
        state.error = null;
      })
      .addCase(fetchAllEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allEmails = [];
      });
  },
});

export default allEmailsSlice.reducer;
