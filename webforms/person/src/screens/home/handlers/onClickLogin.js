import { push } from "connected-react-router";

export default () => async (dispatch) => {
  localStorage.setItem("token", "asdasdasdasd");

  dispatch(push("/profile"));
  
}