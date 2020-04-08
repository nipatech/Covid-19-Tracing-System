import { push } from "connected-react-router";

export default () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token){
    dispatch(push("/profile"));
  }
}