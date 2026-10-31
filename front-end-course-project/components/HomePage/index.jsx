import homeStyles from "./HomePage.module.css"
import Header from "../Header"
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class HomePage extends React.Component {
  state = {
    vacancies: [],
    resumes: [],
    currentType: 'vacancy',
    selectedFilters: [],


    searchPosition: '',
    salaryMin: 'none',
    salaryMax: 'none'
  }

  componentDidMount() {
    Promise.all([
      axios.get("http://127.0.0.1:8000/vacancy/"),
      axios.get("http://127.0.0.1:8000/resume/")
    ])
    .then(([vacanciesResponse, resumesResponse]) => {
      this.setState({
        vacancies: vacanciesResponse.data,
        resumes: resumesResponse.data
      });
    })
    .catch(error => {
      console.log("Помилка завантаження даних:", error);
    });
  }

  list_of_filters = [
    "IT", "Автобізнес та автосервіс", "Архітектура, дизайн інтер'єру", "Будівельна промисловість",
    "Бухгалтерія", "Видавництво", "Готельно-ресторанний бізнес", "Державні організації", "Енергетика", "ЗМІ", "Краса, фитнес, спорт",
    "Легка промисловість", "Маркетинг та реклама", "Машинобудування", "Медицина та охорона здоров'я", "Металургійна промисловість",
    "Нерухомість", "Оборонна промисловість", "Оптова торгівля", "Освіта", "Послуги для бізнесу", "Роздрібна торгівля",
    "Сили оборони", "Телекмунікації та зв'язок", "Транспорт та логістика", "Туризм", "Фінанси, банки, страхування",
    "Харчова промисловість", "Шоу-бізнес, мистецтво, культура", "Юриспруденція"
  ];

  handleTypeChange = (newType) => {
    this.setState({ currentType: newType });
  };

  handleFilterChange = (filterName) => {
    this.setState((prevState) => {
      const { selectedFilters } = prevState;
      if (selectedFilters.includes(filterName)) {
        return { selectedFilters: selectedFilters.filter(item => item !== filterName) };
      } else {
        return { selectedFilters: [...selectedFilters, filterName] };
      }
    });
  };

  handleResumeView = (id) => {
    window.location.href = `http://localhost:5173/resume/${id}`;
  };

  handleVacancyView = (id) => {
    window.location.href = `http://localhost:5173/vacancy/${id}`;
  };

  render() {
    const { 
      vacancies, 
      resumes, 
      currentType, 
      selectedFilters, 
      searchPosition, 
      salaryMin, 
      salaryMax 
    } = this.state;

    const currentData = currentType === 'vacancy' ? vacancies : resumes;

    const filteredData = currentData.filter(item => {
      if (searchPosition) {
        const search = searchPosition.toLowerCase().trim();

        if (currentType === 'vacancy') {
          const position = String(item.desired_position || '').toLowerCase();
          if (!position.includes(search)) return false;
        } else {
          const pos1 = String(item.desired_position_1 || '').toLowerCase();
          const pos2 = String(item.desired_position_2 || '').toLowerCase();
          const pos3 = String(item.desired_position_3 || '').toLowerCase();

          if (!pos1.includes(search) && !pos2.includes(search) && !pos3.includes(search)) {
            return false;
          }
        }
      }

      const itemSalary = item.salary_price ? Number(String(item.salary_price).replace(/\s/g, '')) : 0;
      if (salaryMin !== 'none' && itemSalary) {
        if (itemSalary < Number(salaryMin)) return false;
      }

      if (salaryMax !== 'none' && itemSalary) {
        if (itemSalary > Number(salaryMax)) return false;
      }

      if (selectedFilters.length > 0) {
        const itemSphere = currentType === 'vacancy' ? item.type_of_vacancy : item.type_of_resume;
        
        if (!itemSphere || !selectedFilters.includes(itemSphere)) return false;
      }

      return true;
    });

    return (
      <div className={homeStyles.mainDivHomePage}>
        <Header typeOfScreen={"main"} />

        <div className={homeStyles.contentDivHomePage}>
          <div className={homeStyles.rightSide}>
            <div className={homeStyles.searchTypeDiv}>
              
              <input
                type="text" 
                placeholder={currentType === 'vacancy' ? "Пошук за посадою..." : "Пошук бажаної посади..."}
                value={searchPosition}
                onChange={(e) => this.setState({ searchPosition: e.target.value })}
                className={homeStyles.searchInput} 
              />
              {currentType === 'vacancy' && (
                <>
                  <button className={homeStyles.typeOfSearchSelectButton} onClick={() => this.handleTypeChange('vacancy')}>Вакансії</button>
                  <button className={homeStyles.typeOfSearchButton} onClick={() => this.handleTypeChange('resume')}>Резюме</button>
                </>
              )}

              {currentType === 'resume' && (
                <>
                  <button className={homeStyles.typeOfSearchButton} onClick={() => this.handleTypeChange('vacancy')}>Вакансії</button>
                  <button className={homeStyles.typeOfSearchSelectButton} onClick={() => this.handleTypeChange('resume')}>Резюме</button>
                </>
              )}
            </div>

            {filteredData.map((item, index) => (
              <div 
                key={item.id || index} 
                className={currentType === 'vacancy' ? homeStyles.exampleVacancy : homeStyles.exampleResume}
              >
                <div className={homeStyles.nameDiv}>
                  <div className={homeStyles.textFactoryName}>
                    
                    
                    {currentType === 'vacancy' ? item.desired_position : item.owner}
                  </div>
                  <div className={homeStyles.exampleFactoryPhoto}>
                    {item.avatar ? (
                      <img 
                        src={`http://127.0.0.1:8000${item.avatar}`} 
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (<></>)}
                  </div>
                </div>

                <div className={homeStyles.infoDiv}>
                  {currentType === 'resume' && (
                    <>
                      <div className={homeStyles.textFactory}>
                        Бажані посади: {item.desired_position_1}
                      </div>
                      {item.type_of_resume && <div className={homeStyles.textFactory}>Галузь: {item.type_of_resume}</div>}
                    </>
                  )}
                  
                  <div className={homeStyles.textFactory}>Досвід роботи: {item.experience || "Без досвіду"}</div>
                  <div className={homeStyles.textFactory}>Заробітна плата: {item.salary_price || "Не вказано"} грн.</div>
                </div>

                {currentType === 'resume' ? (
                  <button type="button" className={homeStyles.textFactoryButton}
                onClick={() => this.handleResumeView(item.id)}>Показати більше</button>
                ) : (
                  <button type="button" className={homeStyles.textFactoryButton}
                onClick={() => this.handleVacancyView(item.owner)}>Показати більше</button>
                )}
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className={homeStyles.noResults} style={{textAlign: 'center', marginTop: '20px'}}>
                Нічого не знайдено за вашими критеріями
              </div>
            )}

          </div>

          <div className={homeStyles.extraSide}>
            <h2>Фільтрація</h2>

            <h3>Зарплата</h3>

            <div className={homeStyles.salaryDiv}>
              <h4>від:</h4>
              <select 
                name="start" 
                value={salaryMin} 
                onChange={(e) => this.setState({ salaryMin: e.target.value })} 
                className={homeStyles.salaryExample}
              >
                <option value="none">Будь-яка</option>
                <option value="10000">10 000грн.</option>
                <option value="20000">20 000грн.</option>
                <option value="50000">50 000грн.</option>
                <option value="100000">100 000грн.</option>
              </select>
            </div>

            <div className={homeStyles.salaryDiv}>
              <h4>до:</h4>
              <select 
                name="end" 
                value={salaryMax} 
                onChange={(e) => this.setState({ salaryMax: e.target.value })} 
                className={homeStyles.salaryExample}
              >
                <option value="none">Будь-яка</option>
                <option value="10000">10 000грн.</option>
                <option value="20000">20 000грн.</option>
                <option value="50000">50 000грн.</option>
                <option value="100000">100 000грн.</option>
              </select>
            </div>

            <h3>Сфера діяльності</h3>
            
            {this.list_of_filters.map((filterName, index) => (
              <label key={index} className={homeStyles.ThemeDiv}>
                <input
                  type="checkbox"
                  className={homeStyles.hiddenCheckbox}
                  checked={selectedFilters.includes(filterName)}
                  onChange={() => this.handleFilterChange(filterName)}
                />
                <div className={homeStyles.ThemeExample}></div>
                <h4>{filterName}</h4>
              </label>
            ))}
            
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;