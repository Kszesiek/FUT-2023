import {Image, Linking, TouchableOpacity, View} from "react-native";
import {Location} from "../constants/locations";

const GOOGLE_API_KEY = 'AIzaSyDMq-TWPgd_jxqNCXAoND0Gq4rlr2RvvZI';

// function getMapPreview(x: string, y: string) {
//   const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${x},${y}&zoom=16&scale=2&size=600x600&maptype=roadmap&markers=color:red%7Clabel:S%7C${x},${y}&key=${GOOGLE_API_KEY}`;
//   return imagePreviewUrl;
// }

function getMapPreview(location: Location) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.x},${location.y}&zoom=16&scale=2&size=600x600&maptype=roadmap&markers=color:red%7Clabel:S%7C${location.x},${location.y}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export default function MapDisplay({location}: { location: Location }) {
  const address = getMapPreview(location);
  console.log(address);
  return <View style={{backgroundColor: 'gray'}}>
    <TouchableOpacity
      onPress={() => {
        const url = !!location.googleMapsLink ? location.googleMapsLink : `https://maps.google.com/?q=${location.x},${location.y}`
        Linking.openURL(url);
      }}
      activeOpacity={0.75}
      style={{
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image source={{uri: address}} style={{width: "150%", height: "150%",}} resizeMode="contain"/>
    </TouchableOpacity>
  </View>
}