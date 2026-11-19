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

  handleSaveChangesVacancy = (vacancyId) => {
    const { vacancy } = this.state;
    
    const targetVacancy = vacancy.find(v => v.id === vacancyId);
    if (!targetVacancy) return;

    api.patch('vacancy/', targetVacancy)
      .then(response => {
        this.setState(prevState => ({
          activeField: null,
          vacancy: prevState.vacancy.map(v => 
            v.id === vacancyId ? response.data : v
          )
        }));
      })
      .catch(error => {
        console.error("Ошибка:", error.response ? error.response.data : error);
      });
  };

  handleInputChange = (e, field, vacancyId = null) => {
    const { value } = e.target;

    if (vacancyId !== null) {
      this.setState(prevState => ({
        vacancy: prevState.vacancy.map(item => 
          item.id === vacancyId ? { ...item, [field]: value } : item
        )
      }));
    }
    else {
      this.setState(prevState => ({
        company: {
          ...prevState.company,
          [field]: value
        }
      }));
    }
  };

  handleDeleteVacancy = (id) => {
    const { company, vacancy } = this.state;

    const myVacancy = company && vacancy.length > 0
      ? vacancy.find(v => v.owner === company.id && v.id === id) : null;

    api.delete("vacancy/", { params: { id: myVacancy.id } })
      .then(() => {
        this.setState(prevState => ({
          activeField: null,
          vacancy: prevState.vacancy.filter(v => v.id !== myVacancy.id)
        }));
      })
      .catch(error => {
        console.error("Ошибка:", error.response ? error.response.data : error.message);
      });
  };

  toggleEdit = (field, vacancyId = null) => {
    const fieldKey = vacancyId !== null ? `vacancy_${vacancyId}_${field}` : field;

    this.setState({
      activeField: this.state.activeField === fieldKey ? null : fieldKey
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

  handleSaveChangesCompany = () => {
    const { company, selectedFile } = this.state;
    if (!company) return;

    const formData = new FormData();
    Object.keys(company).forEach(key => {
      if (key !== 'date_joined' && key !== 'id' && key !== 'avatar') { 
        formData.append(key, company[key] || '');
      }
    });

    if (selectedFile) {
      formData.append('avatar_upload', selectedFile); 
    }

    api.patch(`company/${company.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        this.setState({ 
          activeField: null,
          company: response.data,
          selectedFile: null
        });
      })
      .catch(error => {
        console.error("Ошибка:", error);
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
                  onChange={(e) => this.handleInputChange(e, 'name', item.id)}
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
                  onChange={(e) => this.handleInputChange(e, 'contact_email', item.id)}
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
              {activeField === 'description' ? (
                <textarea 
                  type="text" 
                  value={company.description || ""} 
                  onChange={(e) => this.handleInputChange(e, 'description', item.id)}
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
            
            <h1>Вакансії</h1>
            {myVacancies ? (
              <>
              {myVacancies.map((item, index) => {
                const positionKey = `vacancy_${item.id}_desired_position`;
                const salaryKey = `vacancy_${item.id}_salary_price`;
                const contactsKey = `vacancy_${item.id}_contact_email_vacancy`;
                const experienceKey = `vacancy_${item.id}_experience`;

                return (
                  <div key={index} className={editCompanyStyles.resumeDiv}>
                    <div className={editCompanyStyles.exampleVacancy}>
                      <div className={editCompanyStyles.infoDiv}>
                        
                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === positionKey ? (
                            <input 
                              type="text" 
                              value={item.desired_position || ""} 
                              onChange={(e) => this.handleInputChange(e, 'desired_position', item.id)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Посада: {item.desired_position}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === positionKey ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit('desired_position', item.id)}
                          >
                            {activeField === positionKey ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === salaryKey ? (
                            <input 
                              type="text" 
                              value={item.salary_price || ""} 
                              onChange={(e) => this.handleInputChange(e, 'salary_price', item.id)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Заробітна плата: {item.salary_price}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === salaryKey ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit('salary_price', item.id)}
                          >
                            {activeField === salaryKey ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === contactsKey ? (
                            <input 
                              type="text" 
                              value={item.contacts || ""} 
                              onChange={(e) => this.handleInputChange(e, 'contact_email_vacancy', item.id)}
                              className={editCompanyStyles.editInput}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Контакти: {item.contacts}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === contactsKey ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`contact_email_vacancy`, item.id)}
                          >
                            {activeField === contactsKey ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>

                        <div className={editCompanyStyles.textInfoDiv}>
                          {activeField === experienceKey ? (
                            <textarea 
                              type="text" 
                              value={item.experience || ""} 
                              onChange={(e) => this.handleInputChange(e, 'experience', item.id)}
                              className={editCompanyStyles.editInputAboutMe}
                            />
                          ) : (
                            <h3 className={editCompanyStyles.textInfo}>Щодо вакансії: {item.experience}</h3>
                          )}
                          <button 
                            type="button" 
                            className={`${editCompanyStyles.editInfoButton} ${activeField === experienceKey ? editCompanyStyles.activeButton : ''}`}
                            onClick={() => this.toggleEdit(`experience`, item.id)}
                          >
                            {activeField === experienceKey ? 'Зберегти' : 'Редагувати'}
                          </button>
                        </div>
                      </div>

                      <button type="button" className={editCompanyStyles.textFactoryButtonResume}
                      onClick={() => this.handleSaveChangesVacancy(item.id)}>Зберігти зміни вакансії</button>
                    </div>

                    <div className={editCompanyStyles.editDeleteDiv}>
                      <button type="button"
                      onClick={() => this.handleDeleteVacancy(item.id)}>Видалити резюме</button>
                    </div>
                  </div>
                );
                })}
              </>
            ) : null}
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