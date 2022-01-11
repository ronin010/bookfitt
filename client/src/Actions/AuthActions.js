import AxiosInstance from "../AxiosInstance";
import { loadSessions } from "./SessionActions";

// generate global config
export const getConfig = (token) => {
  const config = {
    headers: {
      "Authorization": token
    }
  }

  return config;
}
// -- client actions --

export const register = (user) => {
  return (dispatch) => {
    
    AxiosInstance.post("/api/users/add", user)
    .then((res) => {
      const user = res.data.client;
      delete user.password;
      dispatch({type: "REGISTER", payload: user});
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const login = (user) => {
  return (dispatch) => {
    AxiosInstance.post("/api/users/login", user)
    .then((res) => {
      dispatch({type: "LOGIN", payload: res.data.client});
      dispatch({type: "ADD_SESSIONS", payload: res.data.sessions});
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const loadUser = (token) => {
  return (dispatch) => {
   

    AxiosInstance.get("/api/users/load", getConfig(token))
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({type: "LOGIN", payload: res.data.client});

      const sessionsData = res.data.sessions;

      if (sessionsData.length > 0) {
        
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
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: "LOGOUT"});
    localStorage.removeItem("token");
  }
}

export const aquire_token = (oldToken) => {
  return (dispatch) => {
    
  }
}

// -- trainer actions --

export const addTrainer = (trainer) => {
  return (dispatch) => {
    AxiosInstance.post("/api/trainers/add", trainer)
    .then((res) => {
      const trainer = res.data.trainer;
      dispatch({type: "SET_TRAINER", payload: trainer});
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const loginTrainer = (trainer) => {
  return (dispatch) => {
    AxiosInstance.post("/api/trainers/login", trainer)
    .then((res) => {
      const {trainer, token, clients, sessions, sessionTypes} = res.data;
      delete trainer.password
      localStorage.setItem("token", token);

      if (clients.length > 0) {
        dispatch({type: "SET_CLIENTS_LIST", payload: clients});
      } 
      
      dispatch({type: "SET_TRAINER", payload: trainer});
      dispatch(loadSessions(sessions));
      dispatch({type: "SET_SESSION_TYPES", payload: trainer.sessionTypes});

    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const loadTrainer = (token) => {
  return (dispatch) => {
    
    AxiosInstance.get("/api/trainers/load", getConfig(token))
    .then((res) => {
      const {trainer, token, clients, sessions, sessionTypes} = res.data;
      delete trainer.password;
      
      localStorage.setItem("token", token);

      clients.forEach(client => {
        delete client.password
      });

      if (clients.length > 0) {
        dispatch({type: "SET_CLIENTS_LIST", payload: clients});
      }

      dispatch({type: "SET_TRAINER", payload: trainer});
      dispatch(loadSessions(sessions));
      dispatch({type: "SET_SESSION_TYPES", payload: trainer.sessionTypes});
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const addSessionType = (token, sessionType, id) => {
  return (dispatch, getState) => {
    dispatch({type: "CLEAR_ERROR"});

    const body = {
      "type": sessionType
    }

    AxiosInstance.post(`/api/trainers/session-type/${id}`, body , getConfig(token))
    .then((res) => {
      dispatch({type: "ADD_SESSION_TYPE", payload: res.data});
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_TYPE_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_TYPE_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const deleteSessionType = (trainerId, type, typeId, token) => {
  return (dispatch) => {
    AxiosInstance.delete(`/api/trainers/session-type/delete/${trainerId}/${type.type}`, getConfig(token))
    .then((res) => {
      dispatch({type: "DELETE_SESSION_TYPE", payload: typeId});
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_TYPE_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_TYPE_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const loadTrainersBySessionType = (type, token) => {
  return (dispatch) => {
    AxiosInstance.get(`/api/trainers/session-type/trainers/${type}`, getConfig(token))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_TYPE_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_TYPE_ERROR", payload: err.response.data.message});
      }
    })
  }
}

export const assignTrainer = (clientId, trainerId, token) => {
  return (dispatch) => {
    AxiosInstance.post(`/api/users/assign-trainer/${clientId}/${trainerId}`, {}, getConfig(token))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err.response.data.status === 500) {
        dispatch({type: "SET_ERROR", payload: "Internal Server Error"});
      } else {
        dispatch({type: "SET_ERROR", payload: err.response.data.message});
      }
    })
  }
}