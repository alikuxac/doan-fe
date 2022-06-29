import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const globalSlice = createSlice({
    name: "global",
    initialState: {
        map: {
            firstLoad: true,
            lat: 0, // default lat
            lng: 0, // default lng
            address: '' // default address}
        },
        search: {
            enabled: false, // default search disabled
            lat: 0, // default search marker lat
            lng: 0, // default search marker lng
            value: '', // default search address
            result: [] // default search result
        },
        directions: {
            enabled: false, // default directions disabled
            origin: {
                lat: 0, // default origin lat
                lng: 0, // default origin lng
                address: '', // default origin address
                value: '' // default origin value
            },
            destination: {
                lat: 0, // default destination lat
                lng: 0, // default destination 
                address: '', // default destination address
                value: '' // default destination value
            },
            mode: 'DRIVING', // default mode
        },
    },
    reducers: {
        // set current location
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
        },
        // set search
        setSearch: (state, action) => {
            state.search.enabled = action.payload.enabled;
            state.search.lat = action.payload.lat;
            state.search.lng = action.payload.lng;
            state.search.value = action.payload.value;
        },
        setSearchEnabled: (state, action) => {
            state.search.enabled = action.payload.enabled;
        },
        setSearchDirection: (state, action) => {
            state.search.lat = action.payload.lat;
            state.search.lng = action.payload.lng;
        },
        setSearchResult: (state, action) => {
            state.search.result = action.payload.result;
        },
        //set direction
        setDirections: (state, action) => {
            state.directions.enabled = action.payload.enabled;

            state.directions.origin.lat = action.payload.origin.lat;
            state.directions.origin.lng = action.payload.origin.lng;
            state.directions.origin.address = action.payload.origin.address;
            state.directions.origin.value = action.payload.origin.value;

            state.directions.destination.lat = action.payload.destination.lat;
            state.directions.destination.lng = action.payload.destination.lng;
            state.directions.destination.address = action.payload.destination.address;
            state.directions.destination.value = action.payload.destination.value;

            state.directions.mode = action.payload.mode;
        },
        setDirectionsOrigin: (state, action) => {
            state.directions.origin.lat = action.payload.lat;
            state.directions.origin.lng = action.payload.lng;
            state.directions.origin.address = action.payload.address;
        },
        setDirectionsDestination: (state, action) => {
            state.directions.destination.lat = action.payload.lat;
            state.directions.destination.lng = action.payload.lng;
            state.directions.destination.address = action.payload.address;
        },
        setDirectionsMode: (state, action) => {
            state.directions.mode = action.payload.mode;
        },
        setDirectionsEnabled: (state, action) => {
            state.directions.enabled = action.payload.enabled;
        },
        // reset all
        resetAll: (state) => {
            state.map.firstLoad = true;
            state.map.lat = 0;
            state.map.lng = 0;
            state.map.address = '';
            state.search.enabled = false;
            state.search.lat = 0;
            state.search.lng = 0;
            state.search.value = '';
            state.directions.enabled = false;
            state.directions.origin.lat = 0;
            state.directions.origin.lng = 0;
            state.directions.origin.address = '';
            state.directions.destination.lat = 0;
            state.directions.destination.lng = 0;
            state.directions.destination.address = '';
            state.directions.mode = 'DRIVING';
        }
    }
});

export const {
    setCurrent,
    setAddress,
    setFirstLoad,
    setSearch,
    setSearchDirection,
    setSearchEnabled,
    setDirections,
    setDirectionsDestination,
    setDirectionsEnabled,
    setDirectionsMode,
    setDirectionsOrigin,
    resetAll
} = globalSlice.actions;

// select current
export const selectCurrent = (state: RootState) => {
    return {
        latCurrent: state.global.map.lat,
        lngCurrent: state.global.map.lng
    }
};
export const selectFirstLoad = (state: RootState) => state.global.map.firstLoad;
export const selectAddress = (state: RootState) => state.global.map.address

// select search
export const selectSearch = (state: RootState) => {
    return {
        enabled: state.global.search.enabled,
        lat: state.global.search.lat,
        lng: state.global.search.lng,
        value: state.global.search.value
    }
};
export const selectSearchEnabled = (state: RootState) => state.global.search.enabled;
export const selectSearchDirection = (state: RootState) => {
    return {
        lat: state.global.search.lat,
        lng: state.global.search.lng
    }
};

// select direction
export const selectDirections = (state: RootState) => {
    return {
        enabled: state.global.directions.enabled,
        origin: {
            lat: state.global.directions.origin.lat,
            lng: state.global.directions.origin.lng,
            address: state.global.directions.origin.address
        },
        destination: {
            lat: state.global.directions.destination.lat,
            lng: state.global.directions.destination.lng,
            address: state.global.directions.destination.address
        },
        mode: state.global.directions.mode
    }
}
export const selectDirectionsEnabled = (state: RootState) => state.global.directions.enabled;
export const selectDirectionsOrigin = (state: RootState) => {
    return {
        lat: state.global.directions.origin.lat,
        lng: state.global.directions.origin.lng,
        address: state.global.directions.origin.address,
        value: state.global.directions.origin.value
    }
}
export const selectDirectionsDestination = (state: RootState) => {
    return {
        lat: state.global.directions.destination.lat,
        lng: state.global.directions.destination.lng,
        address: state.global.directions.destination.address,
        value: state.global.directions.destination.value
    }
}
export const selectDirectionsMode = (state: RootState) => state.global.directions.mode;

export default globalSlice.reducer;