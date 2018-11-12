import * as actionType from "./ActionType";
import axios from "axios";

//https://jsonplaceholder.typicode.com/posts
export function showPosts() {
  let request = axios.get("https://jsonplaceholder.typicode.com/posts");
  return {
    type: actionType.SHOW_POSTS,
    payload: request
  };
}
export function showPostsById(id) {
  let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  let request = axios.get(url);

  return {
    type: actionType.SHOW_POSTS_BY_ID,
    payload: request
  };
}

export function updatePost(data) {
  let url = `https://jsonplaceholder.typicode.com/posts/${data.id}`;

  let postData = {
    id: data.id,
    title: data.title,
    body: data.body,
    userId: data.userId
  };
  let headers = {
    "Content-type": "application/json; charset=UTF-8"
  };

  let request = axios.put(url, postData, headers);
  
  return {
    type: actionType.SHOW_POSTS_BY_ID,
    payload: request
  };
}
