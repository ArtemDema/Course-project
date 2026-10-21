import { Formik, Form, Field } from 'formik';
import api from '../../Api/index.jsx';
import FormikConfirmStyles from "./FormikConfirm.module.css";

const ConfirmForm = ({ setScreen }) => {
  const initialCodeValues = Array(8).fill('');

  const handleInputChange = (e, index, setFieldValue) => {
    const val = e.target.value;
    
    if (!/^[0-9]?\$/.test(val)) return;

    setFieldValue(`code[${index}]`, val);

    if (val && index < 7) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <Formik
      initialValues={{ code: initialCodeValues }}
      onSubmit={async (values, { setSubmitting }) => {
        const fullCode = values.code.join('');

        try {
          const response = await api.post('confirm/', { code: fullCode });
          
          setScreen('login'); 
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={FormikConfirmStyles.form}>
          <div className={FormikConfirmStyles.confrimDiv}>
            <div className={FormikConfirmStyles.authFormDiv}>
              <div className={FormikConfirmStyles.authTextDiv}>
                <h1>Підтвердіть свою пошту</h1>
                <h2>Код відправлено вам на вказану пошту</h2>
              </div>

              <div className={FormikConfirmStyles.confrimFormInputDiv}>
                {initialCodeValues.map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    value={values.code[index] || ''}
                    onChange={(e) => handleInputChange(e, index, setFieldValue)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoComplete="one-time-code"
                    style={{ width: '40px', textBreak: 'none', textAlign: 'center', margin: '0 4px' }}
                  />
                ))}
              </div>

              <div className={FormikConfirmStyles.authFormConfirmDiv}>
                <h2>Помилились або бажаєте щось змінити?</h2>
                <button 
                  type="button" 
                  className={FormikConfirmStyles.backButton} 
                  onClick={() => setScreen('register-2')}
                >
                  повернутися до реєстрації
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

export default ConfirmForm;