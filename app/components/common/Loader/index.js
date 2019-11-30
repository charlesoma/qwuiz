import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Spinner } from 'native-base';

import { COLORS } from '../../../styles/colors'

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.loaderContainer}>
                <Spinner color={COLORS.textDark} />
            </View>
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: COLORS.shadowColor,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        elevation: 5
    },
    loaderContainer: {
        height: 80,
        width: 80,
        backgroundColor: COLORS.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    }
})