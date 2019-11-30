// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd5172b18e9f734ae12dfb6
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Button, Form, Label, Input, Item, Picker, Toast } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { profile, countries, profileUpdate } from "../../../actions/profile";
import { Loader } from "../../../components/common";
import DatePicker from 'react-native-datepicker'
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

class MyProfile extends Component {
    static navigationOptions = {
        headerTitle: "My profile",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
        headerRight: <View />
    };

    state = {
        loading: false,
    }

    async componentDidMount() {
        await this.props.getProfile();
        await this.props.countries();
        this.setState({
            firstname: this.props.profile.user.firstname,
            lastname: this.props.profile.user.lastname,
            date_of_birth: this.props.profile.user.profile.date_of_birth,
            city: this.props.profile.user.profile.city,
            country: this.props.profile.user.profile.country,
            gender: this.props.profile.user.profile.gender,
            defaultPic: this.props.profile.defaultPic,
        })
    }

    handleEdit = async () => {
        const { firstname, lastname, gender, date_of_birth, country, city } = this.state;
        if (!firstname || !lastname) {
          return Alert.alert("Name field cannot be empty")
        }
    
        await this.props.profileUpdate({ firstname, lastname, gender, date_of_birth, country, city });
    
        if (this.props.updated) {
          this.props.getProfile();  
          return Toast.show({
            text: "Successfully updated profile",
            type: "success"
          });
        }
    
        // if it hasn't returned, then registration failed
        Toast.show({
          text: "An error occured",
          type: "danger"
        });
      };

    onChange = (name, value) => {
        console.log(value)
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            this.props.loading ? <Loader /> :
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
                    <ScrollView contentContainerStyle={styles.content}>
                        <View>
                            <View style={styles.imageDiv}>
                                <Image
                                    source={this.props.profile.user.profile.media ? {uri: this.props.profile.user.profile.media.url} : require("../../../assets/user.png")}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity style={styles.changeProfilePic}>
                                    <Feather name="camera" size={20} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textDiv}>
                                <Text style={styles.name}>
                                    {this.state.firstname} {this.state.lastname}
                                </Text>
                                <Button style={styles.btn} light onPress={this.handleEdit}>
                                    <Image
                                        source={require('../../../assets/pencil.png')}
                                        style={styles.pencil}
                                        resizeMode="cover"
                                    />
                                    <Text style={styles.btnText}>Edit Profile</Text>
                                </Button>
                            </View>
                            <Form style={styles.form}>
                                <View style={styles.inlineForm}>
                                    <Item style={styles.input} floatingLabel>
                                        <Label>First Name</Label>
                                        <Input value={this.state.firstname} onChangeText={(text) => this.onChange("firstname", text)} />
                                    </Item>
                                    <Item style={styles.input} floatingLabel>
                                        <Label>Last Name</Label>
                                        <Input value={this.state.lastname} onChangeText={(text) => this.onChange("lastname", text)} />
                                    </Item>
                                </View>
                                <View style={styles.inlineForm}>
                                    <Item style={styles.container}>
                                        <Picker
                                            mode="dropdown"
                                            // disabled={true}
                                            style={{ width: "45%", borderBottomColor: COLORS.textRed, padding: 0, margin: 0 }}
                                            placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                                            textStyle={{ maxWidth: "100%", fontSize: 14 }}
                                            selectedValue={this.state.gender}
                                            onValueChange={(value) => this.onChange("gender", value)}
                                        >
                                            <Picker.Item label={"Gender"} />
                                            <Picker.Item label={"Male"} value={"Male"} />
                                            <Picker.Item label={"Female"} value={"Female"} />
                                        </Picker>
                                    </Item>
                                    <DatePicker
                                        style={{ width: '40%', marginTop: 10, borderBottomWidth: 1 }}
                                        date={this.state.date_of_birth}
                                        showIcon={false}
                                        mode="date"
                                        placeholder="Birth Date"
                                        format="YYYY-MM-DD"
                                        minDate="1900-01-01"
                                        maxDate="2016-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateInput: {
                                                marginLeft: 0,
                                                borderWidth: 0,
                                            }
                                        }}
                                        onDateChange={(date) => this.onChange("date_of_birth", date)}
                                    />
                                </View>
                                <View style={styles.inlineForm}>
                                    <Item style={styles.container}>
                                        <Picker
                                            mode="dropdown"
                                            disabled={true}
                                            style={{ width: "45%", borderBottomColor: COLORS.textRed, padding: 0, margin: 0 }}
                                            placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                                            textStyle={{ maxWidth: "100%", fontSize: 14 }}
                                            selectedValue={this.state.country}
                                            onValueChange={(value) => this.onChange("country", value)}
                                        >
                                            <Picker.Item label={"Country"} />
                                            {
                                                this.props.allCountries.map((country, i) => (
                                                    <Picker.Item label={country} value={country} key={i} />
                                                ))
                                            }
                                        </Picker>
                                    </Item>
                                    <Item style={styles.input} floatingLabel>
                                        <Label>City</Label>
                                        <Input value={this.state.city} onChangeText={(text) => this.onChange("city", text)} />
                                    </Item>
                                </View>
                            </Form>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(profile()),
    countries: () => dispatch(countries()),
    profileUpdate: (data) => dispatch(profileUpdate(data))
});

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profile: state.profile.profile,
    allCountries: state.profile.countries,
    updated: state.profile.updated
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    imageDiv: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    changeProfilePic: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -25
    },
    icon: {
        color: COLORS.white
    },
    textDiv: {
        marginTop: 15
    },
    name: {
        textAlign: "center",
        fontSize: 24
    },
    btn: {
        backgroundColor: COLORS.iconActive,
        marginTop: 20,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: "center"
    },
    pencil: {
        marginRight: 10
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    },
    form: {
        padding: 30,
        marginBottom: 50,
        alignSelf: "center"
    },
    inlineForm: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    input: {
        width: '40%',
        borderColor: COLORS.iconActive
    },
    container: {
        borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: COLORS.tertiary,
        padding: 0
    }
});

