import React from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context'
import '../css/secondPage.css'

export const ResumeSecondPage = () => {

  
  const navigate = useNavigate()
  const ToLandingPage = () => {
        localStorage.removeItem("recent-image")
        localStorage.removeItem("form-data")
        localStorage.removeItem("experiences")

        setFormData({
            "name": "",
            "surname": "",
            "email": "",
            "phone_number": "",
            "image": "",
            "about_me": "",
            "experiences": []
        })
        navigate('/')
    }

  const { setFormData, formData} = useGlobalContext()
  const {experiences} = formData

  let defaultArr;
  if (experiences.length < 1) {
    defaultArr = [
      {
        "position": "",
        "employer": "",
        "start_date": "",
        "due_date": "",
        "description": ""
      }
    ]
  } else {
    defaultArr = [...experiences]
  }

  const [experienceArray, setExperienceArray] = React.useState(defaultArr)

  const toFirstPage = (e) => {
    e.preventDefault()
    navigate('/first_page')
  }


  const toThirdPage = (e) => {
    e.preventDefault()
    navigate('/third_page')
  }

  const handleChangeInput = (index, event) => {
    const name = event.target.name
    const value = event.target.value

    let data = [...experienceArray]

    data[index][name] = value

    setFormData((prev) => {
      return (
        {...prev, experiences: [...experienceArray]}
      )
    })
      
    localStorage.setItem('experiences', [JSON.stringify(experienceArray)])
  }

  const addField = (e) => {
    e.preventDefault()
    
    setExperienceArray((prev) => {
      return ([...prev, {
        "position": "",
        "employer": "",
        "start_date": "",
        "due_date": "",
        "description": ""
      }])
    })
  }


  return (
    <div className='main-page'>
      <section className='single-part-resume side-paddings bg-dark-white'>
        <header>
          <div>
              <img src={Vector} alt="vector" onClick={ToLandingPage}/>
          </div>
          <div className='info'>
            <h1>გამოცდილება</h1>
            <h2>2/3</h2>
          </div>
        </header>
        <form className='second-page-form'>
          {experienceArray && experienceArray.map((form, index) => {

            const {position, employer, start_date, due_date, description} = form

            return (
              <div key={index} className="form-container">
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='position' >თანამდებობა</label>
                    <input type="text" name='position' id="position" placeholder='თანამდებობა' className='width-100' onChange={(event) => handleChangeInput(index, event)} value={position}/>
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='employer' >დამსაქმებელი</label>
                    <input type="text" name='employer' id="employer" placeholder='დამსაქმებელი' className='width-100' onChange={(event) => handleChangeInput(index, event)} value={employer}/>
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='two-input-container'>
                  <div className='form-controller'>
                      <label htmlFor='start_date' >დაწყების რიცხვი</label>
                      <input type="date" name='start_date' id="start_date" placeholder='მუმლაძე' onChange={(event) => handleChangeInput(index, event)} value={start_date}/>
                      <p className='alert'></p>
                  </div>
                  <div className='form-controller'>
                      <label htmlFor='due_date' >დამთავრების რიცხვი</label>
                      <input type="date" name='due_date' id="due_date" placeholder='მუმლაძე' onChange={(event) => handleChangeInput(index, event)} value={due_date}/>
                      <p className='alert'></p>
                  </div>
                </div>
                <div className='form-controller grit-item'>
                    <label htmlFor='description' >აღწერა</label>
                    <textarea style={{width: "600px", maxWidth: "600px"}}  id='description' name='description' type="text" placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' onChange={(event) => handleChangeInput(index, event)} value={description}/>
                </div>
              </div>
            )
          })}
          <div className='add-experience-btn'>
              <button className='bg-blue border-radius white-font' onClick={addField}>მეტი გამოცდილების დამატება</button>
          </div>
          <div className='button-container two-input-container'>
            <button className='bg-dark-blue border-radius white-font' onClick={toFirstPage}>უკან</button>
            <button className='bg-dark-blue border-radius white-font' onClick={toThirdPage}>შემდეგი</button>
          </div>
        </form>
      </section>
      <section className='resume-builder side-paddings bg-white'>
        <ResumeBuilder />
      </section>
    </div>
  )
}





