import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadAuthors } from "../actions/authorActions";
import { TRAuthors } from "../component/TRAuthors";
import { mapArrayKeyToObjectIdAndSort } from "../utility";

class showAuthors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  
  render() {
    //console.log(this.props.posts);
    if (!this.props.authors || !this.props.authors.length) {      
      return <div>Loading....</div>;
    }
   
    let data = this.props.authors.map(( author, index ) => (
      <TRAuthors key={author.id} author={author} />
    ));
    const post = this.props.post;
    return (
      <div className="App">
        <h2>PostList</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>NAme</th>
              <th>Username</th>
              <th>Email</th>
              <th>Posts</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
   var authorData = mapArrayKeyToObjectIdAndSort(state.authorReducer.authors);

  return {
    authors: authorData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAuthors }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(showAuthors);
