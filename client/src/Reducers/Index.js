import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import ClassReducer from "./ClassReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  classes: ClassReducer
})

export default rootReducer;