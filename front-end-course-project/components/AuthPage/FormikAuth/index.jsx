import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikAuthStyles from "./FormikAuth.module.css"

const AuthForm = ({setScreen}) => {
  return (
    <Formik initialValues={{ text: ''}}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        const response = await fetch('http://127.0.0.1:8000/login/', {
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
        <Form className={FormikAuthStyles.form}>
            <div className={FormikAuthStyles.authDiv}>
                <div className={FormikAuthStyles.authFormDiv}>
                <div className={FormikAuthStyles.authTextDiv}>
                    <h1>Авторизація</h1>
                    <h2>Увійдіть у свій аккаунт</h2>
                </div>

                <div className={FormikAuthStyles.authFormInputDiv}>
                    <h3>Ваша пошта</h3>
                    <input type="text" />
                    <h3>Ваш пароль</h3>
                    <input type="text" />
                </div>

                <div className={FormikAuthStyles.authFormConfirmDiv}>
                    <h2>У Вас немає аккаунта?</h2>
                    <button type="button" className={FormikAuthStyles.backButton} onClick={() => setScreen('register-1')}>
                    перейти до реєстрації
                    </button>
                    <button type="button" onClick={() => setScreen('register-1')}>
                    Підтвердити</button>
                </div>
                </div>
            </div>
        </Form>
      )
      }
    </Formik>
  );
};

export default AuthForm;