import {useForm, Controller} from 'react-hook-form'
import { NativeSelect } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette';

interface Option {
    value:string;
    label:string;
}

interface FormData {
    selects: string[];
}

function ChatGpt(){
    const options:Option[] = [
        {value:'opt1', label: 'Option 1'},
        {value:'opt2', label: 'Option 2'},
        {value:'opt3', label: 'Option 3'},

    ];

    const { control, handleSubmit, setValue, getValues, watch } = useForm<FormData>({
        defaultValues:{
            selects:['opt1','opt2','opt3','opt2','opt1']
        }
    });

    const onSubmit = (data: FormData) => {
        console.log(data.selects)
    }

    const removeSelect = (index:number) => {
        const currentSelects = c_Selects
        const updatedSelects = currentSelects.filter((_, i) => i !== index);
        setValue('selects', updatedSelects)
        console.log(updatedSelects)
    }

    const c_Selects = watch('selects')
    console.log(c_Selects)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {c_Selects.map((selectedOption, index) => (
                <div key={index}>
                    <Controller
                        name={`selects.${index}`}
                        control={control}
                        render={({field:{onChange}}) => (
                            <div>
                                <NativeSelect value={selectedOption} onChange={(e) => {onChange(e.target.value)}}>
                                    {
                                        options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </NativeSelect>
                                <button type='button' onClick={()=> {removeSelect(index);}}>
                                    Remove
                                </button>
                            </div>
                        )
                        } 
                    />

                </div>
            ))
            }
        </form>
    )
}
export default ChatGpt