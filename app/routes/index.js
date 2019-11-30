import React from "react";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Image, View, StyleSheet, Platform, AsyncStorage } from "react-native";
import { Icon, Button, Text } from "native-base";

import styles from "./styles";
import {
  Login,
  LoginWithEmail,
  SignupWithEmail,
  VerifyEmail
} from "../screens/auth";

import {
  CampaignDetail,
  CreateCampaignSuccess,
  CampaignSupport,
  CreateCampaignSetup,
  CreateCampaignDetail,
  CreateCampaignIntro
} from "../screens/campaign";
import {
  CampaignList,
  QuizList,
  QuizCategory,
  CampaignCategory
} from "../screens/home";
import { QuizIntro, QuizResult, Rankings, QuizMode } from "../screens/quiz";
import { Payment } from "../screens/payment";
import {
  Sidebar,
  Earnings,
  MyProfile,
  FreeQuiz,
  GamesWon,
  MyCampaigns,
  SavedCampaigns,
  EndedCampaigns,
  MyQuizes,
  ViewDetails,
  ManageCampaigns,
  CampaignGoals,
  Prize,
  PrizeUpdate,
  Wallet,
  Donations
} from "../screens/menu";

const TabNavigator = createMaterialTopTabNavigator(
  {
    QuizList: QuizList,
    CampaignList: CampaignList
  },
  {
    initialRouteName: "QuizList",
    tabBarOptions: {
      style: styles.tabBarStyle,
      indicatorStyle: styles.tabBarIndicatorStyle
    }
  }
);

const AppNavigator = (signedIn) => {
  return createStackNavigator(
    {
      auth: {
        screen: createStackNavigator({
          login: Login,
          signupWithEmail: SignupWithEmail,
          loginWithEmail: LoginWithEmail,
          verifyEmail: VerifyEmail
        })
      },
      main: {
        screen: createStackNavigator(
          {
            home: {
              screen: TabNavigator,
              navigationOptions: ({ navigation }) => ({
                headerTitle: (
                  <View
                    style={[
                      styles.dFlex,
                      styles.alignItemsCenter,
                      Platform.OS == "android" ? styles.pb0_8 : {}
                    ]}
                  >
                    <Image
                      source={require("../assets/logo.png")}
                      resizeMode="contain"
                      style={styles.headerTitleLogo}
                    />
                  </View>
                ),

                headerLeft: (
                  <Button onPress={() => navigation.openDrawer()} transparent>
                    <Icon name="menu" style={styles.colorWhite} />
                  </Button>
                ),
                headerLeftContainerStyle: styles.pl1,
                headerRight: (
                  <Button transparent>
                    <Icon name="ios-search" style={styles.colorWhite} />
                  </Button>
                ),
                headerRightContainerStyle: styles.pr1,
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.colorWhite
              })
            },
            quizCategory: {
              screen: QuizCategory
            },
            campaignCategory: {
              screen: CampaignCategory
            },


            // screens/quiz
            quizIntro: QuizIntro,
            rankings: Rankings,
            quizMode: QuizMode,
            quizResult: QuizResult,


            // screens/payment
            payment: Payment,


            // screens/campaign
            campaignDetail: CampaignDetail,
            campaignSupport: CampaignSupport,
            createCampaignDetail: CreateCampaignDetail,
            createCampaignIntro: CreateCampaignIntro,
            createCampaignSetup: CreateCampaignSetup,
            createCampaignSuccess: CreateCampaignSuccess,


            // screens/menu
            earnings: Earnings,
            profile: MyProfile,
            freeQuiz: FreeQuiz,
            gamesWon: GamesWon,
            myCampaigns: MyCampaigns,
            savedCampaigns: SavedCampaigns,
            endedCampaigns: EndedCampaigns,
            myQuizes: MyQuizes,
            viewDetails: ViewDetails,
            manageCampaigns: ManageCampaigns,
            campaignGoals: CampaignGoals,
            prize: Prize,
            prizeUpdate: PrizeUpdate,
            wallet: Wallet,
            donations: Donations
          },
        )
      }
    },
    {
      initialRouteName: signedIn ? "main" : "auth",
      headerMode: "none"
    }
  );
}

export const withDrawerNavigator = (signedIn) => {
  console.log(AsyncStorage.getItem("token"))
  return createDrawerNavigator(
    {
      root: AppNavigator(signedIn)
    },
    {
      contentComponent: props => <Sidebar {...props} />,
      drawerLockMode: 'locked-closed'
    }
  )
}
