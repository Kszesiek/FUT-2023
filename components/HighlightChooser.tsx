import {StyleProp, StyleSheet, ViewStyle, Text, TouchableOpacityProps, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import {colors} from "../constants/colors";

type dataItem = {
  label: string,
  key: string | number,
}

type propsType<TDataItem, TDataKey> = {
  data: TDataItem[]
  onPress?: (chosenKey: TDataKey) => void
  style?: ViewStyle
  touchableOpacityProps?: TouchableOpacityProps
  defaultOption?: TDataKey
}

export default function HighlightChooser<TDataItem extends dataItem, TDataKey extends TDataItem['key']>({data, onPress, style, defaultOption, touchableOpacityProps}: propsType<TDataItem, TDataKey>) {
  const [chosenKey, setChosenKey] = useState(defaultOption || data[0].key);

  function onCardPressed(cardKey: TDataKey) {
    setChosenKey(cardKey);
    onPress && onPress(cardKey);
  }

  const chosenCardStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.accent_light,
    elevation: 12,
  }

  return <View style={{...styles.container, backgroundColor: 'white', ...style}}>
    {data.map((item: TDataItem) => {
      return <TouchableOpacity
        key={typeof item.key !== 'string' ? `${item.key}` : item.key}
        style={[styles.card, item.key === chosenKey && chosenCardStyle]}
        onPress={() => onCardPressed(item.key as TDataKey)}
        {...touchableOpacityProps}
      >
        <Text style={[styles.text, {color: chosenKey === item.key ? 'white' : 'white'}]}>{item.label}</Text>
      </TouchableOpacity>
    })}
  </View>
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    flexDirection: 'row',
    elevation: 4,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
})
