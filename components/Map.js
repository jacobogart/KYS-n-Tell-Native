import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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
      {markers}
    </MapView>
  )
}