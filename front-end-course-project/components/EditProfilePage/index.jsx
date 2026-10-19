import editProfileStyles from "./EditProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditProfilePage extends React.Component {
  state = {
    details: null,
    activeField: null
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/user/me/") //----------------------
      .then(responce => {
        this.setState({
          details: responce.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  toggleEdit = (field) => {
    this.setState({
      activeField: this.state.activeField === field ? null : field
    });
  };

  handleInputChange = (e, field) => {
    this.setState({
      details: {
        ...this.state.details,
        [field]: e.target.value
      }
    });
  };

  handleSaveChanges = () => {
    const { details } = this.state;
    
    if (!details) return;

    const dataToSend = { ...details };
    
    delete dataToSend.date_joined;
    delete dataToSend.id;
    delete dataToSend.phone_number;

    axios.patch("http://127.0.0.1:8000/user/me/", dataToSend)
      .then(responce => {
        this.setState({ 
          activeField: null,
          details: responce.data
        });
      })
      .catch(error => {
        console.error("Oшибкa:", error);
      });
  };

  render() {
    const { details, activeField } = this.state;
    return (
      <div className={editProfileStyles.mainDivEditProfilePage}>
        <Header typeOfScreen={"settings"} />

        <div className={editProfileStyles.contentDivEditProfilePage}>
          {details && (
            <div className={editProfileStyles.leftSide}>
              <div className={editProfileStyles.avatar}></div>

              <button type="button" className={editProfileStyles.editProfilePhoto}>Редагувати фото профіля</button>

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
            <h2>Зараз в вас немає резюме</h2>

            <div className={editProfileStyles.buttonDiv}>
              <button type="button" className={editProfileStyles.resumeFactoryButton}>Створити резюме</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditProfilePage