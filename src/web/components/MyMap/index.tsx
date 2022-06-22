import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";
import { useJwtHook } from "../../hooks/useJwtHook";
import { Favorite } from "@mui/icons-material";

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
  lat: -3.745,
  lng: -38.523,
};

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDyJoOIqGwx-cdSvp37X0KMRcyBA8SG3Ko",
    libraries: ['geometry', 'places']
  });

  const [map, setMap] = React.useState(null);

  const [center, setCenter] = React.useState(initCenter);

  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const getCurrentGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem('lat', latitude.toString());
        localStorage.setItem('lng', longitude.toString());
        setCenter({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error(err);
      }
    );
  };

  console.log(center);

  useEffect(() => {
    // get current geolocation
    getCurrentGeoLocation();
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

  const FavoriteMarkers = favoriteList.map((favorite) => {
    return (
      <Marker
        position={{ lat: favorite.lat, lng: favorite.lng }}
        label={favorite.name}
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
