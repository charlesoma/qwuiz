// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd516fa0f065967ea6f56bd

import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { getSaved, getSavedMore } from "../../../actions/campaign";
import { Loader } from "../../../components/common";
import moment from "moment";
import {
  Container,
  Content,
  Text,
  Toast,
  View
} from 'native-base';

import { CampaignCard } from '../../../components/common'
import { COLORS } from '../../../styles/colors'

const campaigns = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/campaignImg2.png");
  }
  return require("../../../assets/campaignImg1.png");
});

class SavedCampaigns extends Component {
  state = {
    data: [],
    page: 1,
    clicked: false
  }

  static navigationOptions = {
    headerTitle: "Saved Campaigns",
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      color: COLORS.white
    },
    headerRight: <View />,
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
  }

  async componentDidMount() {
    await this.props.getSaved();
    this.setState({
      data: this.props.saved.data.campaigns.data,
      check: this.props.saved.data.campaigns.next_page_url
    })
    console.log(this.props.saved.data.campaigns.data)
  }

  more = async () => {
    this.setState({
      clicked: true
    })
    await this.props.getMore(this.state.page + 1)
    this.setState({
      more: this.props.savedMore,
      data: this.state.data.concat(this.props.savedMore),
      check: this.props.savedMore.next_page_url,
      page: this.state.page + 1,
      clicked: false
    })

    if (!this.props.loaded) {
      return Toast.show({
        text: "Error loading more",
        type: "danger"
      });
    }
  }

  render() {
    const { data } = this.state;
    let current = moment()
    return (
      <Container>
        {
          this.props.loading ? <Loader /> :
            <Content>
              {this.state.data.length < 1 ?
                <View style={styles.empty}>
                  <Text>Nothing to show</Text>
                </View> :
                <ScrollView contentContainerStyle={styles.campaignList}>
                  {data.map((data) => (
                    <CampaignCard
                      key={data.id}
                      image={require("../../../assets/campaignImg2.png")}
                      description={data.description}
                      amount={data.goal.amount_to_raise}
                      title={data.title}
                      left={moment(data.goal.end_date).diff(current, 'days')}
                      style={styles.mb2}
                      progress={data.amountRaised/data.goal.amount_to_raise}
                    />
                  ))}
                  {
                    this.state.check &&
                    <TouchableOpacity
                      onPress={this.more}
                      style={styles.more}
                    >
                      {
                        this.state.clicked ?
                          <Text style={styles.btnText}>Loading...</Text> :
                          <Text style={styles.btnText}>Show more</Text>
                      }
                    </TouchableOpacity>
                  }
                </ScrollView>
              }
            </Content>
        }
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSaved: () => dispatch(getSaved()),
  getMore: (page) => dispatch(getSavedMore(page))
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  saved: state.campaign.savedArr,
  savedMore: state.campaign.savedMore,
  loaded: state.campaign.loaded,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedCampaigns);

const styles = StyleSheet.create({
  campaignList: {
    paddingVertical: 32,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  mb2: {
    marginBottom: 16
  },
  more: {
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  btnText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center"
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});