import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateNote,
  loadNote,
  createNote,
  deleteNote,
} from "../../Actions/User";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { Link, Navigate } from "react-router-dom";
import { withRouterHooks } from "../withRouterHooks";
import "../css/notes.css";

class NotePage extends Component {
  state = {
    body: "",
    isDirty: false,
  };

  static propTypes = {
    note: PropTypes.object,
    updateNote: PropTypes.func.isRequired,
    loadNote: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { id } = this.props.params;
    if (id !== "new" && this.props.isAuthenticated) {
      this.props.loadNote(id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note !== this.props.note && this.props.note) {
      this.setState({ body: this.props.note.body });
    }
  }

  handleSubmit = () => {
    const { id } = this.props.params;
    const { note, deleteNote, updateNote, createNote, navigate } = this.props;
    const { body } = this.state;

    if (id !== "new" && !body) {
      deleteNote(id);
    } else if (id !== "new") {
      updateNote(id, { ...note, body });
    } else if (id === "new" && body) {
      createNote({ ...note, body });
    }

    navigate("/");
  };

  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Navigate to="/" />;
    // }
    const { id } = this.props.params;

    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/notes">
              <ArrowLeft />
            </Link>
          </h3>
          {id !== "new" && this.state.isDirty ? (
            <button onClick={this.handleSubmit}>Save</button>
          ) : null}
          {id !== "new" && !this.state.isDirty ? (
            <button onClick={() => this.props.deleteNote(id)}>
              <Link to={"/notes"}>Delete</Link>
            </button>
          ) : null}
          {id === "new" ? (
            <button onClick={this.handleSubmit}>Save</button>
          ) : null}
        </div>
        <div className="note-body">
          <textarea
            placeholder="Click here and start typing to create a new note..."
            onChange={(e) => {
              this.setState({ body: e.target.value, isDirty: true });
            }}
            value={this.state.body}
          ></textarea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  note: state.user.currentNote,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  updateNote,
  loadNote,
  createNote,
  deleteNote,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(NotePage)
);
