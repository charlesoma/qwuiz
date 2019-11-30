import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card, CardItem, Body, Icon, Item, Input, Picker, Button, Toast, Container } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { createGoal, getGoal, publishCampaign, campaignActive } from "../../../actions/campaign";
// import console = require("console");
import { Loader } from "../../../components/common";

class CampaignGoals extends Component {
    static navigationOptions = {
        headerTitle: "Campaign Goals",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    async componentDidMount() {
        await this.props.getGoal(this.props.navigation.state.params.id)
        if(this.props.goal.campaign.goal !== null) {
            this.setState({
                amount: this.props.goal.campaign.goal.amount_to_raise,
                entry_fee: this.props.goal.campaign.goal.entry_fee,
                funding_requirements: this.props.goal.campaign.goal.funding_requirement_id,
                duration_number: this.props.goal.campaign.goal.duration_number,
            })
        }

        console.log(this.props.goal.days)
    }

    state = {
        amount: "",
        entry_fee: "",
        funding_requirements: "",
        duration_number: "",
        duration_period: "days"
    };

    onValueChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    create = async () => {
        const { amount, entry_fee, funding_requirements, duration_number, duration_period } = this.state;
        if (!amount || !entry_fee || !funding_requirements || !duration_number) {
            return Alert.alert("Please fill all details")
        }
        console.log({ amount, entry_fee, funding_requirements, duration_number, duration_period }, this.props.navigation.state.params.id)

        await this.props.createGoal({ amount, entry_fee, funding_requirements, duration_number, duration_period }, this.props.navigation.state.params.id);

        if (this.props.createdGoal) {
            return Toast.show({
                text: "Campaign goals saved successfully",
                type: "success"
            });
        }

        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    };

    publish = async () => {
    
        console.log(this.props.navigation.state.params.id)

        await this.props.publishCampaign(this.props.navigation.state.params.id);

        if (this.props.published) {
            this.props.getActive();
            this.props.navigation.navigate("manageCampaigns")
            return Toast.show({
                text: "Campaign published successfully",
                type: "success"
            });
        }

        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    render() {
        return (
            <Container>
                {this.props.loading ? <Loader /> :
                    <ScrollView contentContainerStyle={styles.content}>
                        <View>
                            <Text style={styles.topText}>An organisation posting a campaign on our platform will be given an option to chose between three ratio structures of distribution of the total funds raised.</Text>
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.label}>How much will you be raising for your campaign?</Text>
                            <Item regular style={styles.input}>
                                <View style={styles.currency}>
                                    <Text style={styles.currencyText}>$</Text>
                                    <Text style={styles.currencyTextSmall}>USD</Text>
                                </View>
                                <Input
                                    placeholder='Enter amount'
                                    placeholderTextColor={COLORS.placeholder}
                                    onChangeText={text => this.handleChange("amount", text)}
                                    value={this.state.amount}
                                />
                            </Item>
                            <Text style={styles.label}>How much is the entry fee for your campaign?</Text>
                            <Item regular style={styles.input}>
                                <View style={styles.currency}>
                                    <Text style={styles.currencyText}>$</Text>
                                    <Text style={styles.currencyTextSmall}>USD</Text>
                                </View>
                                <Input
                                    placeholder='Enter amount'
                                    placeholderTextColor={COLORS.placeholder}
                                    onChangeText={text => this.handleChange("entry_fee", text)}
                                    value={this.state.entry_fee}
                                />
                            </Item>
                            <Text style={styles.label}>Funding Requirement</Text>
                            <Item style={styles.pickerContainer} picker>
                                {this.props.goal.fundingRequirements &&
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={
                                            <SimpleLineIcons
                                                name="arrow-down"
                                                style={{ fontSize: 12 }}
                                            />
                                        }
                                        style={{ width: "80%" }}
                                        placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                                        textStyle={{ maxWidth: "100%", fontSize: 14 }}
                                        selectedValue={this.state.funding_requirements}
                                        onValueChange={(value) => this.onValueChange('funding_requirements', value)}
                                    >
                                            <Picker.Item label="Please select" value="0" />

                                        {
                                            this.props.goal.fundingRequirements.map(v => (
                                                <Picker.Item label={v.name} value={v.id} key={v.id} />
                                            ))
                                        }
                                        {/* <Picker.Item label="Please select" value="0" />
                                    <Picker.Item label="35%" value="2" />
                                    <Picker.Item label="45%" value="45%" />
                                    <Picker.Item label="55%" value="55%" /> */}
                                    </Picker>
                                }
                            </Item>
                            <Text style={styles.label}>Campaign Duration - Days</Text>
                            <View>
                                <Item style={styles.pickerContainer} picker>
                                    {this.props.goal.days &&
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={
                                                <SimpleLineIcons
                                                    name="arrow-down"
                                                    style={{ fontSize: 12 }}
                                                />
                                            }
                                            style={{ width: "80%" }}
                                            placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                                            textStyle={{ maxWidth: "100%", fontSize: 14 }}
                                            selectedValue={this.state.duration_number}
                                            onValueChange={(value) => this.onValueChange('duration_number', value)}
                                        >
                                            {/* {
                                            this.props.goal.days.map(day => (
                                                <Picker.Item label={day} value={day} key={day} />
                                            ))
                                        } */}
                                            <Picker.Item label="Please select" value="0" />
                                            <Picker.Item label="30" value="30" />
                                            <Picker.Item label="60" value="60" />
                                            <Picker.Item label="90" value="90" />
                                        </Picker>
                                    }
                                </Item>
                            </View>
                            <Button
                                // onPress={() => this.props.navigation.navigate("prize")}
                                onPress={() => this.create()}
                                style={styles.btn}
                                light
                            >
                                <Text style={styles.btnText}>Save draft</Text>
                            </Button>
                            {
                                this.props.navigation.state.params.strategy === 3 ?
                                    <Button
                                        onPress={() => this.publish()}
                                        style={styles.btn}
                                        light
                                    >
                                        <Text style={styles.btnText}>Publish</Text>
                                    </Button>
                                    :
                                    <Button
                                        onPress={() => this.props.navigation.navigate("prize", { id: this.props.navigation.state.params.id })}
                                        style={styles.btn}
                                        light
                                    >
                                        <Text style={styles.btnText}>Set prize</Text>
                                    </Button>
                            }
                        </View>
                    </ScrollView>
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getGoal: (id) => dispatch(getGoal(id)),
    createGoal: (data, id) => dispatch(createGoal(data, id)),
    publishCampaign: (id) => dispatch(publishCampaign(id)),
    getActive: () => dispatch(campaignActive()),
});

const mapStateToProps = state => ({
    loading: state.campaign.loading,
    published: state.campaign.published,
    createdGoal: state.campaign.createdGoal,
    goal: state.campaign.goal
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignGoals);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 40
    },
    topText: {
        color: COLORS.textNormal
    },
    form: {
        marginTop: 40,
        width: '100%'
    },
    label: {
        marginTop: 20,
        color: COLORS.textNormal
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.greyBg,
        marginTop: 10,
    },
    currency: {
        backgroundColor: COLORS.secondary,
        height: '100%',
        width: 60,
        alignItems: 'center',
        paddingTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    currencyText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    currencyTextSmall: {
        color: COLORS.white,
        fontSize: 10
    },
    pickerContainer: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.greyBg,
        paddingLeft: 8,
        marginTop: 10
    },
    btn: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: '100%',
        marginTop: 30,
        justifyContent: "center"
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
    },
});

