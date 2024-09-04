import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
      id: null,
      avatar: null,
      username: null,
      token: null,
      language: null,
      name: null,
      types: null, 
      genres: null,
      providers: null,
      rating: null,
      releaseDateGte: null,
      members: null,
      mediaList: null,
      id: null,
      mediaListSelected: null,
  },
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addAvatarList: (state, action) => {
      state.value.avatar = action.payload;
      //console.log("addAvatarList reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addNameList: (state, action) => {
        state.value.name = action.payload;
        //console.log("addNameList reducer:", action.payload)
        //console.log("valeur du reducer list:", state.value)
    },
    addTypes: (state, action) => {
        state.value.types = action.payload;
        //console.log("addTypes reducer:", action.payload)
        //console.log("valeur du reducer list:", state.value)
      },
    addProviders: (state, action) =>{
      state.value.providers = action.payload;
      //console.log("addProvider reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addReleaseDateGte: (state, action) =>{
      state.value.releaseDateGte = action.payload;
      //console.log("addReleaseDateGte reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addRating:(state, action) =>{
      state.value.rating = action.payload;
      //console.log("addRating reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addGenres: (state, action) => {
      state.value.genres = action.payload;
      //console.log("addGenres reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addMediaList: (state, action) => {
      state.value.mediaList = action.payload;
      //console.log("addLists reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addIdList: (state, action) => {
      state.value.id = action.payload;
      //console.log("addIdList reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
    addMediaListSelected: (state, action) => {
      state.value.mediaListSelected = action.payload;
      //console.log("addMediaListSelected reducer:", action.payload)
      //console.log("valeur du reducer list:", state.value)
    },
  }
});

export const { 
    addTypes,
    addAvatarList, 
    addNameList, 
    addProviders, 
    addReleaseDateGte,
    addGenres, 
    addRating, 
    addMediaList,
    addIdList,
    addMediaListSelected,
} = listSlice.actions;
export default listSlice.reducer;
