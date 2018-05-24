import { call, put, takeLatest } from "redux-saga/effects";
import { request } from '../services'

// woker function
function* fetchPosts(action){
  try {
    const posts = yield call(request, "https://jsonplaceholder.typicode.com/posts");
    yield put({ type: "POSTS_FETCH_SUCCESS", posts });
  } catch (e) {
    yield put({ type: "POSTS_FETCH_FAILED" });
  }
}
// watcher function
function* rootSaga(){
  yield takeLatest("POSTS_FETCH_REQUESTED", fetchPosts)
}

export default rootSaga;