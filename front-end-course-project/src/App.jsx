import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "../components/AuthPage"
import CompanyPage from "../components/CompanyPage"
import EditCompanyPage from "../components/EditCompanyPage"
import EditProfilePage from "../components/EditProfilePage"
import HomePage from "../components/HomePage"
import ProfilePage from "../components/ProfilePage"
import NotFoundPage from "../components/NotFoundPage"
import ResumePage from "../components/ResumePage"
import VacancyPage from "../components/VacancyPage"

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="company" element={<CompanyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editProfile" element={<EditProfilePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="editCompany" element={<EditCompanyPage />} />
          <Route path="resume/:id" element={<ResumePage />} />
          <Route path="vacancy/:id" element={<VacancyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    )

  }
}

export default App
