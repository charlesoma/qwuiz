// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30cf9e97c99679078a3b6
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Button } from "native-base";
import { COLORS } from "../../../styles/colors";
import { Popup } from "../../../components/common";

const win = Dimensions.get("window");

export default class QuizIntro extends Component {
  static navigationOptions = {
    headerTitle: "Free Quizz",
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      color: COLORS.white
    },
    headerRight: <View/>,
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" }
  };

  state = {
    rules: false,
    play: false
  };

  showRulesModal = () => {
    this.setState({
      rules: !this.state.rules
    });
  };

  showPlayModal = () => {
    this.setState({
      play: !this.state.play
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Text style={styles.topHeader}>{this.props.navigation.state.params.category}</Text>
          <Text style={styles.topMain}>{this.props.navigation.state.params.title}</Text>
          <Text style={styles.topDesc}>
            {this.props.navigation.state.params.desc}
          </Text>
        </View>
        <View style={styles.imageDiv}>
          <Image
            source={{uri: this.props.navigation.state.params.img}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.btnDiv}>
          <Button style={styles.btn1} light onPress={this.showRulesModal}>
            <Image
              source={require("../../../assets/rules.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.btnText}>Game Rules</Text>
          </Button>
          <Button
            style={styles.btn2}
            light
            onPress={() => this.props.navigation.navigate("rankings")}
          >
            <Image
              source={require("../../../assets/rankings.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.btnText}>Rankings</Text>
          </Button>
          <Button style={styles.btn3} light onPress={this.showPlayModal}>
            <Image
              source={require("../../../assets/play.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.btnText}>Play</Text>
          </Button>
        </View>
        <Popup isModalVisible={this.state.rules} close={this.showRulesModal}>
          <View style={styles.modalTop}>
            <Text style={styles.modalTopText}>Game rules</Text>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
            <Image
              source={require("../../../assets/rulesImg.png")}
              style={styles.iconModal}
              resizeMode="contain"
            />
            <View style={styles.modalTextDiv}>
              <Text style={styles.modalText}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla
              </Text>
            </View>
          </ScrollView>
        </Popup>
        <Popup isModalVisible={this.state.play} close={this.showPlayModal}>
          <View style={styles.topModal}>
            <Text style={styles.topHeaderModal}>{this.props.navigation.state.params.category}</Text>
            <Text style={styles.topMainModal}>{this.props.navigation.state.params.title}</Text>
          </View>
          <View style={styles.imageDiv}>
            <Image
              source={{uri: this.props.navigation.state.params.img}}
              style={styles.imageModal}
              resizeMode="cover"
            />
          </View>
          <View style={styles.playBtns}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ play: false }, () => {
                  this.props.navigation.navigate("quizMode", {
                    mode: "single",
                    id: this.props.navigation.state.params.id,
                    img: this.props.navigation.state.params.img,
                    category: this.props.navigation.state.params.category,
                    title: this.props.navigation.state.params.title
                  });
                });
              }}
              style={styles.playBtn1}
            >
              <View style={styles.btnTextDiv}>
                <Image
                  source={require("../../../assets/single.png")}
                  style={styles.imageBtn}
                  resizeMode="cover"
                />
                <Text style={styles.playBtnText}>Single{"\n"}Player</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ play: false }, () => {
                  this.props.navigation.navigate("quizMode", {
                    mode: "double"
                  });
                });
              }}
              style={styles.playBtn2}
            >
              <View style={styles.btnTextDiv}>
                <Image
                  source={require("../../../assets/opponent.png")}
                  style={styles.imageBtn}
                  resizeMode="cover"
                />
                <Text style={styles.playBtnText}>Opponent{"\n"}mode</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Popup>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center"
  },
  top: {
    alignItems: "center",
    paddingTop: 30,
    marginBottom: 30
  },
  topModal: {
    alignItems: "center",
    paddingTop: 25,
    marginBottom: 25
  },
  topHeader: {
    color: COLORS.primary,
    fontSize: 20,
    marginBottom: 10
  },
  topHeaderModal: {
    color: COLORS.primary,
    fontSize: 20
  },
  topMain: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  topMainModal: {
    fontSize: 18,
    fontWeight: "bold"
  },
  topDesc: {
    color: COLORS.textGrey,
    fontSize: 16,
    textAlign: "center"
  },
  imageDiv: {
    alignItems: "center"
  },
  image: {
    height: 150,
    width: 200,
    borderRadius: 12
  },
  imageModal: {
    height: 95,
    width: 120,
    borderRadius: 12
  },
  btnDiv: {
    marginBottom: 100,
    marginTop: 20
  },
  btn1: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    width: win.width / 1.4
  },
  btn2: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    width: win.width / 1.4
  },
  btn3: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    width: win.width / 1.4
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center"
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 10,
    marginTop: 2
  },
  modalTop: {
    backgroundColor: COLORS.primary,
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  modalTopText: {
    color: COLORS.white,
    fontSize: 18
  },
  modalContent: {
    marginTop: 20,
    marginBottom: 20
  },
  iconModal: {
    width: 80,
    alignSelf: "center",
    zIndex: -30,
    position: "relative"
  },
  modalTextDiv: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 22,
    marginTop: -30,
  },
  modalText: {
    color: COLORS.textGrey,
    fontSize: 16,
    textAlign: "center"
  },
  playBtns: {
    display: "flex",
    flexDirection: "row",
    marginTop: 45
  },
  playBtn1: {
    backgroundColor: COLORS.primary,
    width: "49.7%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
    borderBottomLeftRadius: 20
  },
  playBtn2: {
    backgroundColor: COLORS.primary,
    width: "49.7%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 1,
    borderBottomRightRadius: 20
  },
  playBtnText: {
    color: COLORS.white,
    fontSize: 18
  },
  imageBtn: {
    width: 35,
    height: 35,
    marginTop: 5,
    marginRight: 7
  },
  btnTextDiv: {
    display: "flex",
    flexDirection: "row"
  }
});
