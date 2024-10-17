import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  loading: false,
  error: null,
};

const url = `https://flipkart-email-mock.now.sh/?id=`;

// get single email details
export const fetchEmail = createAsyncThunk(
  "email/fetchEmail",
  async (args, { rejectWithValue }) => {
    try {
      console.log("args: ", args);
      const result = await axios.get(url + args, {
        "Content-Type": "application/json",
      });

      console.log("single email result: ", result);

      if (result.status === 200) {
        return result.data.body;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload;
      })
      .addCase(fetchEmail.rejected, (state, action) => {
        state.loading = false;
        state.email = "";
        state.error = action.payload;
      });
  },
});

export default emailSlice.reducer;
