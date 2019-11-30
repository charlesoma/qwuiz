import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";

import { COLORS } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const QuizCard = ({ image, start, title, category }) => {
  return (
    <TouchableOpacity onPress={start}>
      <Card style={styles.cardContainer}>
        <CardItem cardBody>
          <Image
            style={styles.cardImg}
            resizeMode="cover"
            source={image}
          />
        </CardItem>
        <CardItem cardBody>
          <Body style={styles.alignItemsCenter}>
            <Text style={styles.quizSubjectText}>{category}</Text>
            <Text style={styles.quizTitleText}>{title}</Text>
            {/* <Text style={styles.quizTimeLeftText}>1m 47s left</Text> */}
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 160,
    overflow: "hidden",
    borderRadius: 8,
    marginRight: 16,
    elevation: 1
  },
  cardImg: { 
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  quizSubjectText: {
    color: COLORS.primary,
    textTransform: "uppercase",
    fontSize: 8,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center"
  },
  quizTitleText: {
    color: COLORS.tertiary,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center"
  },
  quizTimeLeftText: {
    color: COLORS.tertiary,
    fontWeight: "100",
    fontSize: 14,
  }
});

export default QuizCard;
