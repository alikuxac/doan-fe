import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        lat: 0, // localStorage.getItem('lat'),
        lng: 0 // localStorage.getItem('lng')
    },
    reducers: {
        setCurrent: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
});

export const { setCurrent } = mapSlice.actions;

export const selectCurrent = (state: RootState) => {
    return {
        lat: state.map.lat,
        lng: state.map.lng
    }
};

export default mapSlice.reducer;