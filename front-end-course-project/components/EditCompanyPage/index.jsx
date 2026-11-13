import editCompanyStyles from "./EditCompanyPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from "../Api"

class EditCompanyPage extends React.Component{
  state = { 
    company: null,
    imagePreview: null,
    activeField: null,
    vacancy: []
  }

  fileInputRef = React.createRef();

  componentDidMount() {
    api.get('company/0/') 
      .then(responce => {
        this.setState({
          company: responce.data
        });
      })
      .catch(error => {
        console.log("Ошибка:", error);
      });
    
    api.get('vacancy/') 
    .then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        this.setState({ vacancy: Array.isArray(response.data) ? response.data : [] }); 
      } else {
        this.setState({ vacancy: [] });
      }
    })
    .catch(error => {
      console.error("Ошибка:", error);
    })
  }

  handleSaveChangesVacancy = () => {
    const { vacancy, company } = this.state;
    
    // const vacancy = details && resume.length > 0
    //   ? resume.find(r => r.owner_id === details.id || r.user === details.id || r.user_id === details.id) 
    //   : null;

    // const dataToSend = { ...myResume };
    
    // api.patch(`vacancy/${id}`, dataToSend)
    //   .then(response => {
    //     this.setState(prevState => ({ 
    //       activeField: null,
    //       resume: prevState.resume.map(r => {
    //         if (r.id === myResume.id) {
    //           return { 
    //             ...r, 
    //             ...response.data,
    //             owner_id: r.owner_id ?? details.id,
    //             owner: details.id
    //           };
    //         }
    //         return r;
    //       })
    //     }));
    //   })
    // .catch(error => {
    //   console.error("Ошибка:", error.response ? error.response.data : error.message);
    // });
  };

  toggleEdit = (field) => {
    this.setState({
      activeField: this.state.activeField === field ? null : field
    });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        selectedFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  triggerFileSelect = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  };

  handleSaveChanges = (id) => {
    const { details, selectedFile } = this.state;
    
    if (!details) return;

    const formData = new FormData();
    
    Object.keys(details).forEach(key => {
      if (key !== 'date_joined' && key !== 'id' && key !== 'avatar') { 
        formData.append(key, details[key] || '');
      }
    });

    if (selectedFile) {
      formData.append('avatar_upload', selectedFile); 
    }

    api.patch(`company/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(responce => {
        this.setState({ 
          activeField: null,
          details: responce.data,
          selectedFile: null
        });
      })
      .catch(error => {
        console.error("Oшибкa:", error);
      });
  };

  render(){
    const { company, vacancy, imagePreview, activeField } = this.state

    const currentAvatarSrc = imagePreview || (company && company.avatar);

    const myVacancies = company && vacancy.length > 0
      ? vacancy.filter(r => r.owner === company.id) : null;
    
    return(
    <div className={editCompanyStyles.mainEditCompanyPage}>
      <Header typeOfScreen={"settings"}/>

      <div className={editCompanyStyles.contentEditCompany}>
        {company ? (
          <>
          <div className={editCompanyStyles.leftSide}>
            <div className={editCompanyStyles.avatar}>
              {currentAvatarSrc && (
                <img src={`http://127.0.0.1:8000${currentAvatarSrc}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "50%" }} 
                />
              )}
            </div>

            <input type="file" ref={this.fileInputRef} style={{ display: 'none' }} accept="image/*"
              onChange={this.handleFileChange}
            />

            <button type="button" className={editCompanyStyles.editProfilePhoto}
              onClick={this.triggerFileSelect}>
              Редагувати фото профіля
            </button>

            <div className={editCompanyStyles.textInfoDiv}>
              {activeField === 'name' ? (
                <input 
                  type="text" 
                  value={company.name || ""} 
                  onChange={(e) => this.handleInputChange(e, 'name')}
                  className={editCompanyStyles.editInput}
                />
              ) : (
                <h3 className={editCompanyStyles.textInfo}>Назва: {company.name}</h3>
              )}
              <button 
                type="button" 
                className={`${editCompanyStyles.editInfoButton} ${activeField === 'name' ? editCompanyStyles.activeButton : ''}`}
                onClick={() => this.toggleEdit('name')}
              >
                {activeField === 'name' ? 'Зберегти' : 'Редагувати'}
              </button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              {activeField === 'contact_email' ? (
                <input 
                  type="text" 
                  value={company.contact_email || ""} 
                  onChange={(e) => this.handleInputChange(e, 'contact_email')}
                  className={editCompanyStyles.editInput}
                />
              ) : (
                <h3 className={editCompanyStyles.textInfo}>Пошта представника: {company.contact_email}</h3>
              )}
              <button 
                type="button" 
                className={`${editCompanyStyles.editInfoButton} ${activeField === 'contact_email' ? editCompanyStyles.activeButton : ''}`}
                onClick={() => this.toggleEdit('contact_email')}
              >
                {activeField === 'contact_email' ? 'Зберегти' : 'Редагувати'}
              </button>
            </div>

          </div>
          <div className={editCompanyStyles.rightSide}>
            <h1>Редагування компанії</h1>

            <div className={editCompanyStyles.companyInfo}>
              <div className={editCompanyStyles.textInfoDivAboutMe}>
                {activeField === 'description' ? (
                  <textarea 
                    type="text" 
                    value={company.description || ""} 
                    onChange={(e) => this.handleInputChange(e, 'description')}
                    className={editCompanyStyles.editInputAboutMe}
                  />
                ) : (
                  <h3 className={editCompanyStyles.textInfoAboutMe}>{company.description}</h3>
                )}
                <button 
                  type="button" 
                  className={`${editCompanyStyles.editInfoButton} ${activeField === 'description' ? editCompanyStyles.activeButton : ''}`}
                  onClick={() => this.toggleEdit('description')}
                >
                  {activeField === 'description' ? 'Зберегти' : 'Редагувати'}
                </button>
              </div>
            </div>
            
            <h1>Вакансії</h1>
            {myVacancies ? (
              <>
                {myVacancies.map((item, index) => (
                  <div key={index}>
                    <div key={item.id || index} className={editCompanyStyles.exampleVacancy}>
                      <div className={editCompanyStyles.infoDiv}>
                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === `desired_position_${index}` ? (
                            <input 
                              type="text" 
                              value={item.desired_position || ""} 
                              onChange={(e) => this.handleInputChange(e, `desired_position_${index}`)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Посада: {item.desired_position}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === `desired_position_${index}` ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`desired_position_${index}`)}
                          >
                            {activeField === `desired_position_${index}` ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === `salary_${index}` ? (
                            <input 
                              type="text" 
                              value={item.salary_price || ""} 
                              onChange={(e) => this.handleInputChange(e, `salary_${index}`)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Заробітна плата: {item.salary_price}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === `salary_${index}` ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`salary_${index}`)}
                          >
                            {activeField === `salary_${index}` ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === `contact_email_vacancy_${index}` ? (
                            <input 
                              type="text" 
                              value={item.contacts || ""} 
                              onChange={(e) => this.handleInputChange(e, `contact_email_vacancy_${index}`)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Контакти: {item.contacts}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === `contact_email_vacancy_${index}` ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`contact_email_vacancy_${index}`)}
                          >
                            {activeField === `contact_email_vacancy_${index}` ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === `experience_${index}` ? (
                            <textarea 
                              type="text" 
                              value={item.experience || ""} 
                              onChange={(e) => this.handleInputChange(e, `experience_${index}`)}
                              className={editCompanyStyles.editInputAboutMe}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Щодо вакансії: {item.experience}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === `experience_${index}` ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`experience_${index}`)}
                          >
                            {activeField === `experience_${index}` ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>
                      </div>

                      <button type="button" className={editCompanyStyles.textFactoryButton}
                      onClick={() => this.handleSaveChangesVacancy(item.owner)}>Зберігти зміни вакансії</button>
                    </div>

                    <div className={editCompanyStyles.editDeleteDiv}>
                      <button type="button">Видалити</button>
                    </div>
                  </div>
                ))}
              </>) : (<></>)}
            <div className={editCompanyStyles.buttonDiv}>
              <button type="button" className={editCompanyStyles.textFactoryButton}>Зберегти зміни</button>
            </div>
          </div>
          </>) : (<></>)}
      </div>
    </div>
  )}
}

export default EditCompanyPage