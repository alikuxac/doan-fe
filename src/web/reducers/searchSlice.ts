import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const searchSlice = createSlice({
    name: "search",
    initialState: {
        search: {
            enabled: false, // default search disabled
            lat: 0, // default search marker lat
            lng: 0 // default search marker lng
        }
    },
    reducers: {
        setSearch: (state, action) => {
            state.search.enabled = action.payload.enabled;
            state.search.lat = action.payload.lat;
            state.search.lng = action.payload.lng;
        },
        setSearchEnabled: (state, action) => {
            state.search.enabled = action.payload.enabled;
        },
        setSearchDirection: (state, action) => {
            state.search.lat = action.payload.lat;
            state.search.lng = action.payload.lng;
        }
    }
});

export const { setSearch, setSearchDirection, setSearchEnabled } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search.search;

export const selectSearchDirection = (state: RootState) => {
    return {
        lat: state.search.search.lat,
        lng: state.search.search.lng
    }
};

export const selectSearchEnabled = (state: RootState) => state.search.search.enabled;

export default searchSlice.reducer;