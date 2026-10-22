import authStyles from "./AuthPage.module.css"
import { useState } from 'react';
import AuthForm from "./FormikAuth";
import RegisterForm from "./FormikRegistration";
import RegisterFormTwo from "./FormikRegistrationTwo";

function AuthPage() {
  // 'login', 'register-1', 'register-2'
  const [currentScreen, setCurrentScreen] = useState('login');

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    role: ''
  });

  return (
    <div className={authStyles.mainDiv}>
      <header id={authStyles.header}>
        <h1>Ласкаво просимо на сайт!</h1>
      </header>

      <div className={authStyles.contentDiv}>
        
        {/* Авторизация */}
        {currentScreen === 'login' && (
          <AuthForm setScreen={setCurrentScreen} />
        )}

        {/* Регистрация */}
        {currentScreen === 'register-1' && (
          <RegisterForm 
            setScreen={setCurrentScreen} 
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
          />
        )}

        {/* Регистрация 2 */}
        {currentScreen === 'register-2' && (
          <RegisterFormTwo 
            setScreen={setCurrentScreen} 
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
          />
        )}

      </div>
    </div>
  );
}

export default AuthPage;