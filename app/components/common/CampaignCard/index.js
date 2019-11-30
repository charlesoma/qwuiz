import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, CardItem, Body, Text, Badge, Left, Right } from "native-base";

import ProgressBar from '../ProgressBar'
import { COLORS } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const CampaignCard = ({ image, title, description, amount, left, style, onPress, progress }) => {
  // const progress = 0.4
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Card style={styles.cardContainer}>
        <CardItem cardBody> 
          <Image style={styles.cardImg} resizeMode="cover" source={image} /> 
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.campaignTitle}>
              {title}
            </Text>
            <Text style={[styles.campaignInfo, styles.mb2]}> 
              {description}
            </Text>
            <Badge style={styles.timeLeftBadge} danger>
              <Text style={styles.timeLeftText}>{left} days Left</Text>
            </Badge>
            <ProgressBar value={progress} />
          </Body>
        </CardItem>
        <CardItem style={[styles.flexRow, styles.justifyContentBetween]} footer>
          <Text style={styles.campaignPrice}> ${amount} </Text>
          <Text style={styles.campaignProgress}> {`${Math.floor(progress * 100)}%`} </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 16,
    elevation: 1,
  },
  cardImg: { 
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  campaignTitle: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 16
  },
  campaignInfo: {
    color: COLORS.textNormal,
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 8
  },
  timeLeftBadge: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: 16
  },
  timeLeftText: {
    fontSize: 12
  },
  mb1: {
    marginBottom: 8
  },
  mb2: {
    marginBottom: 16
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  justifyContentBetween: {
    justifyContent: "space-between"
  },
  campaignPrice: {
    fontSize: 16
  },
  campaignProgress: {
    fontWeight: "500",
    color: COLORS.textNormal
  }
});

export default CampaignCard;
