import { combineReducers } from "redux";

import Home from "./home/reducer";
import Signup from "./signup/reducer";
import Contacts from "./contacts/reducer";
import Profile from "./profile/reducer";

export default combineReducers({
  Home,
  Signup,
  Contacts,
  Profile
});