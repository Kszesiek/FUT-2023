import {Image, Linking, TouchableOpacity, View, Dimensions} from "react-native";
import {Location} from "../constants/locations";
import {useState} from "react";

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
  const maxWidth = Math.min(Dimensions.get('window').width * 0.5, 866);
  const [didMapLoad, setDidMapLoad] = useState<boolean>(false);

  return <View style={{backgroundColor: didMapLoad ? 'gray' : 'white'}}>
    <TouchableOpacity
      onPress={() => {
        const url = !!location.googleMapsLink ? location.googleMapsLink : `https://maps.google.com/?q=${location.x},${location.y}`
        Linking.openURL(url);
      }}
      activeOpacity={0.75}
      style={{
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!didMapLoad && <Image source={require("../assets/google-maps.png")} style={{position: 'absolute', maxWidth: maxWidth, aspectRatio: 1, resizeMode: 'contain'}}/>}
      <Image source={{uri: address}} style={{width: "150%", height: "150%",}} resizeMode="contain" onLoadEnd={() => {setDidMapLoad(true)}}/>
    </TouchableOpacity>
  </View>
}