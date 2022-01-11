
const initialState = {
  isAuthenticated: false,
  client: {},
  trainer: {},
  error: "",
  visible: false,
  accountType: "",
  typeError: "",
  clientsList: [], 
  sessionTypes: []
}

export default function AuthReducer(state = initialState, action) {
  switch(action.type) {

    case "REGISTER":
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        client: action.payload,
        accountType: "client"
      }
    case "LOGOUT":
      return {
        ...state,
        clientsList: [],
        sessionTypes: [] ,
        isAuthenticated: false,
        user: {},
        trainer: {},
        error: "",
        accountType: "",
      }

    case "SET_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload,
        visible: true
      }

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        typeError: null,
        visible: false
      }

    case "SET_VISIBLE":
      return {
        ...state,
        visible: action.payload
      }

    case "SET_ACCOUNT_TYPE":
      return {
        ...state,
        accountType: action.payload
      }

    case "SET_TRAINER":
      return {
        ...state,
        trainer: action.payload,
        isAuthenticated: true,
        accountType: "trainer"
      }

    case "SET_TYPE_ERROR":
      return {
        ...state,
        typeError: action.payload
      }

    case "SET_CLIENTS_LIST":
      return {
        ...state,
        clientsList: [...state.clientsList, ...action.payload]
      }

    case "SET_SESSION_TYPES":
      return {
        ...state, 
        sessionTypes: [...state.sessionTypes, ...action.payload]
      }

    case "ADD_SESSION_TYPE":
      return {
        ...state,
        sessionTypes: [...state.sessionTypes, action.payload]
      }

    case "DELETE_SESSION_TYPE":
      return {
        ...state,
        sessionTypes: state.sessionTypes.filter(type => type.id !== action.payload)
      }

    default:
      return {
        ...state
      }
  }
}