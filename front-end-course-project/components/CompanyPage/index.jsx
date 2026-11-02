import companyStyles from "./CompanyPage.module.css";
import Header from "../Header";
import { publicApi } from '../Api';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function CompanyPage() {
  const [company, setCompany] = useState(null);
  const { id } = useParams();
  const [allVacancies, setVacancies] = useState(null);

  useEffect(() => {
    Promise.all([
      publicApi.get(`vacancy/`),
      publicApi.get(`company/${id}/`)
    ])
    .then(([vacanciesResponse, companyResponse]) => {
      setCompany(companyResponse.data);
      setVacancies(vacanciesResponse.data);
    })
      .catch((error) => {
        console.error("Ошибка:", error);
      })
  }, [id]);

  if (!company) {
    return(<></>)
  }
  const currentAvatarSrc = company.avatar;

  const vacancies = company && allVacancies.length > 0 ? allVacancies.filter(v => v.owner === company.id) : null;
  
  const handleVacancyView = (id) => {
    window.location.href = `http://localhost:5173/vacancy/${id}`;
  }

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
          <h1>Вакансії</h1>
          {vacancies ? (
            <>
            {vacancies.map((item, index) => (
              <div 
                key={item.id || index} 
                className={companyStyles.exampleVacancy}
              >
                <div className={companyStyles.nameDiv}>
                  <div className={companyStyles.textFactoryName}>
                    {item.desired_position}
                  </div>
                  <div className={companyStyles.exampleFactoryPhoto}>
                    {item.avatar ? (
                      <img 
                        src={`http://127.0.0.1:8000${item.avatar}`} 
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (<></>)}
                  </div>
                </div>

                <div className={companyStyles.infoDiv}>
                  <div className={companyStyles.textFactory}>Про вакансію: {item.experience || "Без досвіду"}</div>
                  <div className={companyStyles.textFactory}>Заробітна плата: {item.salary_price || "Не вказано"} грн.</div>
                </div>

                <button type="button" className={companyStyles.textFactoryButton}
                onClick={() => handleVacancyView(item.id)}>Показати більше</button>
              </div>
            ))}
            </>
            ) : (<></>)
          }
        </div>

      </div>
    </div>
  )
}

export default CompanyPage;