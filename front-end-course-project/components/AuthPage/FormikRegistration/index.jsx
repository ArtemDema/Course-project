import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikRegisterStyles from "./FormikRegistration.module.css";

const RegisterForm = ({ setScreen, registrationData, setRegistrationData }) => {
  return (
    <Formik
      initialValues={{
        email: registrationData.email,
        password: registrationData.password,
        password_confirm: registrationData.password_confirm,
      }}
      onSubmit={(values) => {
        setRegistrationData((prev) => ({ ...prev, ...values }));
        setScreen('register-2');
      }}
    >
      {() => (
        <Form className={FormikRegisterStyles.form}>
          <div className={FormikRegisterStyles.authDiv}>
            <div className={FormikRegisterStyles.authFormDiv}>
              <div className={FormikRegisterStyles.authTextDiv}>
                <h1>Реєстрація</h1>
                <h2>Вкажіть деяку інформацію про себе</h2>
              </div>

              <div className={FormikRegisterStyles.registerFormInputDiv}>
                <h3>Ваша пошта</h3>
                <Field type="email" name="email" placeholder="example@mail.com" required />
                
                <h3>Ваш пароль</h3>
                <Field type="password" name="password" required />
                
                <h3>Повторіть пароль</h3>
                <Field type="password" name="password_confirm" required />
              </div>

              <div className={FormikRegisterStyles.authFormConfirmDiv}>
                <h2>Вже є аккаунт?</h2>
                <button type="button" className={FormikRegisterStyles.backButton} onClick={() => setScreen('login')}>
                  перейти до авторизації
                </button>
                <button type="submit">Підтвердити</button> 
              </div>
            </div>
          </div>
        </Form>
      )
      }
    </Formik>
  );
};

export default RegisterForm;