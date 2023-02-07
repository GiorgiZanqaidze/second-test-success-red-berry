import React from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios';

export const ResumeThirdPage = () => {

  const { setFormData, formData} = useGlobalContext()
  const {name, surname, email, phone_number, image, about_me, experiences, educations} = formData

  const navigate = useNavigate()
  const ToLandingPage = () => {
      localStorage.removeItem("recent-image")
      localStorage.removeItem("form-data")
      localStorage.removeItem("experiences")
      localStorage.removeItem("educations")
      
      setFormData({
          "name": "",
          "surname": "",
          "email": "",
          "phone_number": "",
          "image": "",
          "about_me": "",
          "experiences": [],
          "educations": []
        })
        navigate('/')
  }

  
  let defaultArr;
  if (!educations || educations.length < 1) {
    defaultArr = [
      {
        "position": "",
        "employer": "",
        "start_date": "",
        "due_date": "",
        "description": "",
        "degree_id": ""
      }
    ]
  } else {
    defaultArr = [...educations]
  }


  const [optionValues, setOptionValues] = React.useState([])
  const [educationsArray, setEducationsArray] = React.useState(defaultArr)
  
  React.useEffect(() => {
    const options =  () => {
      axios.get('https://resume.redberryinternship.ge/api/degrees')
      .then(res => {
        setOptionValues(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    options() 
  }, [])
  

  const handleChangeInput = (index, event) => {
    const name = event.target.name
    const value = event.target.value
    

    let id;
    optionValues.forEach((item) => {
      if (item.title === event.target.value) {
        id = item.id
      }
    })

    
    let data = [...educationsArray]

    if (id) {
      data[index].degree_id = id
    } else {
      data[index].degree_id = ""
    }

    data[index][name] = value

    setFormData((prev) => {
      return (
        {...prev, educations: [...educationsArray]}
      )
    })
      
    localStorage.setItem('educations', [JSON.stringify(educationsArray)])
  }
  
  
  const toSecondPage = (e) => {
    e.preventDefault()
    navigate('/second_page')
  }

  const addField = (e) => {
    e.preventDefault()

    setEducationsArray((prev) => {
      return ([...prev, {
        "institute": "",
        "degree": "",
        "due_date": "",
        "description": "",
        "degree_id": ""
      }])
    })
  }

  const submitData = (e) => {
    e.preventDefault()
    // setFormData((pre) => {
    //   return {
    //     ...pre,
    //     image: "/storage/images/0rI7LyNRJRrokoSKUTb9EKvNuyYFKOvUmDQWoFt6.png"
    //   }
    // })

    console.log(formData.image)  

    axios.post("https://resume.redberryinternship.ge/api/cvs", {
      name,
      surname,
      email,
      phone_number,
      image,
      about_me,
      experiences,
      educations
    })
    .then(res => console.log('posting data', res))
    .catch(error => console.log(error))
    
    navigate('/result_resume')

  }
  

  return (
    <div className='main-page'>
      <section className='single-part-resume side-paddings bg-dark-white'>
        <header>
          <div>
            <img src={Vector} alt="vector" onClick={ToLandingPage}/>
          </div>
          <div className='info'>
            <h1>განათლება</h1>
            <h2>3/3</h2>
          </div>
        </header>
        <form className='second-page-form'>
          {educationsArray && educationsArray.map((form, index) => {

            const {institute, degree, due_date, description} = form

            return (
              <div key={index} className="form-container">
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='institute' >სასწავლებელი</label>
                    <input type="text" name='institute' id="institute" placeholder='სასწავლებელი' className='width-100' onChange={(event) => handleChangeInput(index, event)} value={institute}/>
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='two-input-container'>
                  <div className='form-controller'>
                   <label htmlFor='degree' >ხარისხი</label>
                    <select name="degree" id="degree" onChange={(event) => handleChangeInput(index, event)} value={degree}>
                      <option value="აირჩიეთ ხარისხი">აირჩიეთ ხარისხი</option>
                      {optionValues.map((option, index) => {
                        return <option value={option.title} key={index}>{option.title}</option>
                      })}
                    </select>
                  </div>
                  <div className='form-controller'>
                      <label htmlFor='due_date' >დამთავრების რიცხვი</label>
                      <input type="date" name='due_date' id="due_date"  onChange={(event) => handleChangeInput(index, event)} value={due_date}/>
                      <p className='alert'></p>
                  </div>
                </div>
                <div className='form-controller grit-item'>
                    <label htmlFor='description' >აღწერა</label>
                    <textarea style={{width: "750px", maxWidth: "750px"}} id='description' name='description' type="text" placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' onChange={(event) => handleChangeInput(index, event)} value={description}/>
                </div>
              </div>
            )
          })}
          <div className='add-experience-btn'>
              <button className='bg-blue border-radius white-font' onClick={addField} >მეტი გამოცდილების დამატება</button>
          </div>
          <div className='button-container two-input-container'>
            <button className='bg-dark-blue border-radius white-font' onClick={toSecondPage}>უკან</button>
            <button className='bg-dark-blue border-radius white-font' onClick={submitData}>შემდეგი</button>
          </div>
        </form>
      </section>
      <section className='resume-builder side-paddings bg-white'>
        <ResumeBuilder />
      </section>
    </div>
  )
}





