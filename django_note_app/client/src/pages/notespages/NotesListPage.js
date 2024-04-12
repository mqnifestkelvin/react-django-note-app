// NotesListPage.js
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "../../components/ListItem";
import AddButton from "../../components/AddButton";
import { getNotes, addNote } from "../../Actions/User";
import { logout } from "../../Actions/Auth";
import { Navigate } from "react-router-dom";
import "../css/notes.css";

export class NotesListPage extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    getNotes: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getNotes();
    }
  }

  onAddNoteClick = (e) => {
    this.props.addNote();
  };

  onLogoutClick = (e) => {
    this.props.logout();
  };

  render() {
    if (!this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { notes } = this.props;
    return (
      <div className="notes">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          {/* <button className="note-preview" onClick={this.onLogoutClick}>
            Logout
          </button> */}
          <p className="notes-count">{notes ? notes?.length : "0"}</p>{" "}
        </div>
        <div className="notes-list">
          {notes?.length > 0 ? (
            notes.map((note, index) => (
              <div className="note-preview" key={note.id || index}>
                <ListItem note={note} />
              </div>
            ))
          ) : (
            <div className="notes-placeholder">
              You have no notes yet. <br />
              Click on the Add Icon to add some!
            </div>
          )}
        </div>
        <AddButton onClick={this.props.addNote} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.user?.notes,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNotes, addNote, logout })(
  NotesListPage
);
