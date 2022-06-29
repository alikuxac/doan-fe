import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        firstLoad: true,
        lat: 0, // default lat
        lng: 0, // default lng
        address: '' // default address
    },
    reducers: {
        setCurrent: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
        setAddress: (state, action) => {
            state.address = action.payload.address;
        },
        setFirstLoad: (state, action) => {
            state.firstLoad = action.payload.firstLoad;
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
});

export const { setCurrent, setAddress, setFirstLoad } = mapSlice.actions;

export const selectCurrent = (state: RootState) => {
    return {
        latCurrent: state.map.lat,
        lngCurrent: state.map.lng
    }
};

export const selectFirstLoad = (state: RootState) => state.map.firstLoad;

export const selectAddress = (state: RootState) => state.map.address

export default mapSlice.reducer;