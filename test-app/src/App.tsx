import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { AppRoutes } from "./configuration/AppRoutes";
import { LostPasswordPage } from "./pages/LostPasswordPage/LostPasswordPage";
import { ResendConfirmationPage } from "./pages/ResendConfirmationPage/ResendConfirmationPage";
import { UpdateUserPage } from "./pages/UpdateUserPage/UpdateUserPage";
import { EzOnRails } from '@d4us1/ez-on-rails-react';
import { UseEzApiTestPage } from './pages/UseEzApiTestPage/UseEzApiTestPage';
import { UseEzScaffTestPage } from './pages/UseEzScaffTestPage/UseEzScaffTestPage';

function App() {
  return (
      <EzOnRails backendUrl='http://localhost:3000' apiVersion='1.0'>
        <Router>
          <Routes>
            <Route path={AppRoutes.login} element={ <LoginPage />} />
            <Route path={AppRoutes.register} element={<RegisterPage />} />
            <Route path={AppRoutes.lost_password} element={<LostPasswordPage />}/>
            <Route path={AppRoutes.resend_confirmation} element={<ResendConfirmationPage />}/>
            <Route path={AppRoutes.update_user} element={<UpdateUserPage />}/>
            <Route path={AppRoutes.use_ez_scaff_test_page} element={<UseEzScaffTestPage />}/>
            <Route path={AppRoutes.use_ez_api_test_page} element={<UseEzApiTestPage />}/>
            <Route path="/" element={<Navigate to={AppRoutes.login}/>} />
          </Routes>
        </Router>
      </EzOnRails>
  );
}

export default App;
