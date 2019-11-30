import axios from 'axios'
import { AsyncStorage } from 'react-native'

import {
  GET_CAMPAIGN_TYPE_ACTION_TYPES,
  GET_CAMPAIGN_CATEGORIES_ACTION_TYPES,
  GET_CAMPAIGN_STRATEGY_ACTION_TYPES,
  CAMPAIGN_CREATE_ACTION_TYPES,
  GET_CAMPAIGN_ACTIVE_ACTION_TYPES,
  GET_CAMPAIGN_ACTIVE_MORE_ACTION_TYPES,
  GET_CAMPAIGN_GOAL_ACTION_TYPES,
  CREATE_CAMPAIGN_GOAL_ACTION_TYPES,
  GET_CAMPAIGN_PRIZE_ACTION_TYPES,
  CREATE_CAMPAIGN_PRIZE_ACTION_TYPES,
  UPDATE_CAMPAIGN_PRIZE_ACTION_TYPES,
  DELETE_CAMPAIGN_PRIZE_ACTION_TYPES,
  PUBLISH_CAMPAIGN_ACTION_TYPES,
  GET_CAMPAIGN_ACTION_TYPES,
  SAVE_CAMPAIGN_ACTION_TYPES,
  DONATION_ACTION_TYPES,
  GET_SAVED_ACTION_TYPES,
  GET_SAVED_MORE_ACTION_TYPES,
  GET_ENDED_ACTION_TYPES,
  GET_ENDED_MORE_ACTION_TYPES,
  GET_DONATIONS_ACTION_TYPES,
  GET_DONATIONS_MORE_ACTION_TYPES
} from "./actionTypes";

const {
  GET_CAMPAIGN_TYPE_REQUEST,
  GET_CAMPAIGN_TYPE_FULFILLED,
  GET_CAMPAIGN_TYPE_REJECTED
} = GET_CAMPAIGN_TYPE_ACTION_TYPES;
const {
  GET_CAMPAIGN_CATEGORIES_REQUEST,
  GET_CAMPAIGN_CATEGORIES_FULFILLED,
  GET_CAMPAIGN_CATEGORIES_REJECTED
} = GET_CAMPAIGN_CATEGORIES_ACTION_TYPES;
const {
  GET_CAMPAIGN_STRATEGY_REQUEST,
  GET_CAMPAIGN_STRATEGY_FULFILLED,
  GET_CAMPAIGN_STRATEGY_REJECTED
} = GET_CAMPAIGN_STRATEGY_ACTION_TYPES;
const {
  CAMPAIGN_CREATE_REQUEST,
  CAMPAIGN_CREATE_FULFILLED,
  CAMPAIGN_CREATE_REJECTED
} = CAMPAIGN_CREATE_ACTION_TYPES;
const {
  GET_CAMPAIGN_ACTIVE_REQUEST,
  GET_CAMPAIGN_ACTIVE_FULFILLED,
  GET_CAMPAIGN_ACTIVE_REJECTED
} = GET_CAMPAIGN_ACTIVE_ACTION_TYPES;
const {
  GET_CAMPAIGN_ACTIVE_MORE_REQUEST,
  GET_CAMPAIGN_ACTIVE_MORE_FULFILLED,
  GET_CAMPAIGN_ACTIVE_MORE_REJECTED
} = GET_CAMPAIGN_ACTIVE_MORE_ACTION_TYPES;
const {
  GET_CAMPAIGN_GOAL_REQUEST,
  GET_CAMPAIGN_GOAL_FULFILLED,
  GET_CAMPAIGN_GOAL_REJECTED
} = GET_CAMPAIGN_GOAL_ACTION_TYPES;
const {
  CREATE_CAMPAIGN_GOAL_REQUEST,
  CREATE_CAMPAIGN_GOAL_FULFILLED,
  CREATE_CAMPAIGN_GOAL_REJECTED
} = CREATE_CAMPAIGN_GOAL_ACTION_TYPES;
const {
  GET_CAMPAIGN_PRIZE_REQUEST,
  GET_CAMPAIGN_PRIZE_FULFILLED,
  GET_CAMPAIGN_PRIZE_REJECTED
} = GET_CAMPAIGN_PRIZE_ACTION_TYPES;
const {
  CREATE_CAMPAIGN_PRIZE_REQUEST,
  CREATE_CAMPAIGN_PRIZE_FULFILLED,
  CREATE_CAMPAIGN_PRIZE_REJECTED
} = CREATE_CAMPAIGN_PRIZE_ACTION_TYPES;
const {
  UPDATE_CAMPAIGN_PRIZE_REQUEST,
  UPDATE_CAMPAIGN_PRIZE_FULFILLED,
  UPDATE_CAMPAIGN_PRIZE_REJECTED
} = UPDATE_CAMPAIGN_PRIZE_ACTION_TYPES;
const {
  DELETE_CAMPAIGN_PRIZE_REQUEST,
  DELETE_CAMPAIGN_PRIZE_FULFILLED,
  DELETE_CAMPAIGN_PRIZE_REJECTED
} = DELETE_CAMPAIGN_PRIZE_ACTION_TYPES;
const {
  PUBLISH_CAMPAIGN_REQUEST,
  PUBLISH_CAMPAIGN_FULFILLED,
  PUBLISH_CAMPAIGN_REJECTED
} = PUBLISH_CAMPAIGN_ACTION_TYPES;
const {
  GET_CAMPAIGN_REQUEST,
  GET_CAMPAIGN_FULFILLED,
  GET_CAMPAIGN_REJECTED
} = GET_CAMPAIGN_ACTION_TYPES;
const {
  SAVE_CAMPAIGN_REQUEST,
  SAVE_CAMPAIGN_FULFILLED,
  SAVE_CAMPAIGN_REJECTED
} = SAVE_CAMPAIGN_ACTION_TYPES;
const {
  DONATION_REQUEST,
  DONATION_FULFILLED,
  DONATION_REJECTED
} = DONATION_ACTION_TYPES;
const {
  GET_SAVED_REQUEST,
  GET_SAVED_FULFILLED,
  GET_SAVED_REJECTED
} = GET_SAVED_ACTION_TYPES;
const {
  GET_SAVED_MORE_REQUEST,
  GET_SAVED_MORE_FULFILLED,
  GET_SAVED_MORE_REJECTED
} = GET_SAVED_MORE_ACTION_TYPES;
const {
  GET_ENDED_REQUEST,
  GET_ENDED_FULFILLED,
  GET_ENDED_REJECTED
} = GET_ENDED_ACTION_TYPES;
const {
  GET_ENDED_MORE_REQUEST,
  GET_ENDED_MORE_FULFILLED,
  GET_ENDED_MORE_REJECTED
} = GET_ENDED_MORE_ACTION_TYPES;
const {
  GET_DONATIONS_REQUEST,
  GET_DONATIONS_FULFILLED,
  GET_DONATIONS_REJECTED
} = GET_DONATIONS_ACTION_TYPES;
const {
  GET_DONATIONS_MORE_REQUEST,
  GET_DONATIONS_MORE_FULFILLED,
  GET_DONATIONS_MORE_REJECTED
} = GET_DONATIONS_MORE_ACTION_TYPES;
const BASE_URL = "https://immense-badlands-40083.herokuapp.com";

