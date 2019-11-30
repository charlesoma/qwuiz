// single ==> https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30f34e615ba3472570901
// double ==> https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd3102aafb368686e11e967

import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar, Platform, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Text,
  Header,
  Toast,
  Right,
  Body,
  Thumbnail,
  Button
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/auth";
import { question, postAnswer } from "../../../actions/quiz";
import { Loader } from "../../../components/common";
import { CountDownText } from 'react-native-countdown-timer-text';
import Timer from "./Timer";

import { COLORS } from "../../../styles/colors";
import user1Image from "../../../assets/user1.png";
import user2Image from "../../../assets/user2.png";
import quizModeImage from "../../../assets/quizModeImg.png";
// import console = require("console");

class QuizMode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: props.navigation.getParam('mode', 'single'),
      question: '',
      time: 180,
      score: 0
    }
  }

  static navigationOptions = {
    header: null
  };

  question = async () => {
    await this.props.getQuestion(this.props.navigation.state.params.id);

    if (this.props.resolved) {
      return this.setState({
        question: this.props.question.question[0].question,
        option_a: this.props.question.question[0].option_a,
        option_b: this.props.question.question[0].option_b,
        option_c: this.props.question.question[0].option_c,
        option_d: this.props.question.question[0].option_d,
        option_e: this.props.question.question[0].option_e,
        answer: this.props.question.question[0].answer,
        question_id: this.props.question.question[0].id,
        campaign_id: this.props.navigation.state.params.id,
        time_start: new Date()
      })
    }

    if (!this.props.resolved) {
      this.props.navigation.navigate("home")
      return Toast.show({
        text: "Sorry, you can't play this quiz",
        type: "danger"
      });
    }
  };

  postAnswer = async (option) => {
    clearInterval(this.interval);
    this.setState({
      btn: option
    })
    const { question_id, time_start, campaign_id } = this.state;
    let time_end = new Date()
    let time_spent = Math.round((time_end - time_start) / 1000)
    await this.props.postAnswer(option, question_id, time_spent, campaign_id);

    if (this.props.postedAnswer) {
      console.log(this.props.score)
      this.question();
      this.interval = setInterval(() => this.question(), 15000);
      return this.setState({
        time_start: new Date()
      })
      // return this.props.navigation.navigate('quizResult', { mode: this.state.mode })
    }

    // if it hasn't returned, then authentication failed
    Toast.show({
      text: "An error occured",
      type: "danger"
    });
  };

  componentDidMount() {
    this.props.getUser();
    this.question();
    this.interval = setInterval(() => this.question(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  end = () => {
    clearInterval(this.interval);
    this.props.navigation.navigate('quizResult', {
      mode: this.state.mode,
      id: this.state.campaign_id,
      img: this.props.navigation.state.params.img,
      category: this.props.navigation.state.params.category,
      title: this.props.navigation.state.params.title
    })
  }

  render() {
    const { mode, question, option_a, option_b, option_c, option_d, option_e, time } = this.state;
    const { user } = this.props;
    return (
      <Container>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={styles.backDiv}>
          <Text style={styles.close}>&times;</Text>
        </TouchableOpacity>
        <Header
          style={[
            styles.header,
            Platform.OS == "android"
              ? { paddingTop: StatusBar.currentHeight }
              : {}
          ]}
        >
          <View style={[styles.flexRow, styles.alignItemsCenter, styles.flex1]}>
            <Thumbnail small source={user1Image} style={styles.mr1} />
            <View>
              <Text style={[styles.textWhite, styles.userNameText]}>
                {user ? `${user.firstname}` : "Guest"}{" "}
              </Text>
              <Text style={[styles.textWhite, styles.userScoreText]}> {this.props.score} </Text>
            </View>
          </View>
          <View style={[styles.headerBody, styles.flex1]}>
            <View style={styles.timerContainer}>
              <Timer end={this.end} />
              <MaterialCommunityIcons
                name="clock-outline"
                color={COLORS.textWhite}
                size={32}
              />
            </View>
          </View>
          {mode == "double" ? (
            <View style={[styles.opponentSection, styles.flex1]}>
              <View style={[styles.mr1, styles.flexEnd]}>
                <Text style={[styles.textWhite, styles.userNameText]}>
                  Vivian
                </Text>
                <Text style={[styles.textWhite, styles.userScoreText]}>0</Text>
              </View>
              <Thumbnail small source={user2Image} />
            </View>
          ) : (
              <View style={styles.flex1} />
            )}
        </Header>
        {this.props.loading ? <Loader /> :
          <Content style={styles.contentContainer}>
            <Image
              source={quizModeImage}
              resizeMode="contain"
              style={[styles.quizModeImg, styles.mb1]}
            />
            <Text style={[styles.questionText, styles.mb2]}>
              {question}
            </Text>

            <View style={{ marginBottom: 50 }}>
              <Button onPress={() => this.postAnswer("A")} style={[styles.optionBtn, styles.mb1]} block>
                <Text style={styles.optionBtnText}> {option_a} </Text>
              </Button>
              <Button onPress={() => this.postAnswer("B")} style={[styles.optionBtn, styles.mb1]} block>
                <Text style={styles.optionBtnText}> {option_b} </Text>
              </Button>
              <Button onPress={() => this.postAnswer("C")} style={[styles.optionBtn, styles.mb1]} block>
                <Text style={styles.optionBtnText}> {option_c} </Text>
              </Button>
              <Button onPress={() => this.postAnswer("D")} style={[styles.optionBtn, styles.mb1]} block>
                <Text style={styles.optionBtnText}> {option_d} </Text>
              </Button>
              <Button onPress={() => this.postAnswer("E")} style={[styles.optionBtn, styles.mb1]} block>
                <Text style={styles.optionBtnText}> {option_e} </Text>
              </Button>
            </View>
          </Content>
        }
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(fetchUser()),
  getQuestion: (id) => dispatch(question(id)),
  postAnswer: (option, question_id, time_spent, campaign_id) => dispatch(postAnswer(option, question_id, time_spent, campaign_id))
});

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.quiz.loading,
  resolved: state.quiz.resolved,
  question: state.quiz.question,
  postedAnswer: state.quiz.postedAnswer,
  score: state.quiz.score
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizMode);

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.tertiary,
    overflow: "visible",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    paddingBottom: 8,
    width: "100%"
  },
  headerBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  timerContainer: {
    backgroundColor: COLORS.tertiary,
    padding: 4,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: -24
  },
  opponentSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  quizModeImg: {
    width: "100%",
    height: 200,
    borderRadius: 20
  },
  questionText: {
    color: COLORS.tertiary,
    fontSize: 20,
    textAlign: "center"
  },
  optionBtn: {
    backgroundColor: COLORS.secondary,
    // backgroundColor: "green",
    height: 60,
  },
  optionBtnRight: {
    // backgroundColor: COLORS.secondary,
    backgroundColor: COLORS.textGreen,
    height: 60,
  },
  optionBtnWrong: {
    // backgroundColor: COLORS.secondary,
    backgroundColor: COLORS.textRed,
    height: 60,
  },
  optionBtnText: {
    textAlign: "center"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  timerText: {
    color: COLORS.textWhite,
    fontSize: 10,
    textAlign: "center"
  },
  textWhite: {
    color: COLORS.textWhite
  },
  userNameText: {
    fontSize: 12
  },
  userScoreText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "700"
  },
  flexEnd: {
    alignItems: "flex-end"
  },
  flex1: {
    flex: 1
  },
  mr1: {
    marginRight: 8
  },
  mb1: {
    marginBottom: 8
  },
  mb2: {
    marginBottom: 16
  },
  close: {
    fontSize: 30
  },
  backDiv: {
    position: "absolute",
    top: 70,
    left: 15,
    zIndex: 100
  }
});
