import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikConfirmStyles from "./FormikConfirm.module.css"

const ConfirmForm = ({setScreen}) => {
  return (
    <Formik initialValues={{ text: ''}}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        const response = await fetch('http://127.0.0.1:8000/confirm/', {
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
        <Form className={FormikConfirmStyles.form}>
          <div className={FormikConfirmStyles.confrimDiv}>
            <div className={FormikConfirmStyles.authFormDiv}>
              <div className={FormikConfirmStyles.authTextDiv}>
                <h1>Підтвердіть свою пошту</h1>
                <h2>Код відправлено вам на вказану пошту</h2>
              </div>

              <div className={FormikConfirmStyles.confrimFormInputDiv}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </div>

              <div className={FormikConfirmStyles.authFormConfirmDiv}>
                <h2>Помилились або бажаєте щось змінити?</h2>
                <button type="button" className={FormikConfirmStyles.backButton} onClick={() => setScreen('register-2')}>
                  повернутися до реєстрації
                </button>
                <button>Підтвердити</button>
              </div>
            </div>
          </div>
        </Form>
      )
      }
    </Formik>
  );
};

export default ConfirmForm;