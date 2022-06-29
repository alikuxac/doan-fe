import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const directionSlice = createSlice({
    name: "directions",
    initialState: {
        enabled: false, // default directions disabled
        origin: {
            lat: 0, // default origin lat
            lng: 0 // default origin lng
        },
        destination: {
            lat: 0, // default destination lat
            lng: 0 // default destination lng
        }
    },
    reducers: {
        setDirections: (state, action) => {
            state.enabled = action.payload.enabled;
            state.origin.lat = action.payload.origin.lat;
            state.origin.lng = action.payload.origin.lng;
            state.destination.lat = action.payload.destination.lat;
            state.destination.lng = action.payload.destination.lng;
        },
        setDirectionsOrigin: (state, action) => {
            state.origin.lat = action.payload.lat;
            state.origin.lng = action.payload.lng;
        },
        setDirectionsDestination: (state, action) => {
            state.destination.lat = action.payload.lat;
            state.destination.lng = action.payload.lng;
        },
        setDirectionsEnabled: (state, action) => {
            state.enabled = action.payload.enabled;
        },
    }
});

export const selectDirections = (state: RootState) => {
    return {
        enabled: state.directions.enabled,
        origin: {
            lat: state.directions.origin.lat,
            lng: state.directions.origin.lng
        },
        destination: {
            lat: state.directions.destination.lat,
            lng: state.directions.destination.lng
        }
    }
}

export const { setDirections, setDirectionsDestination, setDirectionsEnabled, setDirectionsOrigin } = directionSlice.actions;

// Select Original State
export const selectOrigin = (state: RootState) => {
    return {
        lat: state.directions.origin.lat,
        lng: state.directions.origin.lng
    }
}

// Select Destination State
export const selectDestination = (state: RootState) => {
    return {
        lat: state.directions.destination.lat,
        lng: state.directions.destination.lng
    }
}

export default directionSlice.reducer;