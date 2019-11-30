import React from 'react'
import { View, StyleSheet } from 'react-native'
import { } from 'native-base'

import { COLORS } from '../../../styles/colors'

const ProgressBar = ({ value, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.progress, {width: `${parseFloat(value, 10) * 100}%` }]} />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgb(234,234,234)",
    height: 10,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    borderRadius: 10,
    backgroundColor: COLORS.primary
  }
});

export default ProgressBar;