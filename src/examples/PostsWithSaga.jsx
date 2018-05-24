import React, { Component } from 'react';
import { connect } from "react-redux";

@connect((state) => ({
  posts: state.post.posts
}))
class PostsWithSaga extends Component {

  componentDidMount(){
    this.props.dispatch({
      type: "POSTS_FETCH_REQUESTED"
    })
  }

  render() {
    return (
      <div>
        PostsWithSaga
        {this.props.posts.map((post) => <div key={post.id}>{post.title}</div>)}
      </div>
    );
  }
}

export default PostsWithSaga;