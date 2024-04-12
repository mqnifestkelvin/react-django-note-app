import axios from "axios";
import { createMessage, returnErrors } from "./Messages";
import { tokenConfig } from "./Auth";

import {
  GET_NOTES,
  DELETE_NOTE,
  ADD_NOTE,
  LOAD_NOTE,
  UPDATE_NOTE_FAILED,
  UPDATE_NOTE_SUCCESS,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILED,
  GET_NOTES_FAILED,
  GET_NOTES_SUCCESS,
} from "./Types";

////////////////////
// NOTE LIST PAGE //
// List NOTES
export const getNotes = () => (dispatch, getState) => {
  axios
    .get(`/note/notes/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NOTES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE NOTE
export const deleteNote = (id) => (dispatch, getState) => {
  axios
    .delete(`/note/notes/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteNote: "Note Deleted" }));
      dispatch({
        type: DELETE_NOTE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

///////////////
// NOTE PAGE //

// ADD NOTES
export const addNote = (note) => (dispatch, getState) => {
  axios
    .post(`/note/notes/`, note, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addNote: "Note Added" }));
      dispatch({
        type: ADD_NOTE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// LOAD NOTE
export const loadNote = (id) => (dispatch, getState) => {
  console.log(`loaded note with ID: ${id}`);
  axios
    .get(`/note/notes/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOAD_NOTE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOAD_NOTE_FAIL")
      );
    });
};

// CREATE NOTE
export const createNote = (noteData) => (dispatch, getState) => {
  axios
    .post("/note/notes/", noteData, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CREATE_NOTE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: CREATE_NOTE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

// UPDATE NOTE
export const updateNote = (id, updatedNoteData) => (dispatch, getState) => {
  //console.log(`Updating note with ID: ${id}`, updatedNoteData);
  axios
    .put(`/note/notes/${id}/`, updatedNoteData, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: UPDATE_NOTE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
