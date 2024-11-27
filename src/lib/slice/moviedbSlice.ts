import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiMDB, http } from '../../utils/http'
import { AxiosError } from 'axios';
import { MovieModels } from '@/models/modelsMovie';




// State awal untuk packets
interface MovieState {
  stateMovie: MovieModels[];
  packetsRes: string | null;
  statePacketId: any
  stateTogle:boolean;
  stateBookmark:MovieModels[],
  stateDataPick: MovieModels
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string,
}

interface ErrorResponse {
  msg: string;
}

const initialState: MovieState = {
  stateMovie: [],
  stateDataPick: {} as MovieModels,
  packetsRes: null,
  stateTogle: false,
  statePacketId: null,
  stateBookmark: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};



// Action async untuk getPacket
export const addPacket = createAsyncThunk('packets/addPacket', async (packet: any) => {
  const response = await http.post('/v1/packet/addPacket', packet);
  return response.data;
});

// Action async untuk getMovie
export const getDataMovieDB = createAsyncThunk <MovieModels[],void,{ rejectValue: string }> ('movie/getMovie',  async (_, thunkAPI) => {

  try {
    const response = await apiMDB.get('/');
    return response.data;
  } catch (error) {
      
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response && axiosError.response.data) {
        const message = axiosError.response.data.msg; 
        return thunkAPI.rejectWithValue(message); 
      }

      // Jika error tidak sesuai dengan tipe yang diharapkan
      return thunkAPI.rejectWithValue('An unexpected error occurred');
  }

});






// Slice packets
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

    setStateMovieData(state, action: PayloadAction<any[]>) {
      state.stateMovie = action.payload;
      console.log("data movie in redux  :", state.stateMovie);
    },

    setGetPacketById(state, action) {
      state.statePacketId = action.payload

    },


    getBookmark(state) {
      // Ambil bookmark IDs dari localStorage
      const bookmarkIds = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
      // Filter data movie berdasarkan bookmarkIds
      const bookmarkedMovies = state.stateMovie.filter((movie) => 
        bookmarkIds.includes(movie._id)
      );
      // Set stateBookmark dengan movie yang cocok
      state.stateBookmark = bookmarkedMovies;
      console.log("create bookmark in redux  :", state.stateBookmark);
    },
    

    setPickDataView(state, action) {
      console.log("dataPick to in redux  :", action.payload);
    
      // Perbaiki filter dengan kurung yang benar
      const dataView = state.stateMovie.filter((movie) => movie._id === action.payload);
      
      // Jika ditemukan data, update state
      if (dataView.length > 0) {
        state.stateDataPick = dataView[0]; // Menyimpan data objek pertama
        console.log("create dataPick in redux  :", state.stateDataPick);
      } else {
        console.log("Data not found for _id:", action.payload);
        // Menangani kasus jika data tidak ditemukan
      }
    },
    


    toggleDarkMode: (state) => {
      // Toggle nilai stateTogle antara true dan false
      state.stateTogle = !state.stateTogle;
    },

    setDarkMode: (state, action) => {
      state.stateTogle = action.payload; // action.payload bisa true atau false
    },
    
  },
  
  extraReducers: (builder) => {
    

    // All Packet

    builder
    .addCase(addPacket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.packetsRes = action.payload;
    })

    .addCase(getDataMovieDB.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(getDataMovieDB.fulfilled, (state, action) => {
      state.stateMovie = action.payload;
      state.isLoading = false;
    })

    .addCase(getDataMovieDB.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload ?? 'Failed to fetch packet';
    })

    //  Packet by Paramss 


  },
});

export const { getBookmark,setPickDataView,  toggleDarkMode, setDarkMode , setStateMovieData, setGetPacketById } = movieSlice.actions;

export default movieSlice.reducer;
