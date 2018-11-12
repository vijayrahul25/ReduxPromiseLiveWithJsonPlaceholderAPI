import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPostsById, updatePost } from "../actions/postActions";
import { mapArrayKeyToObjectIdAndSort } from "../utility";

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", id: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentWillMount() {
    //load post by id if not exist in state post array
    if (!this.props.posts || this.props.posts.length == 0) {
      await this.props.showPostsById(this.props.match.params.id);
       
      let postIndex = this.props.posts.findIndex(
        postdata => (postdata.id == this.props.match.params.id)
      );
      let post = this.props.posts[postIndex];
      this.setState({
        title: post.title, 
        body: post.body,
        id: post.id,
        userId: post.userId
      });
    } else {
      let postIndex = this.props.posts.findIndex(
        postdata => (postdata.id == this.props.match.params.id)
      );
      let post = this.props.posts[postIndex];
      this.setState({
        title: post.title,
        body: post.body,
        id: post.id,
        userId: post.userId
      });
    }
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }
async handleSubmit() {
    await this.props.updatePost(this.state);
    let dataId = this.state.id;
    this.setState({
      title: "",
      body: ""
    });
    this.props.history.push(`/ShowPost/${dataId}`);
  }
  render() {
    if (!this.props.posts || !this.props.posts.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <h2>Edit Post</h2>
        <form>
          <div className="form-group">
            <label for="pwd">Title:</label>
            <input
              className="form-control"
              value={this.state.title}
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label for="pwd">Body:</label>
            <textarea
              className="form-control"
              value={this.state.body}
              placeholder="post body"
              name="body"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <br />
          <input
            className="btn btn-primary"
            type="button"
            onClick={this.handleSubmit}
            value="submit"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var postData = mapArrayKeyToObjectIdAndSort(state.postReducer.posts);

  return {
    posts: postData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showPostsById, updatePost }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
