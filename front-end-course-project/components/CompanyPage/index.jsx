import companyStyles from "./CompanyPage.module.css";
import Header from "../Header";
import { publicApi } from '../Api';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function CompanyPage() {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    publicApi.get(`company/${id}/`) 
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      })
  }, [id]);

  if (!company) {
    return(<></>)
  }
  const currentAvatarSrc = company.avatar;
  return (
    <div className={companyStyles.mainDivCompanyPage}>
      <Header typeOfScreen={"main"} />

      <div className={companyStyles.contentDivCompanyPage}>
        
        <div className={companyStyles.leftSide}>
          <div className={companyStyles.backCompanyDiv}></div>
          <h2>Фото підприємства</h2>
          
          <div className={companyStyles.exampleCompanyAvatarDiv}>
            {currentAvatarSrc && (
              <img 
                src={`http://127.0.0.1:8000${currentAvatarSrc}`} 
                className={companyStyles.avatarUser}  
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            )}
          </div>

          <h2>{company.name}</h2>
          <h3>Інформація про підприємство:</h3>
          <h4>{company.description}</h4>
          <h3>Контактний номер підприємства:</h3>
          <div>
            <h4>Контактный email - {company.contact_email}</h4>
          </div>
        </div>
        
        <div className={companyStyles.rightSide}>
          <h3>Фотографії від компанії</h3>
          <div className={companyStyles.PhotoDiv}>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
          </div>
          <h1>Вакансії</h1>
        </div>

      </div>
    </div>
  )
}

export default CompanyPage;