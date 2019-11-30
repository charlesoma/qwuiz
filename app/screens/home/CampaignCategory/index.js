// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd41e3d8504b367a28231f6

import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Content, Button, Text, Icon, Body } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { COLORS } from "../../../styles/colors";
import { CampaignCard } from "../../../components/common";

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

const campaigns = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/campaignImg2.png");
  }
  return require("../../../assets/campaignImg1.png");
});

export default class CampaignCategory extends Component {
  state = { activeCategory: 1 };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      elevation: 0
    },
    title: "Campaign Category",
    headerTintColor: COLORS.textWhite
  };

  setActiveCategory = id => {
    this.setState({ activeCategory: id });
  };

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
        <Content>
          <ScrollView contentContainerStyle={styles.campaignList}>
            {campaigns.map((campaign, id) => (
              <CampaignCard
                onPress={() =>
                  this.props.navigation.navigate("campaignDetail")
                }
                key={id}
                image={campaign}
                style={styles.mb2}
              />
            ))}
          </ScrollView>
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
    alignItems: "center",
    flexDirection: "row"
  },
  campaignList: {
    paddingVertical: 32,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around'
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
  mb2: {
      marginBottom: 16
  }
});