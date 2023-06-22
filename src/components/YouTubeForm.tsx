import {useForm, useFieldArray} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"

let renderCount = 0

type FormValues = {
  username:string
  email:string
  channel:string
  social:{
    twitter: string
    facebook: string
  }
  phoneNum: string[]
  phNumbers: {
    number: string
  }[]
}

export const YouTubeForm = () => {

    const form = useForm<FormValues>(
      {
        defaultValues:async ()=>{
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
          )
          const data = await response.json()
          return {
            username: "Batman",
            email:data.email,
            channel:"np",
            social:{
              twitter: "string",
              facebook: "string"
            },
            phoneNum: ["",""],
            phNumbers: [{number:''}]
          }
        }
        // defaultValues:{
        //   username:"Batman",
        //   email:"",
        //   channel:""
        // }
      }
    )
    const {register,control, handleSubmit, formState} = form
    const {errors} = formState
    //const {name, ref, onChange, onBlur} = register("username") //old way

    const {fields, append, remove} = useFieldArray({
      name: 'phNumbers',
      control
    })

    const onSubmit = (data: FormValues) => {
      console.log('Form submitted', data)
    }

    renderCount++
    return (
      <div>
        <h1>YouTube Form ({renderCount/2})</h1>
  
        <form onSubmit={handleSubmit(onSubmit)} noValidate> {/*noValidate is to remove all the default validation*/}
          <div className='form-control'>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username", {required: "Username is required"})} /> {/*name={name} ref={ref} onChange={onChange} onBlur={onBlur} />*/}
          <p className='error'>{errors.username?.message}</p>
          </div>

          <div className='form-control'>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email", {
            pattern: {
              value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email format'
            },
            validate:{
              notAdmin: (fieldValue) => {
                return (fieldValue !== "admin@example.com" || "Enter a different email address")
              },
              notBlackListed: (fieldValue) => {
                return (!fieldValue.endsWith("example.com") || "This domain is not supported")
              }
            }
          })} />
          <p className='error'>{errors.email?.message}</p>
          </div>

          <div className='form-control'>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel",{required: "Channel is required"}) } />
          <p className='error'>{errors.channel?.message}</p>
          </div>

          <div className='form-control'>
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter",{required: "twitter is required"}) } />
          <p className='error'>{errors.social?.twitter?.message}</p>
          </div>
          <div className='form-control'>
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook",{required: "facebook is required"}) } />
          <p className='error'>{errors.social?.facebook?.message}</p>
          </div>
          <div className='form-control'>
          <label htmlFor="primary-phone">Pri phone Number</label>
          <input type="text" id="primary-phone" {...register("phoneNum.0",{required: "Pri phone num is required"}) } />
          <p className='error'>{errors.phoneNum?.[0]?.message}</p>
          </div>
          <div className='form-control'>
          <label htmlFor="secondary-phone">Secondary phone Number</label>
          <input type="text" id="secondary-phone" {...register("phoneNum.1",{required: "Sec phone num is required"}) } />
          <p className='error'>{errors.phoneNum?.[1]?.message}</p>
          </div>
        
          <div>
            <label>List of phone numbers</label>
            <div>
              {fields.map((field,index) => {
                  return(
                    <div className = "form-control"  key={field.id}>
                      <input type = "text" id="huh" {...register(`phNumbers.${index}.number` as const)}/>
                      {
                        index > 0 && (
                          <button type = "button" onClick={ () => remove(index) }>Remove</button>
                        )
                      }
                    </div>
                  )
                })
              }
              <button type = "button" onClick={ () => append({ number: ""}) }>Add phone number</button>
            </div>
          </div>
          <button>Submit</button>
        </form>
        <DevTool control = {control}/>
      </div>
    )
}

