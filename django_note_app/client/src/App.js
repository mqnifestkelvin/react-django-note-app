import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/header";
import LogInPage from "./pages/authPage/UserLogin";
import store from "./store";
import NotesListPage from "./pages/notespages/NotesListPage";
import NotesPage from "./pages/notespages/NotesPage";
import UserRegistration from "./pages/authPage/UserRegistration";
import PasswordReset from "./pages/passwordReset/passwordResetForm/PasswordReset";
import PasswordResetSent from "./pages/passwordReset/passwordResetResponse/PasswordResetSent";
import PasswordResetFailed from "./pages/passwordReset/passwordResetResponse/PassWordResetFailed";
import ConfirmPassword from "./pages/passwordReset/passwordResetForm/ConfirmPassword";
import PasswordChangedSuccessful from "./pages/passwordReset/passwordResetResponse/PasswordChangeSuccessful";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container dark">
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" Component={LogInPage} />
              <Route path="/notes" Component={NotesListPage} />
              <Route path="/notes/:id" Component={NotesPage} />
              <Route path="/register" Component={UserRegistration} />
              <Route path="/password-reset" Component={PasswordReset} />
              <Route
                path="/password-reset-sent"
                Component={PasswordResetSent}
              />
              <Route
                path="/password-reset-failed"
                Component={PasswordResetFailed}
              />
              <Route
                path="/confirm-password-reset/:uidb64/:token"
                Component={ConfirmPassword}
              />
              <Route
                path="/password-change-successful"
                Component={PasswordChangedSuccessful}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
