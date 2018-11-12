import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { showPostsById } from "../actions/postActions";
import { mapArrayKeyToObjectIdAndSort } from "../utility";

class ShowPosts extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    //load post by id if not exist in state post array
    if (!this.props.posts || this.props.posts.length === 0) {
      await this.props.showPostsById(this.props.match.params.id);
    }
  }
  render() {
    if (!this.props.posts || !this.props.posts.length) {
      return <div>Loading...</div>;
    }
    
    let postIndex = this.props.posts.findIndex(
      postdata => ( postdata.id == this.props.match.params.id)
    );
    let post = this.props.posts[postIndex];
    
    if (post) {
      return (
        <div className="App">
          <br />
          <Link className="btn btn-primary" to={`/EditPost/${post.id}`}>
            Edit Post..
          </Link>
          <br />
          <h2>{post.title}</h2>
          <span>Author Id:</span>
          <strong>{post.userId}</strong>
          <hr />
          <p>{post.body}</p>
        </div>
      );
    } else {
      return <div>Post not found</div>;
    }
  }
}

function mapStateToProps(state) {
  var postData = mapArrayKeyToObjectIdAndSort(state.postReducer.posts);

  return {
    posts: postData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showPostsById }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPosts);
