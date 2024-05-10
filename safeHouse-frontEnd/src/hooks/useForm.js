import { useState } from 'react';

export const useForm = (initForm = {}) => {

    const [formValues, setFormValues] = useState(initForm);

    const InputChange = (e)=>{
        const {name, value} = e.target;
        //console.log(name, value);

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const resetForm = () => {
        setFormValues({initForm});
    }

    return {
        ...formValues,
        formValues,
        InputChange,
        resetForm
    };
}