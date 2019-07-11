import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  componentDidMount = () => {
    this.props.fetchPostsAndUsers();
  };

  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapstatetoprop = state => {
  // NOTE: state is what is returned by the combineReducers
  return { posts: state.posts };
};

// NOTE: To transfer data from redux side to react side we need to define...
// mapstatetoprop function and pass it off to the first argument of the connect fn.
export default connect(
  mapstatetoprop,
  { fetchPostsAndUsers: fetchPostsAndUsers }
)(PostList);
