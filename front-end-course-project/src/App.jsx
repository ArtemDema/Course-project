import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "../components/AuthPage"
import CompanyPage from "../components/CompanyPage"
import EditCompanyInfoPage from "../components/EditCompanyInfoPage"
import EditCompanyPage from "../components/EditCompanyPage"
import EditCompanyPhotosPage from "../components/EditCompanyPhotosPage"
import EditCompanyWorkersPage from "../components/EditCompanyWorkersPage"
import EditProfilePage from "../components/EditProfilePage"
import HomePage from "../components/HomePage"
import ProfilePage from "../components/ProfilePage"
import NotFoundPage from "../components/NotFoundPage"

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
          <Route path="editCompanyInfo" element={<EditCompanyInfoPage />} />
          <Route path="editCompanyPhotos" element={<EditCompanyPhotosPage />} />
          <Route path="editCompanyWorkers" element={<EditCompanyWorkersPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    )

  }
}

export default App
