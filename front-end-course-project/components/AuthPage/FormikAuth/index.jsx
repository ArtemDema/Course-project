import { Formik, Form, Field } from 'formik';
import api from '../../Api/index.jsx';
import FormikAuthStyles from "./FormikAuth.module.css";

const AuthForm = ({ setScreen }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }} 
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await api.post('token/', {
            email: values.email, 
            password: values.password
          });

          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          
          window.location.href = '/'; 
          
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={FormikAuthStyles.form}>
          <div className={FormikAuthStyles.authDiv}>
            <div className={FormikAuthStyles.authFormDiv}>
              <div className={FormikAuthStyles.authTextDiv}>
                <h1>Авторизація</h1>
                <h2>Увійдіть у свій аккаунт</h2>
              </div>

              <div className={FormikAuthStyles.authFormInputDiv}>
                <h3>Ваша пошта</h3>
                <Field type="email" name="email" placeholder="example@mail.com" required />
                
                <h3>Ваш пароль</h3>
                <Field type="password" name="password" required />
            </div>

              <div className={FormikAuthStyles.authFormConfirmDiv}>
                <h2>У Вас немає аккаунта?</h2>
                <button 
                  type="button" 
                  className={FormikAuthStyles.backButton} 
                  onClick={() => setScreen('register-1')}
                >
                  перейти до реєстрації
                </button>
                <button type="submit" disabled={isSubmitting}>Підтвердити</button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;