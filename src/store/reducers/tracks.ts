import { getServerUrl, headers } from "@/helpers/common";
import { IComment, ITrack, TrackState } from "@/types/tracks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";
import { extraReducers } from ".";
import { AppThunk } from "..";

const initialState: TrackState = {
  tracks: [],
  error: null,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    addTrack: (state, action) => {
      state.tracks.push(action.payload);
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    extraReducers(builder, "tracks");

    builder.addCase(addComment.rejected, (state: TrackState, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(addTrack.rejected, (state: TrackState, action) => {
      state.error = action.payload as string;
    });
  },
});

export const fetchTracks = (): AppThunk => async (dispatch) => {
  try {
    const tasks = await ky
      .get(getServerUrl("tracks/all"), {
        headers,
      })
      .json();
    dispatch(tracksSlice.actions.setTracks(tasks));
  } catch (error: any) {
    dispatch(tracksSlice.actions.setError(error.message));
  }
};

export const addTrack = createAsyncThunk(
  "tracks/addTrack",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await ky
        .post(getServerUrl("tracks"), {
          headers,
          body: formData,
        })
        .json<ITrack>();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getTrack = async (id: string) => {
  return await ky.get(getServerUrl("tracks/" + id), { headers }).json<ITrack>();
};

export const addComment = createAsyncThunk<
  IComment,
  { trackId: number; text: string }
>("tracks/addComment", async (data, { rejectWithValue }) => {
  try {
    return await ky
      .post(getServerUrl("comments"), { headers, json: data })
      .json<IComment>();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(error);
  }
});

export default tracksSlice.reducer;
