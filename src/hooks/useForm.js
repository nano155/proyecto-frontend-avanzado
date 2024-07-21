import { useEffect, useMemo, useState } from "react"


export const useForm = (initialForm = {}, formValidations={}) => {
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState])
    
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])
    

    const onChange = ({target})=>{
        const {name, value} = target
        setFormState({
          ...formState,
          [name]:value
        })
    }

    const onReset = () => {
        setFormState(initialForm)
    }

   const validForm = useMemo(() => {
    for (const formValues of Object.keys(formValidation)) {
        if(formValidation[formValues] !== null){
            return false
        }
    }

    return true
   }
   , [formValidation])

    const createValidators = () =>{
        const formCheckValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckValues[`${formField}Valid`] = fn(formState[formField])?null:errorMessage
        }
        setFormValidation(formCheckValues)
    }
  return{
    ...formState,
    formState,
    onChange,
    onReset,
    validForm,
    ...formValidation
  }
}
