import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikRegisterStyles from "./FormikRegistration.module.css"

const RegisterForm = ({setScreen}) => {
  return (
    <Formik initialValues={{ text: ''}}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        console.log('Отправил:', values);
        resetForm();
        }
    }>
      {
      () => (
        <Form className={FormikRegisterStyles.form}>
          <div className={FormikRegisterStyles.authDiv}>
            <div className={FormikRegisterStyles.authFormDiv}>
              <div className={FormikRegisterStyles.authTextDiv}>
                <h1>Реєстрація</h1>
                <h2>Вкажіть деяку інформацію про себе</h2>
              </div>

              <div className={FormikRegisterStyles.registerFormInputDiv}>
                <h3>Ваша пошта</h3>
                <input type="text" />
                <h3>Ваш пароль</h3>
                <input type="text" />
                <h3>Повторіть пароль</h3>
                <input type="text" />
              </div>

              <div className={FormikRegisterStyles.authFormConfirmDiv}>
                <h2>Вже є аккаунт?</h2>
                <button type="button" className={FormikRegisterStyles.backButton} onClick={() => setScreen('login')}>
                  перейти до авторизації
                </button>
                <button onClick={() => setScreen('register-2')}>Підтвердити</button>
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