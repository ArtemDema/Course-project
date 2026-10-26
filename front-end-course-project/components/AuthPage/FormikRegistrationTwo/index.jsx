import { Formik, Form, Field } from 'formik';
import { publicApi } from '../../Api'; 
import FormikRegisterTwoStyles from "./FormikRegistrationTwo.module.css";


const RegisterFormTwo = ({ setScreen, registrationData, setRegistrationData }) => {
  return (
    <Formik
      initialValues={{
        first_name: registrationData.first_name || '',
        last_name: registrationData.last_name || '',
        role: registrationData.role || '',
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const fullRegistrationData = { ...registrationData, ...values };

        try {
          const response = await publicApi.post('register/', fullRegistrationData);
          setScreen('login');
        } catch (err) {
          console.error("Ошибка регистрации:", err.response?.data);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={FormikRegisterTwoStyles.form}>
          <div className={FormikRegisterTwoStyles.authDiv}>
            <div className={FormikRegisterTwoStyles.authFormDiv}>
              <div className={FormikRegisterTwoStyles.authTextDiv}>
                <h1>Реєстрація</h1>
                <h2>Введіть інформацію про себе</h2>
              </div>

              <div className={FormikRegisterTwoStyles.registerFormInputTwoDiv}>
                <h3>Ваше ім’я</h3>
                <Field type="text" name="first_name" required />
                
                <h3>Ваше прізвище</h3>
                <Field type="text" name="last_name" required />
                
                <h3>Ким ви є?</h3>
                <div className={FormikRegisterTwoStyles.roleButtonsDiv}>
                  <button 
                    type="button" 
                    id={FormikRegisterTwoStyles.worker}
                    className={values.role === 'worker' ? FormikRegisterTwoStyles.activeRole : ''} 
                    onClick={() => setFieldValue('role', 'worker')}
                  >
                    Я працівник
                  </button>
                  
                  <button 
                    type="button" 
                    id={FormikRegisterTwoStyles.owner}
                    className={values.role === 'owner' ? FormikRegisterTwoStyles.activeRole : ''} 
                    onClick={() => setFieldValue('role', 'owner')}
                  >
                    Я власник
                  </button>
                </div>
              </div>

              <div className={FormikRegisterTwoStyles.authFormConfirmDiv}>
                <button 
                  type="button" 
                  className={FormikRegisterTwoStyles.backButton} 
                  onClick={() => {
                    setRegistrationData((prev) => ({ ...prev, ...values }));
                    setScreen('register-1');
                  }}
                >
                  повернутися до попередньої форми
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

export default RegisterFormTwo;