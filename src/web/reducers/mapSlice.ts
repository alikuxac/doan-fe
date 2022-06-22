import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        latCenter: 0,  // default lat
        lngCenter: 0,  // default lng
        lat: 0, // current lat
        lng: 0, // current lng
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

export const { setCenter, setCurrent } = mapSlice.actions;

export const selectCenter = (state: RootState) => {
    return {
        latCenter: state.map.latCenter,
        lngCenter: state.map.lngCenter
    }
};

export const selectCurrent = (state: RootState) => {
    return {
        lat: state.map.lat,
        lng: state.map.lng
    }
};

export default mapSlice.reducer;