// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30c12fb9c6f349cca6300
import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Content, Button, Text, Icon } from "native-base";

import { COLORS } from "../../../styles/colors";
import { QuizCard } from "../../../components/common";
import { Popup } from "../../../components/common"
import { connect } from "react-redux";
import { allQuiz } from "../../../actions/quiz";
import { Loader } from "../../../components/common";
// import console = require("console");
// import console = require("console");

// dummy data for the screen
const categories = ["1", "2", "3"];
const quizes = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/quizImg1.png");
  }
  return require("../../../assets/quizImg2.png");
});

class QuizList extends Component {
  static navigationOptions = {
    title: "All Qwuizes"
  };

  state = {
    showModal: false,
    dataModal: {
      title: "",
      campaign_type_id: "",
      description: "",
      id: null
    },
    start: false,
    newestCampaings: [],
    popularCampaings: [],
    topCampaings: [],
    noteWorthyCampaings: [],
    endingSoonCampaings: [],
    charitableCampaings: [],
    categories: []
  }

  async componentDidMount() {
    await this.props.getAllQuiz()
    this.setState({
      newestCampaings: this.props.quiz.data.newestCampaings,
      popularCampaings: this.props.quiz.data.popularCampaings,
      topCampaings: this.props.quiz.data.topCampaings,
      noteWorthyCampaings: this.props.quiz.data.noteWorthyCampaings,
      endingSoonCampaings: this.props.quiz.data.endingSoonCampaings,
      charitableCampaings: this.props.quiz.data.charitableCampaings,
      categories: this.props.quiz.data.categories,
      img: this.props.quiz.data.img,
    })
  }

  startQuizModal = () => {
    this.setState({
      start: !this.state.start
    })
  }

  getModal = data => {
    this.setState({
      showModal: true,
      dataModal: data
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  startQuiz = () => {
    this.hideModal()
    this.props.navigation.navigate("quizIntro", { img: this.state.img, title: this.state.dataModal.title, category: this.state.categories[this.state.dataModal.campaign_type_id], desc: this.state.dataModal.description, id: this.state.dataModal.id })
  }

  render() {
    const { newestCampaings, popularCampaings, topCampaings, noteWorthyCampaings, endingSoonCampaings, charitableCampaings } = this.state;

    return (
      this.props.loading ? <Loader /> :
        <Container>
          {newestCampaings.length === 0 && popularCampaings.length === 0 && topCampaings.length === 0 && noteWorthyCampaings.length === 0 && endingSoonCampaings.length === 0 && charitableCampaings.length === 0 ?
            <View style={styles.empty}>
              <Text>No quizes to show</Text>
            </View> :
            <Content contentContainerStyle={styles.pt4}>
              {newestCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Newest quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {newestCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              {popularCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Popular quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {popularCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              {topCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Top quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {topCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              {noteWorthyCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Note worthy quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {noteWorthyCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              {endingSoonCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Ending soon quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {endingSoonCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              {charitableCampaings.length > 0 &&
                <View style={styles.mb2}>
                  <View style={styles.categoryHeaderStyle}>
                    <Text style={styles.textBig}> Charitable quizes </Text>
                    {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("quizCategory", {data: this.props.quiz.data})}
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal="true"
                    style={styles.mr2}
                    contentContainerStyle={[styles.p0_5, styles.pl2]}
                    showsHorizontalScrollIndicator={false}
                  >
                    {charitableCampaings.map((campaign, id) => (
                      <QuizCard key={id} image={{ uri: this.props.quiz.data.img }} start={() => this.getModal(campaign)} title={campaign.title} category={this.props.quiz.data.categories[campaign.campaign_type_id]} />
                    ))}
                  </ScrollView>
                </View>
              }
              <Popup isModalVisible={this.state.showModal} close={this.hideModal} style={styles.modal}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <View style={styles.timer}>
                    <Icon
                      name="alarm"
                      style={{ color: COLORS.textGrey, marginRight: 5 }}
                    />
                    <Text style={styles.topDesc}>1m 19h 7m and 12s</Text>
                  </View>
                  <View style={styles.top}>
                    <Text style={styles.topHeader}>{this.state.categories[this.state.dataModal.campaign_type_id]}</Text>
                    <Text style={styles.topMain}>{this.state.dataModal.title}</Text>
                  </View>
                  <View style={styles.imageDiv}>
                    <Image
                      source={{ uri: this.state.img }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.scoreDiv}>
                    <Text style={styles.text}>Score up to 450 points to win </Text>
                    <View style={styles.timer}>
                      <Image
                        source={require('../../../assets/cash.png')}
                        style={styles.cash}
                        resizeMode="cover"
                      />
                      <Text style={styles.amount}>20</Text>
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.tryFree}>
                  <Text style={styles.tryFreeText}>Try Free Practice Quizz</Text>
                </View>
                <Button style={styles.startBtn} onPress={this.startQuiz}>
                  <Text style={styles.startBtnText}>Start Quizz</Text>
                </Button>
              </Popup>
            </Content>
          }
        </Container>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllQuiz: () => dispatch(allQuiz()),
});

const mapStateToProps = state => ({
  loading: state.quiz.loading,
  quiz: state.quiz.quiz,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizList);

const styles = StyleSheet.create({
  categoryHeaderStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  mb2: {
    marginBottom: 16
  },
  mr1: {
    marginRight: 8
  },
  mr2: {
    marginRight: 16
  },
  p0_5: {
    padding: 4
  },
  pl2: {
    paddingLeft: 16
  },
  pt4: {
    paddingTop: 32
  },
  textBig: {
    fontSize: 18
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
    textAlign: "center"
  },
  top: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 15
  },
  topHeader: {
    color: COLORS.primary,
    fontSize: 20,
    textAlign: "center"
  },
  topMain: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textNormal,
    textAlign: "center"
  },
  imageDiv: {
    alignItems: "center"
  },
  image: {
    height: 95,
    width: 130,
    borderRadius: 12
  },
  scoreDiv: {
    alignItems: "center",
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
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
    width: "100%"
  },
  modal: {
    height: 1000
  },
  textSmall: {
    fontSize: 12
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
