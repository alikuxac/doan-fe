import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";
import { useJwtHook } from "../../hooks/useJwtHook";
import { Favorite } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  setCurrent as SetCurrent,
  selectCurrent,
} from "../../reducers/mapSlice";

export interface FavoriteInterface {
  name: string;
  lat: number;
  lng: number;
  address: string;
  createAt: number;
}

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 60px)",
};

const initCenter = {
  lat: 10.8458083,
  lng: 106.7945438,
};

function MyMap() {
  const dispatch = useAppDispatch();

  const { lat, lng } = useAppSelector(selectCurrent);
  const currentPosition = {
    lat,
    lng
  }

  console.log("Current: ", lat, lng);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDyJoOIqGwx-cdSvp37X0KMRcyBA8SG3Ko",
    libraries: ["geometry", "places"],
  });

  const [map, setMap] = React.useState<google.maps.Map | undefined>(undefined);

  const [defaultPosition, setDefaultPosition] = React.useState(initCenter);
  const [center, setCenter] = React.useState(initCenter);
  const [current, setCurrent] = React.useState(currentPosition);

  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(undefined);
  }, []);

  const getCurrentGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log(latitude, longitude);
        localStorage.setItem("lat", latitude.toString());
        localStorage.setItem("lng", longitude.toString());
        setDefaultPosition({ lat: latitude, lng: longitude });
        dispatch(SetCurrent({ lat: latitude, lng: longitude }));
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const setCurrentCenter = () => {
    if (currentPosition !== defaultPosition) {
      setCenter({ lat: +lat, lng: +lng });
    } else {
      setCenter(defaultPosition);
    }
  };

  useEffect(() => {
    // get current geolocation
    getCurrentGeoLocation();
    setCurrentCenter();
  }, [navigator, setCenter]);

  // Favorite
  const [favoriteList, setFavoriteList] = React.useState<FavoriteInterface[]>(
    []
  );

  const getFavorite = async () => {
    const UserData = useJwtHook.getUserStorage();
    const FavoriteStorage = useJwtHook.getUserFavorite();
    if (FavoriteStorage) {
      setFavoriteList(JSON.parse(FavoriteStorage));
    } else {
      useJwtHook.getFavorite(UserData?.id).then((res) => {
        setFavoriteList(res.data.favorites);
        useJwtHook.setUserFavorite(res.data.favorites);
      });
    }
  };

  useEffect(() => {
    getFavorite();
  }, [setFavoriteList]);

  const FavoriteMarkers = favoriteList.map((favorite, index) => {
    return (
      <Marker
        position={{ lat: favorite.lat, lng: favorite.lng }}
        label={favorite.name}
        key={index}
      ></Marker>
    );
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Circle
        center={center}
        options={{
          strokeColor: "blue",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "blue",
          fillOpacity: 0.5,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          zIndex: 2,
        }}
        radius={75}
      />
      {FavoriteMarkers}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
