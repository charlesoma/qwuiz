// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd4789a36dbe434b44a533a
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, Item, Input, Textarea, Toast } from 'native-base';
import { campaignCreate } from "../../../actions/campaign";
import { COLORS } from "../../../styles/colors";
import { Popup } from "../../../components/common"
import { Loader } from "../../../components/common";
// import console = require("console");
// import console = require("console");

const win = Dimensions.get('window');

class CreateCampaignSetup extends Component {
  static navigationOptions = {
    headerTitle: null,
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      color: COLORS.white
    },
    headerRight: <View />,
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
  };

  state = {
    title: "",
    description: "",
    // campaign_type_id: "",
    // category_id: "",
    // strategy_id: "",
  }

  componentDidMount() {
    this.setState({
      category_id: this.props.navigation.state.params.category_id,
      campaign_type_id: this.props.navigation.state.params.campaign_type_id,
      strategy_id: this.props.navigation.state.params.strategy_id
    })
    console.log(this.state.category_id)
  }

  handleSubmit = async () => {
    const { title, description, campaign_type_id, category_id, strategy_id } = this.state;
    console.log(title, description, campaign_type_id, category_id, strategy_id)
    if (!title || !description || !campaign_type_id || !category_id || !strategy_id) {
      return;
    }

    await this.props.create({ title, description, campaign_type_id, category_id, strategy_id });

    if (this.props.created) {
      return this.props.navigation.navigate("createCampaignSuccess");
    }

    // if it hasn't returned, then authentication failed
    Toast.show({
      text: "An error occured",
      type: "danger"
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Text style={styles.header}>A bit more info</Text>
          <Text style={styles.desc}>
            Tell us what you’ll be raising funds for.
              </Text>
          <TouchableOpacity>
            <Text style={styles.learnMore}>Learn more</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.inputDiv}>
            <Text style={styles.label}>Campaign Title</Text>
            <Item regular style={styles.input}>
              <Input
                placeholder="Enter a title"
                placeholderTextColor={COLORS.placeholder}
                onChangeText={(value) => this.setState({ title: value })}
              />
            </Item>
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.label}>Campaign Discription</Text>
            <Textarea
              style={styles.textArea}
              rowSpan={5}
              bordered
              placeholder="Enter a description"
              placeholderTextColor={COLORS.placeholder}
              onChangeText={(value) => this.setState({ description: value })}
            />
          </View>
        </View>
        <View style={styles.bottomDiv}>
          <Text style={styles.addMediaText}>
            Add some media to your project
              </Text>
          <View style={styles.addMediaRow}>
            <TouchableOpacity style={styles.cameraDiv}>
              <Image
                source={require("../../../assets/camera.png")}
                style={styles.camera}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.projectorDiv}>
              <Image
                source={require("../../../assets/projector.png")}
                style={styles.projector}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoDiv}>
            <Text style={styles.info}>
              The platform is free for organizers. Transaction fee
              is 2.9% plus $0.30 per donation. By continuing, you
              agree to the Qwuizz terms and acknowledge receipt of
              our Privacy Policy
                </Text>
          </View>
        </View>
        <Button
          onPress={() =>
            this.handleSubmit()
          }
          style={styles.btn}
          light
        >
          <Text style={styles.btnText}>Continue</Text>
        </Button>
        {this.props.loading ? <Loader /> : null}
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  create: (data) => dispatch(campaignCreate(data))
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  created: state.campaign.created
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaignSetup);

const styles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  top: {
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 30
  },
  header: {
    color: COLORS.text,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  desc: {
    color: COLORS.textGrey,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
  learnMore: {
    color: COLORS.primary
  },
  inputDiv: {
    width: '100%'
  },
  input: {
    width: win.width / 1.2,
    borderColor: COLORS.formGrey,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    marginBottom: 15
  },
  textArea: {
    width: win.width / 1.2,
    borderColor: COLORS.formGrey,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    marginBottom: 15,
    padding: 5
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color: COLORS.text
  },
  bottomDiv: {
    alignItems: 'center'
  },
  addMediaText: {
    fontSize: 16,
    color: COLORS.textNormal
  },
  addMediaRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  cameraDiv: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.greyBg,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 30
  },
  camera: {
    width: 70,
    height: 70
  },
  projectorDiv: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.greyBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 30
  },
  projector: {
    width: 25,
    height: 25
  },
  infoDiv: {
    width: win.width / 1.3
  },
  info: {
    textAlign: 'center',
    color: COLORS.textGrey
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    width: win.width / 1.4,
    marginTop: 40,
    marginBottom: 40,
    alignSelf: 'center'
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center'
  },
});

