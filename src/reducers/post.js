const initialState = {
  posts: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'POSTS_FETCH_SUCCESS': 
      return { posts: action.posts }
    default:
      return state;
  }
}