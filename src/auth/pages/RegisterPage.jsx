import { useEffect, useState } from "react"
import { Input } from "../components"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useAuthStore } from "../../hooks/useAuthStore"
import Swal from "sweetalert2"
import { Navigate } from "react-router-dom"

const formValidations = {
  email: [((value) => value.length > 5), 'Email is required'],
  name: [((value) => value.length > 5), 'Name is required'],
  lastName: [((value) => value.length > 5), 'LastName is required'],
  age: [((value) => value.length > 0), 'Age is required'],
  password: [((value) => value.length > 4), 'Password is required']
}

const formData = { email: '', password: '', name: '', lastName: '', age: '', password2: '' }

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [redirect, setRedirect] = useState(false) 
  const { startRegister, errorMessage } = useAuthStore()

  const { onChange, email, password, name, lastName, age, password2, validForm, emailValid, passwordValid, nameValid, password2Valid, lastNameValid, ageValid} = useForm(formData, formValidations)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validForm) return setFormSubmitted(true)
    if (password !== password2) {
      Swal.fire('Error en el registro', ' Contraseñas no son iguales', 'error')
      return
    }
    startRegister({
      first_name: name,
      last_name: lastName,
      email,
      age:+age,
      password
    })
    if (errorMessage === undefined) {
      setRedirect(true)
    }
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire({
        title:'Error in authentication',
        text:errorMessage,
        icon:'error'
      })
    }
  }, [errorMessage])
  
  if (redirect) {
    return <Navigate to='/auth/login' replace={true} />
  }

  return (
    <AuthLayout onSubmit={handleSubmit} namePage={'Register'} buttonName={'Register'} message={"Do you have account?"} messageLink={"Enter here!"} route={'/auth/login'}>
      <Input name="name" type='text' onChange={onChange} nameV={name} />
      <span className={`text-sm text-error ${!!nameValid && formSubmitted ? 'visible' : 'hidden'}`} >{nameValid}</span>
      <Input name="lastName" type='text' onChange={onChange} nameV={lastName} />
      <span className={`text-sm text-error ${!!lastNameValid && formSubmitted ? 'visible' : 'hidden'}`} >{lastNameValid}</span>
      <Input name="email" type='email' onChange={onChange} nameV={email} />
      <span className={`text-sm text-error ${!!emailValid && formSubmitted ? 'visible' : 'hidden'}`} >{emailValid}</span>
      <Input name="age" type='number' onChange={onChange} nameV={age} />
      <span className={`text-sm text-error ${!!ageValid && formSubmitted ? 'visible' : 'hidden'}`} >{ageValid}</span>
      <Input name="password" type='password' onChange={onChange} nameV={password} />
      <span className={`text-sm text-error ${!!passwordValid && formSubmitted ? 'visible' : 'hidden'}`} >{passwordValid}</span>
      <Input name="password2" type='password' onChange={onChange} nameV={password2} />
      <span className={`text-sm text-error ${!!password2Valid && formSubmitted ? 'visible' : 'hidden'}`} >{password2Valid}</span>
    </AuthLayout>
  )
}
