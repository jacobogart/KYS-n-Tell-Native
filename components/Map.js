import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';

export const Map = (props) => {
  const  point = props.user.location;
  const markers = props.locations.map(location => 
    <Marker
      onPress={() => props.navigate('Location', { id: location.id })}
      key={location.id}
      coordinate={{
        latitude: +location.point.lat,
        longitude: +location.point.lng
      }}
    />)
  const userMarker = props.user.location.geo
    ? <Marker
        coordinate={{
          latitude: +props.user.location.lat,
          longitude: +props.user.location.lng
        }}
        pinColor={'blue'}
      />
    : null;
  
  return(
    <MapView
      style={{ flex: 1, width: '100%' }}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: +point.lat,
        longitude: +point.lng,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
    >
      {userMarker}
      {markers}
    </MapView>
  )
}