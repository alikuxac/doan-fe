import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const mapSlice = createSlice({
    name: "map",
    initialState: {
        lat: 0, // default lat
        lng: 0, // default lng
        address: '' // default address
    },
    reducers: {
        setCurrent: (state, action) => {
            state.current.lat = action.payload.lat;
            state.current.lng = action.payload.lng;
        },
        setAddress: (state, action) => {
            state.current.address = action.payload.address;
        },
    }
});

export const { setCurrent, setAddress } = mapSlice.actions;

export const selectCurrent = (state: RootState) => {
    return {
        latCurrent: state.map.lat,
        lngCurrent: state.map.lng
    }
};

export const selectAddress = (state: RootState) => state.map.address

export default mapSlice.reducer;