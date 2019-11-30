// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd47ea47c3b7f68567c5b48
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Platform } from "react-native";
import { Button, Icon } from 'native-base';
import { COLORS } from "../../../styles/colors";

const win = Dimensions.get('window');

export default class CreateCampaignSuccess extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.topText}>You did it!</Text>
            <View style={styles.checkmarkDiv}>
              <Icon style={styles.checkmark} name="checkmark" />
            </View>
            <Text style={styles.successText}>
              Campaign Successfully Created!
            </Text>
            <Button
              onPress={() =>
                this.props.navigation.navigate("home")
              }
              style={styles.btn}
              light
            >
              <Text style={styles.btnText}>Continue</Text>
            </Button>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    topText: {
        marginTop: 100,
        color: COLORS.textNormal
    },
    checkmarkDiv: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: COLORS.textGreen,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    checkmark: {
        color: COLORS.textGreen,
        fontSize: Platform.OS === 'ios' ? 80 : 50,
    },
    successText: {
        fontSize: 18,
        marginTop: 40,
        color: COLORS.text
    },
    btn: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        width: win.width / 1.4,
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'center'
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    },
});

