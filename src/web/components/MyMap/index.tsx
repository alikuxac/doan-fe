import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useJwtHook } from "../../hooks/useJwtHook";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  setCurrent as SetCurrent,
  selectCurrent,
  setFirstLoad,
  selectFirstLoad,
  selectSearch,
  selectDirections,
} from "../../reducers/globalSlice";

export interface FavoriteInterface {
  name: string;
  lat: number;
  lng: number;
  address: string;
  createAt: number;
}

export interface SearchInterface {
  name: string;
  address: string;
  rating: number;
}

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 60px)",
};

const initCenter = {
  lat: 10.8458083,
  lng: 106.7945438,
};

const SearchMarker: React.FC<google.maps.MarkerOptions> = (options) => {
  // Marker
  const [searchMarker, setSearchMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!searchMarker) {
      setSearchMarker(
        new google.maps.Marker({ position: options.position, map: options.map })
      );
    }
    // remove marker from map on unmount
    return () => {
      if (searchMarker) {
        searchMarker.setMap(null);
      }
    };
  }, [searchMarker]);

  return null;
};

function MyMap() {
  const dispatch = useAppDispatch();

  // Redux store
  const { latCurrent, lngCurrent } = useAppSelector(selectCurrent);
  const {
    enabled: searchEnabled,
    lat: searchLat,
    lng: searchLng,
    value: searchValue,
  } = useAppSelector(selectSearch);
  const {
    destination,
    origin,
    enabled: directionEnabled,
    mode,
  } = useAppSelector(selectDirections);
  const firstLoadBool = useAppSelector(selectFirstLoad);

  const currentPosition = {
    lat: latCurrent,
    lng: latCurrent,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDyJoOIqGwx-cdSvp37X0KMRcyBA8SG3Ko",
    libraries: ["places"],
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

  // Search Marker

  // Get current location
  const getCurrentGeoLocation = () => {
    if (!firstLoadBool) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);
          setCurrent({ lat: latitude, lng: longitude });
          dispatch(
            setFirstLoad({ firstLoad: false, lat: latitude, lng: longitude })
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };

  const setCurrentCenter = () => {
    setCenter({ lat: +latCurrent, lng: +lngCurrent });
  };

  useEffect(() => {
    getCurrentGeoLocation();
  }, [navigator, setDefaultPosition, firstLoadBool]);

  useEffect(() => {
    if (!firstLoadBool) {
      setCenter({ lat: +latCurrent, lng: +lngCurrent });
    } else {
      setCenter(defaultPosition);
    }
  }, [latCurrent, lngCurrent]);

  useEffect(() => {
    if (map !== undefined) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    }
  }, [center]);

  // Favorite
  const [favoriteList, setFavoriteList] = React.useState<FavoriteInterface[]>(
    []
  );

  const getFavorite = async () => {
    const UserData = useJwtHook.getUserStorage();
    setFavoriteList(UserData.favorites);
  };

  useEffect(() => {
    getFavorite();
  }, [setFavoriteList]);

  const FavoriteMarkers = favoriteList.map((favorite, index) => {
    return (
      <Marker
        position={{ lat: favorite.lat, lng: favorite.lng }}
        label={index + ""}
        key={index}
        onClick={(e) => {
          const lat = e.latLng?.lat();
          const lng = e.latLng?.lng();
          const info = favoriteList.find((value) => {
            return value.lat === lat && value.lng === lng;
          });
          if (!info) {
            return;
          } else {
            return (
              <InfoWindow position={{ lat: info.lat, lng: info.lng }}>
                <div>
                  <h3>{info?.name}</h3>
                  <p>{info?.address}</p>
                </div>
              </InfoWindow>
            );
          }
        }}
      ></Marker>
    );
  });

  // Directions
  const [directionResponse, setDirectionResponse] =
    React.useState<google.maps.DistanceMatrixResponse | null>(null);

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin: origin.value,
        destination: destination.value,
        travelMode: mode,
      };
    }, [origin, destination]);

  const directionsCallback = React.useCallback((res: any) => {
    if (res !== null) {
      setDirectionResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: setDirectionResponse,
    };
  }, [setDirectionResponse]);

  // Search marker

  const [searchValueData, setSearchValueData] = React.useState<SearchInterface | null>(null);
  useEffect(() => {
    if (searchValue) {
      setSearchValueData(JSON.parse(searchValue));
    }
    
  }, [searchValue]);
  const [searchInfo, setSearchInfo] = React.useState(false);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Circle
        center={defaultPosition}
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
      <Marker
        key="defaultCenter"
        position={defaultPosition}
        onUnmount={(marker) => {
          marker.setMap(null);
        }}
      ></Marker>
      {favoriteList.length > 0 ? FavoriteMarkers : <></>}
      {searchEnabled ? (
        <Marker
          position={{ lat: searchLat, lng: searchLng }}
          icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          onClick={() => setSearchInfo(true)}
        >
          {searchInfo ? (<InfoWindow onCloseClick={() => setSearchInfo(false)}>
            <div>
              <h3>Tên: {searchValueData?.name}</h3>
              <p>Địa chỉ: {searchValueData?.address}</p>
              <p>Toạ độ: {searchLat},{searchLng}</p>
              <p>Đánh giá: {searchValueData?.rating}</p>
            </div>
          </InfoWindow>) : <></>}
          
        </Marker>
      ) : (
        <></>
      )}
      {directionEnabled && origin && destination && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      )}

      {directionResponse && directionsRendererOptions && (
        <DirectionsRenderer options={directionsRendererOptions} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
