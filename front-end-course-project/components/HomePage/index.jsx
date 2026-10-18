import homeStyles from "./HomePage.module.css"
import Header from "../Header"
import { useState } from 'react';

function HomePage() {
  const list_of_filters = [
    "IT", "Автобізнес та автосервіс", "Архітектура, дизайн інтер'єру", "Будівельна промисловість",
    "Бухгалтерія", "Видавництво", "Готельно-ресторанний бізнес", "Державні організації", "Енергетика", "ЗМІ", "Краса, фітнес, спорт",
    "Легка промисловість", "Маркетинг та реклама", "Машинобудування", "Медицина та охорона здоров'я", "Металургійна промисловість",
    "Нерухомість", "Оборонна промисловість", "Оптова торгівля", "Освіта", "Послуги для бізнесу", "Роздрібна торгівля",
    "Сили оборони", "Телекмунікації та зв'язок", "Транспорт та логістика", "Туризм", "Фінанси, банки, страхування",
    "Харчова промисловість", "Шоу-бізнес, мистецтво, культура", "Юриспруденція"
  ];

  // 'vacancy', 'resume'
  const [currentType, setCurrentType] = useState('vacancy');

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filterName) => {
    setSelectedFilters((prevSelected) => {
      if (prevSelected.includes(filterName)) {
        return prevSelected.filter(item => item !== filterName);
      } else {
        return [...prevSelected, filterName];
      }
    });
  };

  return (
    <div className={homeStyles.mainDivHomePage}>
      <Header />

      <div className={homeStyles.contentDivHomePage}>
        <div className={homeStyles.rightSide}>
          <div className={homeStyles.searchTypeDiv}>
            <div className={homeStyles.searchDiv}>Пошук</div>
            {currentType === 'vacancy' && (
              <>
                <button className={homeStyles.typeOfSearchSelectButton} onClick={() => setCurrentType('vacancy')}>Вакансії</button>
                <button className={homeStyles.typeOfSearchButton} onClick={() => setCurrentType('resume')}>Резюме</button>
              </>
            )}

            {currentType === 'resume' && (
              <>
                <button className={homeStyles.typeOfSearchButton} onClick={() => setCurrentType('vacancy')}>Вакансії</button>
                <button className={homeStyles.typeOfSearchSelectButton} onClick={() => setCurrentType('resume')}>Резюме</button>
              </>
            )}
          </div>

          {currentType === 'vacancy' && (
            <div className={homeStyles.exampleVacancy}>
              <div className={homeStyles.nameDiv}>
                <div className={homeStyles.textFactoryName}>Головний спеціаліст загального відділу</div>
                <div className={homeStyles.exampleFactoryPhoto}></div>
              </div>

              <div className={homeStyles.infoDiv}>
                <div className={homeStyles.textFactory}>Місто: Запоріжжя</div>
                <div className={homeStyles.textFactory}>Заробітна плата: 20 000 грн.</div>
              </div>

              <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
            </div>
          )}

          {currentType === 'resume' && (
            <div className={homeStyles.exampleResume}>
              <div className={homeStyles.nameDiv}>
                <div className={homeStyles.textFactoryName}>Ім’ев Призвищевич</div>
                <div className={homeStyles.exampleFactoryPhoto}></div>
              </div>

              <div className={homeStyles.infoDiv}>
                <div className={homeStyles.textFactory}>Місто: Запоріжжя</div>
                <div className={homeStyles.textFactory}>Галузь: ІТ</div>
                <div className={homeStyles.textFactory}>Бажана посада: Головний спеціаліст загального відділу</div>
                <div className={homeStyles.textFactory}>Бажана заробітна плата: 20 000 грн.</div>
              </div>

              <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
            </div>
          )}

        </div>

        <div className={homeStyles.extraSide}>
          <h2>Фільтрація</h2>

          <h3>Зарплата</h3>

          <div className={homeStyles.salaryDiv}>
            <h4>від:</h4>
            <select name="start" id="" className={homeStyles.salaryExample}>
              <option value="none"></option>
              <option value="10000">10 000грн.</option>
              <option value="20000">20 000грн.</option>
              <option value="50000">50 000грн.</option>
              <option value="100000">100 000грн.</option>
            </select>
          </div>

          <div className={homeStyles.salaryDiv}>
            <h4>до:</h4>
            <select name="start" id="" className={homeStyles.salaryExample}>
              <option value="none"></option>
              <option value="10000">10 000грн.</option>
              <option value="20000">20 000грн.</option>
              <option value="50000">50 000грн.</option>
              <option value="100000">100 000грн.</option>
            </select>
          </div>

          <h3>Сфера діяльності</h3>
          
          {list_of_filters.map((filterName, index) => (
            <label key={index} className={homeStyles.ThemeDiv}>
              <input
                type="checkbox"
                className={homeStyles.hiddenCheckbox}
                checked={selectedFilters.includes(filterName)}
                onChange={() => handleFilterChange(filterName)}
              />
              <div className={homeStyles.ThemeExample}></div>
              <h4>{filterName}</h4>
            </label>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default HomePage
