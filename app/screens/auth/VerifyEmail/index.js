// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30b67a3395903b48f7e41
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button } from 'native-base';
import OtpInputs from 'react-native-otp-inputs'
import { COLORS } from "../../../styles/colors";

const win = Dimensions.get('window');

export default class VerifyEmail extends Component {
  static navigationOptions = {
    headerTitle: "Verify Email",
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      color: COLORS.white,
    },
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
  };

  render() {
    return (
      <View style={styles.content}>
        <View style={[styles.triangle, styles.arrowDown]} />
        <View style={styles.main}>
          <Text style={styles.topText}>
            Please type the verification code{"\n"}we just sent to you via
            Email
          </Text>
          <OtpInputs
            handleChange={code => console.log(code)}
            numberOfInputs={4}
            inputContainerStyles={styles.inputContainerStyles}
            containerStyles={styles.containerStyles}
            focusedBorderColor={COLORS.black}
            unfocusedBorderColor={COLORS.black}
          />
          <View style={styles.expire}>
            <Text style={styles.expireText}>Code Expires in: 00:43</Text>
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("loginWithEmail")}
              style={styles.btn}
              light
            >
              <Text style={styles.btnText}>Verify</Text>
            </Button>
          </View>
          <View style={styles.resend}>
            <TouchableOpacity>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center'

  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: COLORS.transparent,
    borderStyle: 'solid',
    elevation: 1000,
    position: 'absolute',
    top: 0
  },
  arrowDown: {
    borderTopWidth: 15,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: COLORS.tertiary,
    borderRightColor: COLORS.transparent,
    borderBottomColor: COLORS.transparent,
    borderLeftColor: COLORS.transparent,
  },
  main: {
    paddingTop: 70,
    width: win.width/1.5
  },
  topText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22
  },
  inputContainerStyles: {
    backgroundColor: COLORS.white, 
    width: 50, 
    borderBottomColor: COLORS.black, 
    borderTopColor: COLORS.black, 
    borderTopWidth: 1.5, 
    borderLeftWidth: 1.5, 
    borderLeftColor: COLORS.black,
    borderRightWidth: 1.5, 
    borderRightColor: COLORS.black, 
    paddingLeft: 3,
    marginRight: 5
  },
  containerStyles: {
    paddingTop: 70, 
    marginLeft: -12
  },
  expire: {
    marginTop: 70,
    marginBottom: 5
  },
  expireText: {
    textAlign: 'center'
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 30
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    width: win.width/1.5,
    textAlign: 'center'
  },
  resend: {
    marginTop: 40
  },
  resendText: {
    textAlign: 'center'
  }
});

