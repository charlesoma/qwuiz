import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card, CardItem, Body, Icon, Item, Input, Picker, Button, Container, Toast } from 'native-base';
import { connect } from "react-redux";
import { getPrize, createPrize, updatePrize, deletePrize, publishCampaign, campaignActive } from "../../../actions/campaign";
import { Loader } from "../../../components/common";
import { COLORS } from "../../../styles/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

class Prize extends Component {
    static navigationOptions = {
        headerTitle: "Prize Pool",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    state = {
        add: false,
        title: '',
        tier: '',
    }

    async componentDidMount() {
        await this.props.getPrize(this.props.navigation.state.params.id)
        this.setState({
            campaign_id: this.props.navigation.state.params.id
        })
        if (this.props.prize.length === 0) {
            this.setState({
                add: true
            })
        }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleUpdate = (i) => {
        this.props.navigation.navigate("prizeUpdate", { prize: this.props.prize[i] })
    }

    add = () => {
        this.setState({
            add: true
        })
    }

    onValueChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    handleSave = async () => {
        const { title, tier, campaign_id } = this.state;
        if (!title || !tier || !campaign_id) {
            return Alert.alert("Please fill all details")
        }
        console.log({ title, tier: Number(tier) }, campaign_id)

        await this.props.createPrize({ title, tier: Number(tier) }, campaign_id);

        if (this.props.createdPrize) {
            await this.props.getPrize(campaign_id)
            this.setState({
                add: false,
                title: '',
                tier: ''
            })
            return Toast.show({
                text: "Prize created successfully",
                type: "success"
            });


        }

        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    }

    remove = async (id) => {
        const { campaign_id } = this.state;

        console.log(campaign_id, id)

        await this.props.deletePrize(campaign_id, id);

        if (this.props.deletedPrize) {
            await this.props.getPrize(campaign_id)
            if (this.props.prize.length === 0) {
                this.setState({
                    add: true
                })
            }
            return Toast.show({
                text: "Prize deleted successfully",
                type: "success"
            });
        }

        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    }

    publish = async () => {
        const { campaign_id } = this.state;

        console.log(campaign_id)

        await this.props.publishCampaign(campaign_id);

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

    render() {
        return (
            <Container>
                {this.props.loading ? <Loader /> :
                    <ScrollView>
                        {
                            this.props.prize.length > 0 &&
                            this.props.prize.map((item, index) =>
                                <View style={styles.contentFull} key={item.id}>
                                    <TouchableOpacity style={styles.remove} onPress={() => this.remove(item.id)}>
                                        <Text style={styles.removeText}>&times; Remove</Text>
                                    </TouchableOpacity>
                                    <View style={styles.formFull}>
                                        <Text style={styles.label}>Prize Title</Text>
                                        <Item regular style={styles.input}>
                                            <Input
                                                placeholder='Enter title'
                                                placeholderTextColor={COLORS.placeholder}
                                                value={item.title}
                                            />
                                        </Item>
                                        <Text style={styles.label}>What tier does this prize belong to?</Text>
                                        <Item regular style={styles.input}>
                                            <Input
                                                placeholder='Enter title'
                                                placeholderTextColor={COLORS.placeholder}
                                                value={item.tier}
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
                                            onPress={() => this.handleUpdate(index)}
                                            style={styles.btn}
                                            light
                                        >
                                            <Text style={styles.btnText}>Update prize</Text>
                                        </Button>
                                    </View>
                                </View>
                            )
                        }
                        {
                            this.state.add === true ?
                                <View style={styles.contentEmpty}>
                                    <View>
                                        <Text style={styles.topText}>An organisation posting a campaign on our platform will be given an option to chose between three ratio structures of distribution of the total funds raised.</Text>
                                    </View>
                                    <View style={styles.formEmpty}>
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
                                        <Item style={styles.pickerContainer} picker>
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
                                                selectedValue={this.state.tier}
                                                onValueChange={(value) => this.onValueChange('tier', value)}
                                            >
                                                <Picker.Item label="Please select" value="0" />
                                                <Picker.Item label="1" value="1" />
                                                <Picker.Item label="2" value="2" />
                                                <Picker.Item label="3" value="3" />
                                                <Picker.Item label="4" value="4" />
                                                <Picker.Item label="5" value="5" />
                                            </Picker>
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
                                            onPress={() => this.handleSave()}
                                            style={styles.btn}
                                            light
                                        >
                                            <Text style={styles.btnText}>Save</Text>
                                        </Button>
                                    </View>
                                </View>
                                :
                                <View style={styles.contentFull}>
                                    <Button
                                        onPress={this.add}
                                        style={styles.btnAdd}
                                        light
                                    >
                                        <Text style={styles.btnText}>Add a prize</Text>
                                    </Button>
                                </View>
                        }
                        <View style={styles.contentFull}>
                            <Button
                                onPress={() => this.publish()}
                                style={styles.btnAdd}
                                light
                            >
                                <Text style={styles.btnText}>Publish</Text>
                            </Button>
                        </View>
                    </ScrollView>
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPrize: (id) => dispatch(getPrize(id)),
    getActive: () => dispatch(campaignActive()),
    createPrize: (data, id) => dispatch(createPrize(data, id)),
    updatePrize: (data, campaign_id, prize_id) => dispatch(updatePrize(data, campaign_id, prize_id)),
    deletePrize: (campaign_id, prize_id) => dispatch(deletePrize(campaign_id, prize_id)),
    publishCampaign: (id) => dispatch(publishCampaign(id))
});

const mapStateToProps = state => ({
    loading: state.campaign.loading,
    prize: state.campaign.prize,
    createdPrize: state.campaign.createdPrize,
    updatedPrize: state.campaign.updatedPrize,
    deletedPrize: state.campaign.deletedPrize,
    published: state.campaign.published,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prize);

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
    btnAdd: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: '100%',
        // marginTop: 30,
        justifyContent: "center"
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
    },
    remove: {
        position: "absolute",
        top: 15,
        right: 20
    },
    removeText: {
        color: COLORS.textGrey
    }
});

