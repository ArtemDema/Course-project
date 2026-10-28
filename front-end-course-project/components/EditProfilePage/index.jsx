import editProfileStyles from "./EditProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from '../Api';

class EditProfilePage extends React.Component {
  state = {
    details: null,
    activeField: null,
    resume: [],
    selectedFile: null,
    imagePreview: null
  }

  fileInputRef = React.createRef();

  componentDidMount() {
    api.get('user/me/') 
      .then(responce => {
        this.setState({
          details: responce.data
        });
      })
      .catch(error => {
        console.log("Ошибка получения профиля:", error);
      });
    
    api.get('resume/') 
    .then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        this.setState({ resume: Array.isArray(response.data) ? response.data : [] }); 
      } else {
        this.setState({ resume: [] });
      }
    })
    .catch(error => {
      console.error("Ошибка:", error);
    })
  }

  toggleEdit = (field) => {
    this.setState({
      activeField: this.state.activeField === field ? null : field
    });
  };

  handleInputChange = (e, field) => {
    const { value } = e.target;
    const { details } = this.state;
    const resumeFields = ['desired_p_1', 'desired_p_2', 'desired_p_3', 'salary_price', 'experience'];
    
    const fieldMap = {
      'desired_p_1': 'desired_position_1',
      'desired_p_2': 'desired_position_2',
      'desired_p_3': 'desired_position_3',
    };

    const realFieldName = fieldMap[field] || field;

    if (resumeFields.includes(field)) {
      this.setState(prevState => {
        const resumeIndex = prevState.resume.findIndex(r => 
          r.owner_id === details?.id || r.user === details?.id || r.user_id === details?.id
        );

        const updatedResumeList = [...prevState.resume];

        updatedResumeList[resumeIndex] = {
          ...updatedResumeList[resumeIndex],
          [realFieldName]: value
        };

        return { resume: updatedResumeList };
      });
    } 
    else {
      this.setState(prevState => ({
        details: {
          ...prevState.details,
          [realFieldName]: value
        }
      }));
    }
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

  handleSaveChanges = () => {
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

    api.patch("user/me/", formData, {
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

  handleSaveChangesResume = () => {
    const { details, resume } = this.state;
    
    const myResume = details && resume.length > 0
      ? resume.find(r => r.owner_id === details.id || r.user === details.id || r.user_id === details.id) 
      : null;

    const resumeId = myResume.id; 
    const dataToSend = { ...myResume };
    

    api.patch("resume/", dataToSend)
    .then(response => {
      const updatedResumeList = prevState.resume.map(r => r.id === response.data.id ? response.data : r);
      this.setState({ 
        activeField: null,
        resume: updatedResumeList
      });
    })
    .catch(error => {
      console.error("Ошибка:", error.response ? error.response.data : error.message);
    });
  };

  handleCreateResume = () => {
  const { details } = this.state;

  const initialData = {
    owner: details.id,
    desired_position_1: "Не вказано",
    desired_position_2: "",
    desired_position_3: "",
    salary_price: 0,
    experience: ""
  };

  api.post("resume/", initialData)
    .then(response => {
      this.setState(prevState => ({
        resume: [...prevState.resume, response.data]
      }));
    })
    .catch(error => {
      console.error("Ошибка:", error.response ? error.response.data : error.message);
    });
  };

  handleDeleteResume = () => {
    const { details, resume } = this.state;

    const myResume = details && resume.length > 0
      ? resume.find(r => r.owner_id === details.id || r.user === details.id || r.user_id === details.id) 
      : null;

    api.delete("resume/", { params: { id: myResume.id } })
      .then(() => {
        this.setState(prevState => ({
          activeField: null,
          resume: prevState.resume.filter(r => r.id !== myResume.id)
        }));
      })
      .catch(error => {
        console.error("Ошибка:", error.response ? error.response.data : error.message);
      });
  };

  render() {
    const { details, activeField, resume, imagePreview } = this.state;

    const currentAvatarSrc = imagePreview || (details && details.avatar);

    const myResume = details && resume.length > 0
      ? resume.find(r => r.owner_id === details.id || r.user === details.id || r.user_id === details.id) : null;

    return (
      <div className={editProfileStyles.mainDivEditProfilePage}>
        <Header typeOfScreen={"settings"} />

        <div className={editProfileStyles.contentDivEditProfilePage}>
          {details && (
            <div className={editProfileStyles.leftSide}>
              <div className={editProfileStyles.avatar}>
                {currentAvatarSrc && (
                  <img src={currentAvatarSrc} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                )}
              </div>

              <input type="file" ref={this.fileInputRef} style={{ display: 'none' }} accept="image/*"
                onChange={this.handleFileChange}
              />

              <button type="button" className={editProfileStyles.editProfilePhoto}
                onClick={this.triggerFileSelect}>
                Редагувати фото профіля
              </button>

              <div className={editProfileStyles.profileInfo}>
                
                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'first_name' ? (
                    <input 
                      type="text" 
                      value={details.first_name || ""} 
                      onChange={(e) => this.handleInputChange(e, 'first_name')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Им’я: {details.first_name}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'first_name' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('first_name')}
                  >
                    {activeField === 'first_name' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'last_name' ? (
                    <input 
                      type="text" 
                      value={details.last_name || ""} 
                      onChange={(e) => this.handleInputChange(e, 'last_name')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Призвище: {details.last_name}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'last_name' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('last_name')}
                  >
                    {activeField === 'last_name' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'birthday' ? (
                    <input 
                      type="date"
                      value={details.birthday || ""} 
                      onChange={(e) => this.handleInputChange(e, 'birthday')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Дата народження: {details.birthday}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'birthday' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('birthday')}
                  >
                    {activeField === 'birthday' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'city' ? (
                    <input 
                      type="text" 
                      value={details.city || ""} 
                      onChange={(e) => this.handleInputChange(e, 'city')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Місто: {details.city}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'city' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('city')}
                  >
                    {activeField === 'city' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'education' ? (
                    <input 
                      type="text" 
                      value={details.education || ""} 
                      onChange={(e) => this.handleInputChange(e, 'education')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Освіта: {details.education}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'education' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('education')}
                  >
                    {activeField === 'education' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.textInfoDiv}>
                  {activeField === 'email' ? (
                    <input 
                      type="email" 
                      value={details.email || ""} 
                      onChange={(e) => this.handleInputChange(e, 'email')}
                      className={editProfileStyles.editInput}
                    />
                  ) : (
                    <h3 className={editProfileStyles.textInfo}>Пошта: {details.email}</h3>
                  )}
                  <button 
                    type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'email' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('email')}
                  >
                    {activeField === 'email' ? 'Зберегти' : 'Редагувати'}
                  </button>
                </div>

                <div className={editProfileStyles.buttonDiv}>
                  <button 
                    type="button" 
                    onClick={this.handleSaveChanges} 
                    className={editProfileStyles.textFactoryButton}
                  >
                    Зберегти зміни
                  </button>
                </div>
              </div>
            </div>
          )}
        
          <div className={editProfileStyles.rightSide}>
            <h1>Редагування резюме</h1>
            {myResume ? (
              <div className={editProfileStyles.editResume}>
                <h1>Розглядаю посади:</h1>
                <div className={editProfileStyles.desiredPositionDiv}>
                  <div className={editProfileStyles.desiredPositionDivButton}>
                  {activeField === 'desired_p_1' ? (
                    <input 
                      type="text" 
                      value={myResume.desired_position_1 || ""} 
                      onChange={(e) => this.handleInputChange(e, 'desired_p_1')}
                      className={editProfileStyles.editInput}
                    />
                    ) : myResume.desired_position_1 ? (
                      <h3>{myResume.desired_position_1}</h3>
                    ) : (
                      <h3>Вкажіть назву посади</h3>
                  )}
                    <button type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'desired_p_1' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('desired_p_1')}>{activeField === 'desired_p_1' ? 'Зберегти' : 'Редагувати'}</button>
                  </div>
                  

                  <div className={editProfileStyles.desiredPositionDivButton}>
                    {activeField === 'desired_p_2' ? (
                    <input 
                      type="text" 
                      value={myResume.desired_position_2 || ""} 
                      onChange={(e) => this.handleInputChange(e, 'desired_p_2')}
                      className={editProfileStyles.editInput}
                    />
                    ) : myResume.desired_position_2 ? (
                      <h3>{myResume.desired_position_2}</h3>
                    ): (
                      <h3>Вкажіть назву посади</h3>
                    )}
                    <button type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'desired_p_2' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('desired_p_2')}>{activeField === 'desired_p_2' ? 'Зберегти' : 'Редагувати'}</button>
                  </div>

                  <div className={editProfileStyles.desiredPositionDivButton}>
                    {activeField === 'desired_p_3' ? (
                    <input 
                      type="text" 
                      value={myResume.desired_position_3 || ""} 
                      onChange={(e) => this.handleInputChange(e, 'desired_p_3')}
                      className={editProfileStyles.editInput}
                    />
                    ) : myResume.desired_position_3 ? (
                      <h3>{myResume.desired_position_3}</h3>
                    ): (
                      <h3>Вкажіть назву посади</h3>
                    )}
                    <button type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'desired_p_3' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('desired_p_3')}>{activeField === 'desired_p_3' ? 'Зберегти' : 'Редагувати'}</button>
                  </div>
                  
                  <div className={editProfileStyles.desiredPositionDivButton}>
                    {activeField === 'salary_price' ? (
                    <input 
                      type="text" 
                      value={myResume.salary_price || ""} 
                      onChange={(e) => this.handleInputChange(e, 'salary_price')}
                      className={editProfileStyles.editInput}
                    />
                    ) : (
                      <h3>Бажана зарплата: {myResume.salary_price || "Не вказано"}</h3>
                    )}
                    
                    <button type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'salary_price' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('salary_price')}>{activeField === 'salary_price' ? 'Зберегти' : 'Редагувати'}</button>
                  </div>
                </div>
                
                <h1>Досвід роботи:</h1>
                {activeField === 'experience' ? (
                  <input 
                    type="text" 
                    value={myResume.experience || ""} 
                    onChange={(e) => this.handleInputChange(e, 'experience')}
                    className={editProfileStyles.editInput}
                  />
                  ) : (
                    <h4>{myResume.experience || "Не вказано"}</h4>
                )}
                <div className={editProfileStyles.buttonDiv}>
                  <button type="button" 
                    className={`${editProfileStyles.editInfoButton} ${activeField === 'experience' ? editProfileStyles.activeButton : ''}`}
                    onClick={() => this.toggleEdit('experience')}>{activeField === 'experience' ? 'Зберегти' : 'Редагувати'}</button>
                </div>
                
                <div className={editProfileStyles.saveDeleteButtonDiv}>
                  <button type="button" 
                  className={editProfileStyles.saveEditedButton}
                  onClick={this.handleSaveChangesResume} 
                  >Зберегти зміни резюме</button>

                  <button type="button" className={editProfileStyles.deleteButton}
                  onClick={this.handleDeleteResume}
                  >Видалити резюме</button>
                </div>
              </div>
            ) : (
              <div>
                <h2>Зараз в вас немає резюме</h2>
                <div className={editProfileStyles.buttonDiv}>
                  <button type="button" className={editProfileStyles.resumeFactoryButton}
                  onClick={this.handleCreateResume}>
                    Створити резюме
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EditProfilePage