// THUNKS
const campaignType = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignTypeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/type`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { types } = response.data;
      console.log("types ==> ", types);
      dispatch(fetchCampaignTypeFulfilled(types));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignTypeRejected());
    }
  };
};

const campaignCategories = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignCategoriesRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/category`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { categories } = response.data;
      console.log("categories ==> ", categories);
      dispatch(fetchCampaignCategoriesFulfilled(categories));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignCategoriesRejected());
    }
  };
};

const campaignStrategy = data => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignStrategyRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/campaign/strategy/${data}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const strategy = response.data.strategies;
      console.log("strategy ==> ", strategy);
      dispatch(fetchCampaignStrategyFulfilled(strategy));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignStrategyRejected());
    }
  };
};

const campaignCreate = data => {
  return async (dispatch, getState) => {
    dispatch(campaignCreateRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/campaign`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("campaign created ==>", response)
      return dispatch(campaignCreateFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(campaignCreateRejected());
    }
  };
};

const campaignActive = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignActiveRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/manage-campaign`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // const active = response.data.data.campaigns.data;
      const active = response.data.data.campaigns;
      console.log("active ==> ", active);
      dispatch(fetchCampaignActiveFulfilled(active));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignActiveRejected());
    }
  };
};

const campaignActiveMore = (page) => {
  console.log(page)
  return async (dispatch, getState) => {
    dispatch(fetchCampaignActiveMoreRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/manage-campaign?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // const active = response.data.data.campaigns.data;
      const active = response.data.data.campaigns;
      console.log("active ==> ", active);
      dispatch(fetchCampaignActiveMoreFulfilled(active));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignActiveMoreRejected());
    }
  };
};

