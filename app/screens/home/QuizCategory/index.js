// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd3c3c7ece43c3484c06ced

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Content, Button, Text, Icon, Body } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { COLORS } from "../../../styles/colors";
import { QuizCard } from "../../../components/common";
import { Popup } from "../../../components/common"

const categories = [
  {
    id: 1,
    title: "Popular",
    icon: "fire",
    iconType: "MaterialCommunityIcons"
  },
  {
    id: 2,
    title: "Newest",
    icon: "new-box",
    iconType: "MaterialCommunityIcons"
  },
  {
    id: 3,
    title: "Ending Soon",
    icon: "timer",
    iconType: "MaterialCommunityIcons"
  },
  {
    id: 4,
    title: "Games in your area",
    icon: "md-locate",
    iconType: "Ionicons"
  }
];

const quizes = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/quizImg1.png");
  }
  return require("../../../assets/quizImg2.png");
});

export default class QuizCategory extends Component {
  state = { activeCategory: 1 };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      elevation: 0
    },
    title: "Quiz Category",
    headerTintColor: COLORS.textWhite
  };

  setActiveCategory = id => {
    this.setState({ activeCategory: id });
  };

  state = {
    start: false,
    activeCategory: 1
  }
  
  startQuizModal = () => {
    this.setState({
      start: !this.state.start
    })
  }
  
  startQuiz = () => {
    this.startQuizModal()
    this.props.navigation.navigate("quizIntro")
  }

  renderCategories = () => {
    const { activeCategory } = this.state;
    return categories.map(({ id, title, icon, iconType }) => {
      return (
        <TouchableOpacity
          key={id}
          style={styles.mr5}
          onPress={() => this.setActiveCategory(id)}
        >
          <View style={styles.alignItemsCenter}>
            {iconType == "Ionicons" ? (
              <Ionicons
                name={icon}
                size={24}
                style={activeCategory == id ? styles.active : styles.inactive}
              />
            ) : (
              <MaterialCommunityIcons
                name={icon}
                style={activeCategory == id ? styles.active : styles.inactive}
                size={24}
              />
            )}
            <Text
              style={activeCategory == id ? styles.active : styles.inactive}
            >
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <Container>
        <View style={styles.shadow}>
          <ScrollView
            horizontal="true"
            contentContainerStyle={styles.categoryFilterSection}
            showsHorizontalScrollIndicator={false}
          >
            {this.renderCategories()}
          </ScrollView>
        </View>
        <Content style={styles.fullHeight}>
          <ScrollView contentContainerStyle={styles.quizList}>
            {quizes.map((quiz, id) => (
              <QuizCard key={id} image={quiz} start={this.startQuizModal} />
            ))}
          </ScrollView>
          <Popup
            isModalVisible={this.state.start}
            close={this.startQuizModal}
            style={styles.modal}
          >
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.timer}>
                <Icon
                  name="alarm"
                  style={{ color: COLORS.textGrey, marginRight: 5 }}
                />
                <Text style={styles.topDesc}>1m 19h 7m and 12s</Text>
              </View>
              <View style={styles.top}>
                <Text style={styles.topHeader}>ENGLISH</Text>
                <Text style={styles.topMain}>Spelling Quizz</Text>
              </View>
              <View style={styles.imageDiv}>
                <Image
                  source={require("../../../assets/quizImg2.png")}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.scoreDiv}>
                <Text style={styles.text}>
                  Score up to 450 points to win{" "}
                </Text>
                <View style={styles.timer}>
                  <Image
                    source={require("../../../assets/cash.png")}
                    style={styles.cash}
                    resizeMode="cover"
                  />
                  <Text style={styles.amount}>20</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.tryFree}>
              <Text style={styles.tryFreeText}>
                Try Free Practice Quizz
              </Text>
            </View>
            <Button style={styles.startBtn} onPress={this.startQuiz}>
              <Text style={styles.startBtnText}>Start Quizz</Text>
            </Button>
          </Popup>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
    shadowRadius: 12,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4
    }
  },
  categoryFilterSection: {
    height: 80,
    paddingLeft: 16,
    backgroundColor: COLORS.offWhite,
    display: "flex",
    alignItems: 'center',
    flexDirection: "row",
  },
  quizList: {
    paddingLeft: 16,
    paddingVertical: 32,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
    // justifyContent: 'space-between'
  },
  active: {
    color: COLORS.iconActive
  },
  inactive: {
    color: COLORS.iconInactive
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  mr5: {
    marginRight: 40
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center'
  },
  icon: {
    color: COLORS.textGrey,
    marginRight: 5,
    textAlign: 'center'
  },
  topDesc: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center'
  },
  top: {
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 15
  },
  topHeader: {
    color: COLORS.primary,
    fontSize: 20,
  },
  topMain: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textNormal
  },
  imageDiv: {
    alignItems: 'center'
  },
  image: {
    height: 95,
    width: 130,
    borderRadius: 12
  },
  scoreDiv: {
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    color: COLORS.textGrey,
    fontSize: 14,
    marginBottom: 10
  },
  amount: {
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 5
  },
  cash: {
    width: 30,
    height: 30
  },
  tryFree: {
    backgroundColor: COLORS.bgLightYellow,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  tryFreeText: {
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
    color: COLORS.textNormal
  },
  startBtnText: {
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
    color: COLORS.white
  },
  modalContent: {
    width: '100%'
  },
  modal: {
    height: 1000
  }
});
