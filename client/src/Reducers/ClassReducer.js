const initialState = {
    error: "",
    sessions: [],
    tempSessions: [],
    completed: []
}

export default function ClassReducer(state = initialState, action) {
  switch(action.type) {
    case "ADD_SESSIONS":
      return {
        ...state,
        sessions: [...state.sessions, ...action.payload]
      }

    case "ADD_SINGLE_SESSION":
      return {
        ...state,
        sessions: [...state, action.payload]
      }

    case "SET_SESSION_ERROR":
      return {
        ...state,
        error: action.payload
      }

    case "DELETE_SESSION":
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload)
      }

    case "CLEAR_SESSIONS":
      return {
        ...state,
        sessions: []
      }

    case "SET_TEMP_SESSIONS":
      return {
        ...state,
        sessions: [...state.tempSessions, ...action.payload]
      }

    case "SET_COMPLETED":
      return {
        ...state,
        completed: [...state.completed, ...action.payload]
      }

    case "CLEAR_SESSIONS": 
      return {
        ...state,
        sessions: []
      }

    default:
      return {
        ...state
      }
  }
}