import authStyles from "./AuthPage.module.css"


function AuthPage() {
  return(
    <div className={authStyles.mainDiv}>
      <header id={authStyles.header}>
        <h1>Ласкаво просимо на сайт!</h1>
      </header>

      <div className={authStyles.contentDiv}>

        {/* Авторизация */}
        <div className={authStyles.authDiv}>
          <div className={authStyles.authFormDiv}>
            <div className={authStyles.authTextDiv}>
              <h1>Авторизація</h1>
              <h2>Увійдіть у свій аккаунт</h2>
            </div>

            <div className={authStyles.authFormInputDiv}>
              <h3>Ваша пошта</h3>
              <input type="text" />
              <h3>Ваш пароль</h3>
              <input type="text" />
            </div>

            <div className={authStyles.authFormConfirmDiv}>
              <h2>В Вас немає аккаунта?</h2>
              <h2>перейти до регістрації</h2>
              <button>Підтвердити</button>
            </div>
          </div>
        </div>
        {/* Регистрация */}
        {/* <div className={authStyles.authDiv}>
          <div className={authStyles.authFormDiv}>
            <div className={authStyles.authTextDiv}>
              <h1>Регістрація</h1>
              <h2>Вкажіть деяку інформацію про себе</h2>
            </div>

            <div className={authStyles.registerFormInputDiv}>
              <h3>Ваша пошта</h3>
              <input type="text" />
              <h3>Ваш пароль</h3>
              <input type="text" />
              <h3>Повторіть пароль</h3>
              <input type="text" />
            </div>

            <div className={authStyles.authFormConfirmDiv}>
              <h2>В Вас немає аккаунта?</h2>
              <h2>перейти до регістрації</h2>
              <button>Підтвердити</button>
            </div>
          </div>
        </div> */}

        {/* Регистрация часть 2 */}
          {/* <div className={authStyles.authDiv}>
          <div className={authStyles.authFormDiv}>
            <div className={authStyles.authTextDiv}>
              <h1>Регістрація</h1>
              <h2>Введіть інформацію про себе</h2>
            </div>

            <div className={authStyles.registerFormInputTwoDiv}>
              <h3>Ваше ім’я</h3>
              <input type="text" />
              <h3>Ваше призвище</h3>
              <input type="text" />
              <h3>Ким ви є?</h3>
              <div>
                <button type="button" id={authStyles.worker}>Я працівник</button>
                <button type="button" id={authStyles.owner}>Я власник</button>
              </div>
            </div>

            <div className={authStyles.authFormConfirmDiv}>
              <h2>повернутися до попередньої форми</h2>
              <button>Підтвердити</button>
            </div>
          </div>
        </div> */}

        {/* Подтверждение почты */}
        {/* <div className={authStyles.authDiv}>
          <div className={authStyles.authFormDiv}>
            <div className={authStyles.authTextDiv}>
              <h1>Підтвердіть свою пошту</h1>
              <h2>Код відправлено вам на вказану пошту</h2>
            </div>

            <div className={authStyles.authFormInputDiv}>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>

            <div className={authStyles.authFormConfirmDiv}>
              <h2>Помилились або бажаєте щось змінити?</h2>
              <h2>повернутися до регістрації</h2>
              <button>Підтвердити</button>
            </div>
          </div>
        </div> */}

      </div>

    </div>

  )
}

export default AuthPage