const getGoal = id => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignGoalRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/${id}/goals`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const goal = response.data.data;
      console.log("goal ==> ", goal);
      dispatch(fetchCampaignGoalFulfilled(goal));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignGoalRejected());
    }
  };
};

const createGoal = (data, id) => {
  return async (dispatch, getState) => {
    dispatch(createGoalRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/campaign/${id}/goals`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("created goal ==>", response)
      return dispatch(createGoalFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(createGoalRejected());
    }
  };
};

const getPrize = id => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignPrizeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/${id}/prize`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const prize = response.data.data.campaign.prize;
      console.log("prize ==> ", prize);
      dispatch(fetchCampaignPrizeFulfilled(prize));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignPrizeRejected());
    }
  };
};

const createPrize = (data, id) => {
  return async (dispatch, getState) => {
    dispatch(createPrizeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/campaign/${id}/prize`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("stored prize ==>", response)
      return dispatch(createPrizeFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(createPrizeRejected());
    }
  };
};

const updatePrize = (data, campaign_id, prize_id) => {
  return async (dispatch, getState) => {
    dispatch(updatePrizeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/campaign/${campaign_id}/prize/${prize_id}`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("updated prize ==>", response)
      return dispatch(updatePrizeFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(updatePrizeRejected());
    }
  };
};

const deletePrize = ( campaign_id, prize_id) => {
  return async (dispatch, getState) => {
    dispatch(deletePrizeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/campaign/${campaign_id}/prize/${prize_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("deleted prize ==>", response)
      return dispatch(deletePrizeFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(deletePrizeRejected());
    }
  };
};

const publishCampaign = id => {
  console.log(id)
  return async (dispatch, getState) => {
    dispatch(publishCampaignRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(`${BASE_URL}/api/campaign/${id}/publish`)
      const response = await axios.put(
        `${BASE_URL}/api/campaign/${id}/publish`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("published ==>", response)
      return dispatch(publishCampaignFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(publishCampaignRejected());
    }
  };
};

const allCampaign = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCampaignRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/scope/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const campaign = response.data.campaigns;
      console.log("all campaign ==> ", campaign);
      dispatch(fetchCampaignFulfilled(campaign));
    } catch (e) {
      console.log(e);
      dispatch(fetchCampaignRejected());
    }
  };
};

const saveCampaign = (id) => {
  return async (dispatch, getState) => {
    dispatch(saveCampaignRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/campaign/${id}/save`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("saved ==>", response)
      return dispatch(saveCampaignFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(saveCampaignRejected());
    }
  };
};

const getDonations = () => {
  return async (dispatch, getState) => {
    dispatch(fetchDonationsRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/donations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const donations = response;
      console.log("donations ==> ", donations);
      dispatch(fetchDonationsFulfilled(donations));
    } catch (e) {
      console.log(e);
      dispatch(fetchDonationsRejected());
    }
  };
};

const getDonationsMore = (page) => {
  console.log(page)
  return async (dispatch, getState) => {
    dispatch(fetchDonationsMoreRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/donations?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // const active = response.data.data.campaigns.data;
      const donations = response.data.data.campaigns;
      console.log("saved ==> ", donations);
      dispatch(fetchDonationsMoreFulfilled(donations));
    } catch (e) {
      console.log(e);
      dispatch(fetchDonationsMoreRejected());
    }
  };
};

const getSaved = () => {
  return async (dispatch, getState) => {
    dispatch(fetchSavedRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/saved`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const saved = response;
      console.log("saved ==> ", saved);
      dispatch(fetchSavedFulfilled(saved));
    } catch (e) {
      console.log(e);
      dispatch(fetchSavedRejected());
    }
  };
};

const getSavedMore = (page) => {
  console.log(page)
  return async (dispatch, getState) => {
    dispatch(fetchSavedMoreRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/saved?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // const active = response.data.data.campaigns.data;
      const saved = response.data.data.campaigns;
      console.log("saved ==> ", saved);
      dispatch(fetchSavedMoreFulfilled(saved));
    } catch (e) {
      console.log(e);
      dispatch(fetchSavedMoreRejected());
    }
  };
};

const getEnded = () => {
  return async (dispatch, getState) => {
    dispatch(fetchEndedRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/ended`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const ended = response;
      console.log("ended ==> ", ended);
      dispatch(fetchEndedFulfilled(ended));
    } catch (e) {
      console.log(e);
      dispatch(fetchEndedRejected());
    }
  };
};

const getEndedMore = (page) => {
  console.log(page)
  return async (dispatch, getState) => {
    dispatch(fetchEndedMoreRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/campaign/ended?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // const active = response.data.data.campaigns.data;
      const ended = response.data.data.campaigns;
      console.log("ended ==> ", ended);
      dispatch(fetchEndedMoreFulfilled(ended));
    } catch (e) {
      console.log(e);
      dispatch(fetchEndedMoreRejected());
    }
  };
};

const donate = (data, id) => {
  return async (dispatch, getState) => {
    dispatch(donationRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/campaign/${id}/donate`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const donation = response.data;
      console.log("donation ==>", donation)
      return dispatch(donationFulfilled(donation));
    } catch (e) {
      console.log(e);
      dispatch(donationRejected());
    }
  };
};

// ACTION CREATORS

const fetchCampaignCategoriesRequest = data => ({
  type: GET_CAMPAIGN_CATEGORIES_REQUEST
});

const fetchCampaignCategoriesFulfilled = categories => ({
  type: GET_CAMPAIGN_CATEGORIES_FULFILLED,
  payload: categories
});

const fetchCampaignCategoriesRejected = () => ({
  type: GET_CAMPAIGN_CATEGORIES_REJECTED
});

const fetchCampaignTypeRequest = () => ({
  type: GET_CAMPAIGN_TYPE_REQUEST
});

const fetchCampaignTypeFulfilled = types => ({
  type: GET_CAMPAIGN_TYPE_FULFILLED,
  payload: types
});

const fetchCampaignTypeRejected = () => ({
  type: GET_CAMPAIGN_TYPE_REJECTED
});

const fetchCampaignStrategyRequest = () => ({
  type: GET_CAMPAIGN_STRATEGY_REQUEST
});

const fetchCampaignStrategyFulfilled = strategy => ({
  type: GET_CAMPAIGN_STRATEGY_FULFILLED,
  payload: strategy
});

const fetchCampaignStrategyRejected = () => ({
  type: GET_CAMPAIGN_STRATEGY_REJECTED
});

const campaignCreateRequest = () => ({
  type: CAMPAIGN_CREATE_REQUEST
});

const campaignCreateFulfilled = () => ({
  type: CAMPAIGN_CREATE_FULFILLED
});

const campaignCreateRejected = () => ({
  type: CAMPAIGN_CREATE_REJECTED
});

const fetchCampaignActiveRequest = () => ({
  type: GET_CAMPAIGN_ACTIVE_REQUEST
})

const fetchCampaignActiveFulfilled = active => ({
  type: GET_CAMPAIGN_ACTIVE_FULFILLED,
  payload: active
})

const fetchCampaignActiveRejected = () => ({
  type: GET_CAMPAIGN_ACTIVE_REJECTED
})

const fetchCampaignActiveMoreRequest = () => ({
  type: GET_CAMPAIGN_ACTIVE_MORE_REQUEST
})

const fetchCampaignActiveMoreFulfilled = active => ({
  type: GET_CAMPAIGN_ACTIVE_MORE_FULFILLED,
  payload: active
})

const fetchCampaignActiveMoreRejected = () => ({
  type: GET_CAMPAIGN_ACTIVE_MORE_REJECTED
})

const fetchCampaignGoalRequest = () => ({
  type: GET_CAMPAIGN_GOAL_REQUEST
})

const fetchCampaignGoalFulfilled = goal => ({
  type: GET_CAMPAIGN_GOAL_FULFILLED,
  payload: goal
})

const fetchCampaignGoalRejected = () => ({
  type: GET_CAMPAIGN_GOAL_REJECTED
})

const createGoalRequest = () => ({
  type: CREATE_CAMPAIGN_GOAL_REQUEST
})

const createGoalFulfilled = () => ({
  type: CREATE_CAMPAIGN_GOAL_FULFILLED,
})

const createGoalRejected = () => ({
  type: CREATE_CAMPAIGN_GOAL_REJECTED
})

const fetchCampaignPrizeRequest = () => ({
  type: GET_CAMPAIGN_PRIZE_REQUEST
})

const fetchCampaignPrizeFulfilled = prize => ({
  type: GET_CAMPAIGN_PRIZE_FULFILLED,
  payload: prize
})

const fetchCampaignPrizeRejected = () => ({
  type: GET_CAMPAIGN_PRIZE_REJECTED
})

const createPrizeRequest = () => ({
  type: CREATE_CAMPAIGN_PRIZE_REQUEST
})

const createPrizeFulfilled = () => ({
  type: CREATE_CAMPAIGN_PRIZE_FULFILLED
})

const createPrizeRejected = () => ({
  type: CREATE_CAMPAIGN_PRIZE_REJECTED
})

const updatePrizeRequest = () => ({
  type: UPDATE_CAMPAIGN_PRIZE_REQUEST
})

const updatePrizeFulfilled = () => ({
  type: UPDATE_CAMPAIGN_PRIZE_FULFILLED
})

const updatePrizeRejected = () => ({
  type: UPDATE_CAMPAIGN_PRIZE_REJECTED
})

const deletePrizeRequest = () => ({
  type: DELETE_CAMPAIGN_PRIZE_REQUEST
})

const deletePrizeFulfilled = () => ({
  type: DELETE_CAMPAIGN_PRIZE_FULFILLED
})

const deletePrizeRejected = () => ({
  type: DELETE_CAMPAIGN_PRIZE_REJECTED
})

const publishCampaignRequest = () => ({
  type: PUBLISH_CAMPAIGN_REQUEST
})

const publishCampaignFulfilled = () => ({
  type: PUBLISH_CAMPAIGN_FULFILLED
})

const publishCampaignRejected = () => ({
  type: PUBLISH_CAMPAIGN_REJECTED
})

const fetchCampaignRequest = () => ({
  type: GET_CAMPAIGN_REQUEST
})

const fetchCampaignFulfilled = (campaign) => ({
  type: GET_CAMPAIGN_FULFILLED,
  payload: campaign
})

const fetchCampaignRejected = () => ({
  type: GET_CAMPAIGN_REJECTED
})

const saveCampaignRequest = () => ({
  type: SAVE_CAMPAIGN_REQUEST
})

const saveCampaignFulfilled = () => ({
  type: SAVE_CAMPAIGN_FULFILLED
})

const saveCampaignRejected = () => ({
  type: SAVE_CAMPAIGN_REJECTED
})

const donationRequest = () => ({
  type: DONATION_REQUEST
})

const donationFulfilled = (donation) => ({
  type: DONATION_FULFILLED,
  payload: donation
})

const donationRejected = () => ({
  type: DONATION_REJECTED
})

const fetchSavedRequest = () => ({
  type: GET_SAVED_REQUEST
})

const fetchSavedFulfilled = (saved) => ({
  type: GET_SAVED_FULFILLED,
  payload: saved
})

const fetchSavedRejected = () => ({
  type: GET_SAVED_REJECTED
})

const fetchEndedRequest = () => ({
  type: GET_ENDED_REQUEST
})

const fetchEndedFulfilled = (ended) => ({
  type: GET_ENDED_FULFILLED,
  payload: ended
})

const fetchEndedRejected = () => ({
  type: GET_ENDED_REJECTED
})

const fetchEndedMoreRequest = () => ({
  type: GET_ENDED_MORE_REQUEST
})

const fetchEndedMoreFulfilled = (ended) => ({
  type: GET_ENDED_MORE_FULFILLED,
  payload: ended
})

const fetchEndedMoreRejected = () => ({
  type: GET_ENDED_MORE_REJECTED
})

const fetchDonationsRequest = () => ({
  type: GET_DONATIONS_REQUEST
})

const fetchDonationsFulfilled = (donations) => ({
  type: GET_DONATIONS_FULFILLED,
  payload: donations
})

const fetchDonationsRejected = () => ({
  type: GET_DONATIONS_REJECTED
})

const fetchDonationsMoreRequest = () => ({
  type: GET_DONATIONS_MORE_REQUEST
})

const fetchDonationsMoreFulfilled = (donations) => ({
  type: GET_DONATIONS_MORE_FULFILLED,
  payload: donations
})

const fetchDonationsMoreRejected = () => ({
  type: GET_DONATIONS_MORE_REJECTED
})

const fetchSavedMoreRequest = () => ({
  type: GET_SAVED_MORE_REQUEST
})

const fetchSavedMoreFulfilled = (saved) => ({
  type: GET_SAVED_MORE_FULFILLED,
  payload: saved
})

const fetchSavedMoreRejected = () => ({
  type: GET_SAVED_MORE_REJECTED
})

export { 
  campaignType,
  campaignCategories,
  campaignStrategy,
  campaignCreate,
  campaignActive,
  campaignActiveMore,
  getGoal,
  createGoal,
  getPrize,
  createPrize,
  updatePrize,
  deletePrize,
  publishCampaign,
  allCampaign,
  saveCampaign,
  donate,
  getSaved,
  getSavedMore,
  getEnded,
  getEndedMore,
  getDonations,
  getDonationsMore
}