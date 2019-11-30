import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { COLORS } from "../../../styles/colors";

const win = Dimensions.get('window');

export default class Popup extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.props.close}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={this.props.close} style={styles.closeBtn}><View style={styles.close}><Text style={styles.x}>&times;</Text></View></TouchableOpacity>
            {this.props.children}
          </View>
        </Modal>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  modal: {
    flex: 0,
    backgroundColor: COLORS.white,
    width: win.width/1.3,
    maxHeight: 450,
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  close: {
    marginTop: -16,
    width: 32,
    height: 32,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    alignSelf: 'center',    
  },
  closeBtn: {
    position: "relative",
    zIndex: 10
  },
  x: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white
  }
});