
import AxiosInstance from "../AxiosInstance"

// generate global config
export const getConfig = (token) => {
  const config = {
    headers: {
      "Authorization": token
    }
  }

  return config;
}

// load all sessions for a specific user
export const loadSessions = (sessionsData) => {
  return (dispatch, getState) => {
    const currentSessions = getState().classes.sessions;

    if (currentSessions.length > 0) {
      const completed = [];
      const sessions = [];
      
      
      sessionsData.map(s => {
        if (s.isCompleted) {
          completed.push(s);
        } else {
          sessions.push(s);
        }
      
      })

      dispatch({type: "ADD_SESSIONS", payload: sessions});
      dispatch({type: "SET_COMPLETED", payload: completed});
    }
  }
}

// cancel a single session for a user
export const cancelSession = (sessionId, token) => {

  return (dispatch, getState) => {
    AxiosInstance.delete(`/api/sessions/delete/${sessionId}`, getConfig(token))
    .then((res) => {
      dispatch({type: "DELETE_SESSION", payload: sessionId})
    })
    .catch((err) => {
      dispatch({type: "SET_ERROR", payload: err.response.data.message})
    })
  }
}

// add a single sesson for a user
export const bookSession = (session, token, userId) => {
  return (dispatch) => {
    AxiosInstance.post(`/api/sessions/add/${userId}`,session, getConfig(token))
    .then((res) => {
      const tempSessions = [res.data];
      dispatch({type: "ADD_SESSIONS", payload: tempSessions});
    })
    .catch((err) => {
      dispatch({type: "SET_SESSION_ERROR", payload: err.response.data.message});
    })
  }
}

// load trainer sessions
export const loadTrainerSessions = (token, trainerId) => {
  return (dispatch) => {
    AxiosInstance.get(`/api/sessions/trainer/all/${trainerId}`, getConfig(token))
    .then((res) => {
      const completed = [];
      const sessions = [];

      res.data.map(s => {
        if (s.isCompleted) {
          completed.push(s);
        } else {
          sessions.push(s);
        }
      })

      dispatch({type: "ADD_SESSIONS", payload: sessions});
      dispatch({type: "SET_COMPLETED", payload: completed});
    })
    .catch((err) => {
      dispatch({type: "SET_ERROR", payload: err.response.data.message})
    })
  }
}