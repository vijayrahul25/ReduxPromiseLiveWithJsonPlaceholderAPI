import * as actionType from "./ActionType";
import axios from "axios";

export function loadAuthors() { 
  let request = axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    type: actionType.LOAD_AUTHORS,
    payload: request
  };
}