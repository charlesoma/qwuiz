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
} from '../actions/actionTypes'

const {
    GET_CAMPAIGN_TYPE_FULFILLED,
    GET_CAMPAIGN_TYPE_REJECTED
} = GET_CAMPAIGN_TYPE_ACTION_TYPES
const {
    GET_CAMPAIGN_CATEGORIES_FULFILLED,
    GET_CAMPAIGN_CATEGORIES_REJECTED
} = GET_CAMPAIGN_CATEGORIES_ACTION_TYPES
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
const initialState = {
    loading: false,
    created: false,
    createdGoal: false,
    types: [{ name: "Loading...", id: 1 }],
    categories: [{ name: "Loading...", id: 1 }],
    strategy: [{ name: "Loading...", id: 1 }],
    active: [],
    activeMore: [],
    loaded: false,
    goal: [],
    prize: [],
    createdPrize: false,
    updatedPrize: false,
    deletedPrize: false,
    published: false,
    campaign: [],
    saved: false,
    savedArr: [],
    savedMore: [],
    ended: [],
    endedMore: [],
    donated: false,
    donation: [],
    donations: [],
    donationsMore: []
}

const campaignReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CAMPAIGN_TYPE_FULFILLED:
            return {
                ...state,
                types: action.payload
            }

        case GET_CAMPAIGN_TYPE_REJECTED:
            return {
                ...state,
                types: [{ name: "Error occured", id: 1 }]
            }

        case GET_CAMPAIGN_CATEGORIES_FULFILLED:
            return {
                ...state,
                categories: action.payload
            }

        case GET_CAMPAIGN_CATEGORIES_REJECTED:
            return {
                ...state,
                categories: [{ name: "Error occured", id: 1 }]
            }

        case GET_CAMPAIGN_STRATEGY_FULFILLED:
            return {
                ...state,
                strategy: action.payload
            }

        case GET_CAMPAIGN_STRATEGY_REJECTED:
            return {
                ...state,
                strategy: [{ name: "Error occured", id: 1 }]
            }

        case CAMPAIGN_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CAMPAIGN_CREATE_FULFILLED:
            return {
                ...state,
                loading: false,
                created: true
            }

        case CAMPAIGN_CREATE_REJECTED:
            return {
                ...state,
                loading: false,
                created: false
            }

        case GET_CAMPAIGN_ACTIVE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CAMPAIGN_ACTIVE_FULFILLED:
            return {
                ...state,
                loading: false,
                active: action.payload
            }

        case GET_CAMPAIGN_ACTIVE_REJECTED:
            return {
                ...state,
                loading: false,
                active: []
            }

        case GET_CAMPAIGN_ACTIVE_MORE_REQUEST:
            return {
                ...state,
                loading: false
            }

        case GET_CAMPAIGN_ACTIVE_MORE_FULFILLED:
            return {
                ...state,
                loading: false,
                activeMore: action.payload.data,
                loaded: true
            }

        case GET_CAMPAIGN_ACTIVE_MORE_REJECTED:
            return {
                ...state,
                loading: false,
                loaded: false
            }

        case GET_CAMPAIGN_GOAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CAMPAIGN_GOAL_FULFILLED:
            return {
                ...state,
                loading: false,
                goal: action.payload
            }

        case GET_CAMPAIGN_GOAL_REJECTED:
            return {
                ...state,
                loading: false,
                goal: []
            }

        case CREATE_CAMPAIGN_GOAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_CAMPAIGN_GOAL_FULFILLED:
            return {
                ...state,
                loading: false,
                createdGoal: true
            }

        case CREATE_CAMPAIGN_GOAL_REJECTED:
            return {
                ...state,
                loading: false,
                createdGoal: false
            }

        case GET_CAMPAIGN_PRIZE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CAMPAIGN_PRIZE_FULFILLED:
            return {
                ...state,
                loading: false,
                prize: action.payload
            }

        case GET_CAMPAIGN_PRIZE_REJECTED:
            return {
                ...state,
                loading: false,
                prize: []
            }

        case CREATE_CAMPAIGN_PRIZE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_CAMPAIGN_PRIZE_FULFILLED:
            return {
                ...state,
                loading: false,
                createdPrize: true
            }

        case CREATE_CAMPAIGN_PRIZE_REJECTED:
            return {
                ...state,
                loading: false,
                createdPrize: false
            }

        case UPDATE_CAMPAIGN_PRIZE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_CAMPAIGN_PRIZE_FULFILLED:
            return {
                ...state,
                loading: false,
                updatedPrize: true
            }

        case UPDATE_CAMPAIGN_PRIZE_REJECTED:
            return {
                ...state,
                loading: false,
                updatedPrize: false
            }

        case DELETE_CAMPAIGN_PRIZE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_CAMPAIGN_PRIZE_FULFILLED:
            return {
                ...state,
                loading: false,
                deletedPrize: true
            }

        case DELETE_CAMPAIGN_PRIZE_REJECTED:
            return {
                ...state,
                loading: false,
                deletedPrize: false
            }

        case PUBLISH_CAMPAIGN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PUBLISH_CAMPAIGN_FULFILLED:
            return {
                ...state,
                loading: false,
                published: true
            }

        case PUBLISH_CAMPAIGN_REJECTED:
            return {
                ...state,
                loading: false,
                published: false
            }

        case GET_CAMPAIGN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CAMPAIGN_FULFILLED:
            return {
                ...state,
                loading: false,
                campaign: action.payload
            }

        case GET_CAMPAIGN_REJECTED:
            return {
                ...state,
                loading: false,
                campaign: []
            }

        case SAVE_CAMPAIGN_FULFILLED:
            return {
                ...state,
                loading: false,
                saved: true
            }

        case SAVE_CAMPAIGN_REJECTED:
            return {
                ...state,
                loading: false,
                saved: false
            }

        case DONATION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DONATION_FULFILLED:
            return {
                ...state,
                loading: false,
                donated: true,
                donation: action.payload
            }

        case DONATION_REJECTED:
            return {
                ...state,
                loading: false,
                donated: false,
                donation: []
            }

        case GET_SAVED_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_SAVED_FULFILLED:
            return {
                ...state,
                loading: false,
                savedArr: action.payload
            }

        case GET_SAVED_REJECTED:
            return {
                ...state,
                loading: false,
                savedArr: []
            }

        case GET_SAVED_MORE_REQUEST:
            return {
                ...state,
                loading: false
            }

        case GET_SAVED_MORE_FULFILLED:
            return {
                ...state,
                loading: false,
                savedMore: action.payload.data,
                loaded: true
            }

        case GET_SAVED_MORE_REJECTED:
            return {
                ...state,
                loading: false,
                loaded: false
            }

        case GET_ENDED_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ENDED_FULFILLED:
            return {
                ...state,
                loading: false,
                ended: action.payload
            }

        case GET_ENDED_REJECTED:
            return {
                ...state,
                loading: false,
                ended: []
            }

        case GET_ENDED_MORE_REQUEST:
            return {
                ...state,
                loading: false
            }

        case GET_ENDED_MORE_FULFILLED:
            return {
                ...state,
                loading: false,
                endedMore: action.payload.data,
                loaded: true
            }

        case GET_ENDED_MORE_REJECTED:
            return {
                ...state,
                loading: false,
                loaded: false
            }

        case GET_DONATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_DONATIONS_FULFILLED:
            return {
                ...state,
                loading: false,
                donations: action.payload
            }

        case GET_DONATIONS_REJECTED:
            return {
                ...state,
                loading: false,
                donations: []
            }

        case GET_DONATIONS_MORE_REQUEST:
            return {
                ...state,
                loading: false
            }

        case GET_DONATIONS_MORE_FULFILLED:
            return {
                ...state,
                loading: false,
                donationsMore: action.payload.data,
                loaded: true
            }

        case GET_DONATIONS_MORE_REJECTED:
            return {
                ...state,
                loading: false,
                loaded: false
            }

        default:
            return state;
    }
};

export default campaignReducer;