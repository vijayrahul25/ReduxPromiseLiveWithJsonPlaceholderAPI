import * as actionType from "../actions/ActionType";

const initialPostState = {
  posts: []
};
const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case actionType.SHOW_POSTS:      
      return {
        posts: action.payload.data 
      };
      break;
    case actionType.SHOW_POSTS_BY_ID: 
      let newSTate = state.posts.filter(
        data => action.payload.data.id !== data.id
      ); 
      var object = Object.assign({}, action.payload.data);      
      return {
        posts: [...newSTate, Object.assign({}, object )]
      };
        
      break;
    default:
      return state;
  }
};

export default postReducer;
