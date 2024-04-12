import {
  GET_NOTES,
  DELETE_NOTE,
  ADD_NOTE,
  CLEAR_NOTES,
  GET_NOTE_FAIL,
  EDIT_NOTE,
  LOAD_NOTE,
  UPDATE_NOTE_FAILED,
} from "../Actions/Types";

const initialState = {
  notes: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case GET_NOTE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOAD_NOTE:
      return {
        ...state,
        currentNote: {
          id: action.payload.id,
          body: action.payload.body,
        },
        error: null, // Resetting error state, assuming a successful load
      };
    case EDIT_NOTE:
    case UPDATE_NOTE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
}
