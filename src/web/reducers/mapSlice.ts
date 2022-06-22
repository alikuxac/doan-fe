import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        latCenter: localStorage.getItem('lat'),  // default lat
        lngCenter: localStorage.getItem('lng'),  // default lng
        lat: null, // current lat
        lng: null, // current lng
    },
    reducers: {
        setCenter: (state, action) => {
            state.latCenter = action.payload.latCenter;
            state.lngCenter = action.payload.lngCenter;
        },
        setCurrent: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
});

export const { setCenter } = mapSlice.actions;

export const selectCenter = (state: RootState) => {
    return {
        lat: state.map.latCenter,
        lng: state.map.lngCenter
    }
};

export const selectCurrent = (state: RootState) => {
    return {
        lat: state.map.lat,
        lng: state.map.lng
    }
};

export default mapSlice.reducer;