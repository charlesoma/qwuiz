// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd517420f065967ea6f586d
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { Popup } from "../../../components/common"

const win = Dimensions.get('window');

export default class Earnings extends Component {
    static navigationOptions = {
        headerTitle: "Earnings",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.imageDiv}>
                    <Image
                        source={require('../../../assets/user.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textDiv}>
                    <Text style={styles.name}>
                        Atenaga Collins
                    </Text>
                    <Text style={styles.totalText}>
                        Total Cash
                    </Text>
                    <Text style={styles.total}>
                        $5,000
                    </Text>
                </View>
                <View style={styles.btnDiv}>
                    <Button style={styles.btn1} light>
                        <Text style={styles.btnText}>Cash out</Text>
                    </Button>
                    <Button style={styles.btn2} light>
                        <Text style={styles.btnText}>Top up</Text>
                    </Button>
                    <Button style={styles.btn3} light>
                        <Text style={styles.btnText}>Donate</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    imageDiv: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 12
    },
    textDiv: {
        marginTop: 20
    },
    name: {
        textAlign: "center",
        fontSize: 24
    },
    totalText: {
        textAlign: "center",
        color: COLORS.textYellow,
        marginTop: 25,
        fontSize: 18
    },
    total: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 34
    },
    btnDiv: {
        marginBottom: 100,
        marginTop: 10
    },
    btn1: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btn2: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btn3: {
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    }
});

