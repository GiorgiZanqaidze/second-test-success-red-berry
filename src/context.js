import React, {useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    // image url from local storage
    let image;
    if (localStorage.getItem("recent-image")) {
    image = localStorage.getItem("recent-image")
    } else {
        image = ""
    }

    let experiences;

    if (JSON.parse(localStorage.getItem(('experiences'))) === null) {
        experiences = [
            {
                "position": "",
                "employer": "",
                "start_date": "",
                "due_date": "",
                "description": ""
            }
        ]
    } else {
        experiences = JSON.parse(localStorage.getItem(('experiences')))
    }


    // data from local storage
    let data;
    if (JSON.parse(localStorage.getItem("form-data"))) {
        data = JSON.parse(localStorage.getItem("form-data"))
    } else {
        data = {
            "name": "",
            "surname": "",
            "email": "",
            "phone_number": "",
            "image": image,
            "about_me": "",
            "experiences": [...experiences],
            "educations": []
        }
    }

    
    const [formData, setFormData] = React.useState(data)
  
    React.useEffect(() => {
      setFormData(prev => {
        return {
            ...prev,
            image: image,
        }
      })
    }, [image])


    const handleChange = (e) => {
        const name = e.currentTarget.name
        let value = e.currentTarget.value

        

        // if input type is file
        if (name === "image") {
            const fileUrl = e.target.files[0];
            console.log(fileUrl)
            const fr = new FileReader()
            
            fr.addEventListener('load', () => {
              const url = fr.result
              localStorage.setItem('recent-image', url)
              value = url
            })

            fr.readAsDataURL(fileUrl)
            value = URL.createObjectURL(fileUrl)
        }   
    
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        localStorage.setItem('form-data', JSON.stringify(formData))
    }, [formData])

    
  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }