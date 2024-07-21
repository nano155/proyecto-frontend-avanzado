import { useEffect, useState } from "react"
import { useForm } from "../../hooks"
import { Input } from "../components"
import { AuthLayout } from "../layout/AuthLayout"
import { useAuthStore } from "../../hooks/useAuthStore"
import Swal from "sweetalert2"

const formValidations = {
  email:[((value) => value.length > 5), 'Email is required'],
  password:[((value) => value.length > 4), 'Password is required']
}

const formData = {email:'', password:''}

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {startLogin, errorMessage} = useAuthStore()
 
  const {onChange, email, password, validForm, emailValid, passwordValid, formState} = useForm(formData, formValidations)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!validForm) return setFormSubmitted(true)
      startLogin(formState)
    // localStorage.setItem('user', JSON.stringify(user))
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
  
  
  return (
   <AuthLayout onSubmit={handleSubmit} namePage={'Login'} buttonName={'Login'} message={"Don't you have account?"} messageLink={"Registrate aqui!"} route={'/auth/register'}>
    <Input name="email" type='email'nameV={email} onChange={onChange}/>
    <span className={`text-sm text-error ${!!emailValid && formSubmitted ? 'visible':'hidden'}`} >{emailValid}</span>
    <Input name="password" type='password' nameV={password} onChange={onChange}/>
    <span className={`text-sm text-error ${!!passwordValid && formSubmitted ? 'visible':'hidden'}`} >{passwordValid}</span>
   </AuthLayout>
  )
}
