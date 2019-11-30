import { COLORS } from "../styles/colors";

const styles = {
  pl2: {
    paddingLeft: 16
  },
  pr2: {
    paddingRight: 16
  },
  pl1: {
    paddingRight: 8
  },
  pr1: {
    paddingRight: 8
  },
  pb0_8: {
    paddingBottom: 0.8
  },
  headerStyle: {
    backgroundColor: COLORS.primary,
    borderBottomWidth: 0,
    elevation: 0
  },
  colorWhite: {
    color: COLORS.white
  },
  headerTitleLogo: {
    height: 40,
    width: 80
  },
  dFlex: {
    display: "flex"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  tabBarStyle: {
    backgroundColor: COLORS.primary,
    elevation: 3,
    shadowRadius: 10,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: COLORS.white,
    height: 6
  },
  //   campaign
  campaignHeaderStyle: {
    backgroundColor: COLORS.tertiary
  }
};


export default styles;