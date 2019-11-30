import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card, CardItem, Body, Icon, Item, Input, Picker, Button, Container, Toast } from 'native-base';
import { connect } from "react-redux";
import { getPrize, createPrize, updatePrize, deletePrize } from "../../../actions/campaign";
import { Loader } from "../../../components/common";
import { COLORS } from "../../../styles/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

class PrizeUpdate extends Component {
    static navigationOptions = {
        headerTitle: "Prize Update",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    async componentDidMount() {
        console.log(this.props.navigation.state.params.prize)
        this.setState({
            title: this.props.navigation.state.params.prize.title,
            tier: this.props.navigation.state.params.prize.tier,
            prize_id: this.props.navigation.state.params.prize.id,
            campaign_id: this.props.navigation.state.params.prize.campaign_id
        })
    }

    state = { selected: "" };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleUpdate = async () => {
        const { title, tier, prize_id, campaign_id } = this.state;
        if (!title || !tier || !prize_id || !campaign_id) {
            return Alert.alert("Please fill all details")
        }
        console.log({ title, tier: Number(tier) }, campaign_id, prize_id)

        await this.props.updatePrize({ title, tier: Number(tier) }, campaign_id, prize_id);

        if (this.props.updatedPrize) {
            await this.props.getPrize(campaign_id)
            this.props.navigation.navigate("prize")
            return Toast.show({
                text: "Prize update successful",
                type: "success"
            });


        }

        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    }

    render() {
        return (
            <Container>
                {this.props.loading ? <Loader /> :
                    <ScrollView>
                        <View style={styles.contentFull}>
                            <View style={styles.formFull}>
                                <Text style={styles.label}>Prize Title</Text>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Enter title'
                                        placeholderTextColor={COLORS.placeholder}
                                        value={this.state.title}
                                        onChangeText={text => this.handleChange("title", text)}
                                    />
                                </Item>
                                <Text style={styles.label}>What tier does this prize belong to?</Text>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Enter title'
                                        placeholderTextColor={COLORS.placeholder}
                                        value={this.state.tier}
                                        onChangeText={text => this.handleChange("tier", text)}
                                    />
                                </Item>
                                <View style={styles.addMedia}>
                                    <TouchableOpacity style={styles.cameraDiv}>
                                        <Image
                                            source={require("../../../assets/camera.png")}
                                            style={styles.camera}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Button                                    
                                    onPress={() => this.handleUpdate()}
                                    style={styles.btn}
                                    light
                                >
                                    <Text style={styles.btnText}>Update</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPrize: (id) => dispatch(getPrize(id)),
    createPrize: (data, id) => dispatch(createPrize(data, id)),
    updatePrize: (data, campaign_id, prize_id) => dispatch(updatePrize(data, campaign_id, prize_id)),
    deletePrize: (campaign_id, prize_id) => dispatch(deletePrize(campaign_id, prize_id)),
});

const mapStateToProps = state => ({
    loading: state.campaign.loading,
    prize: state.campaign.prize,
    createdPrize: state.campaign.createdPrize,
    updatedPrize: state.campaign.updatedPrize,
    deletedPrize: state.campaign.deletedPrize
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrizeUpdate);

const styles = StyleSheet.create({
    contentEmpty: {
        alignItems: 'center',
        padding: 40
    },
    contentFull: {
        alignItems: 'center',
        padding: 40,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.greyBg
    },
    topText: {
        color: COLORS.textNormal
    },
    formEmpty: {
        marginTop: 40,
        width: '100%'
    },
    formFull: {
        // marginTop: 0,
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
    addMedia: {
        marginTop: 30
    },
    cameraDiv: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.greyBg,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 30,
        alignSelf: "center"
    },
    camera: {
        width: 100,
        height: 100
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

