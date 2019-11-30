// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd5176536dbe434b44f418c
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardItem, Body, Icon } from 'native-base';
import { COLORS } from "../../../styles/colors";

export default class FreeQuiz extends Component {
    static navigationOptions = {
        headerTitle: "Free Quizz",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View/>,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.cardMain}>
                    <CardItem style={styles.card}>
                        <Body style={{ alignItems: 'center' }}>
                            <View style={styles.cardBody}>
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
                                        source={require('../../../assets/quizImg2.png')}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.scoreDiv}>
                                    <Text style={styles.text}>350 / 450</Text>
                                    <View style={styles.timer}>
                                        <Image
                                            source={require('../../../assets/cash.png')}
                                            style={styles.cash}
                                            resizeMode="cover"
                                        />
                                        <Text style={styles.amount}>0</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.submit}>
                                <Text style={styles.submitText}>Submit to score board</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewBtn} onPress={() => this.props.navigation.navigate('viewDetails')}>
                                <Text style={styles.viewText}>View Details</Text>
                            </TouchableOpacity>
                        </Body>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 40
    },
    cardMain: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    card: {
        backgroundColor: COLORS.card,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    cardBody: {
        padding: 10
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
        fontSize: 20
    },
    topMain: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textNormal
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
        fontSize: 16,
        marginBottom: 10
    },
    amount: {
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 5
    },
    cash: {
        width: 30,
        height: 30
    },
    submit: {
        backgroundColor: COLORS.bgLightYellow,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 60
    },
    viewBtn: {
        backgroundColor: COLORS.primary,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    submitText: {
        fontSize: 18,
        color: COLORS.textNormal
    },
    viewText: {
        fontSize: 18,
        color: COLORS.white
    },
});

