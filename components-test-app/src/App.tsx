import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { AppRoutes } from "./configuration/AppRoutes";
import { LostPasswordPage } from "./pages/LostPasswordPage/LostPasswordPage";
import { ResendConfirmationPage } from "./pages/ResendConfirmationPage/ResendConfirmationPage";
import { UpdateUserPage } from "./pages/UpdateUserPage/UpdateUserPage";

function App() {
  return <Router>
    <Routes>
      <Route path={AppRoutes.login} element={ <LoginPage />} />
      <Route path={AppRoutes.register} element={<RegisterPage />} />
      <Route path={AppRoutes.lost_password} element={<LostPasswordPage />}/>
      <Route path={AppRoutes.resend_confirmation} element={<ResendConfirmationPage />}/>
      <Route path={AppRoutes.update_user} element={<UpdateUserPage />}/>
      <Route path="/" element={<Navigate to={AppRoutes.login}/>} />
    </Routes>
  </Router>
};

export default App;
