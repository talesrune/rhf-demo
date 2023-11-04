import ReactDatePicker from "react-datepicker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Stack, TextField, Autocomplete, Chip, NativeSelect, Button } from "@mui/material";
import { useState } from "react"
import { styled } from '@mui/material/styles';

//import '../App.css'

type FormValues = {
  TextField: string,
  inputName:any,
  movies: any,
  // {
  //   number: string
  // }[]
  decisionList: any,
  decisionList2:any,
  test:number
} 

const CustomizedChip = styled(Chip)`
  color: #20b2aa;
  background-color: #853a28;

  :hover {
    color: #2e8b57;
  }
`;

const CustomizedSelect = styled(NativeSelect)`
  color: #20b2aa;
  background-color: #634885;

  :hover {
    color: #2e8b57;
  }
`;


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { id:0, title: 'The Shawshank Redemption', year: 1994 },
  { id:1, title: 'The Godfather', year: 1972 },
  { id:2, title: 'The Godfather: Part II', year: 1974 },
  { id:3, title: 'The Dark Knight', year: 2008 },
  { id:4, title: '12 Angry Men', year: 1957 },
  { id:5, title: "Schindler's List", year: 1993 },
  { id:6, title: 'Pulp Fiction', year: 1994 }
]

const daList = [
  { id:0, title: 'Phone number', type: "string" },
  { id:1, title: 'Email', type: "string" },
  { id:2, title: 'Date of birth', type: "date" },
  { id:3, title: 'Last Name', type: "string" },
  { id:4, title: 'Deadline Date', type: "date" },
  { id:5, title: "Address", type: "string" },
  { id:6, title: 'Region', type: "string" }
]

export const Controller2 = () => {
  const { register, setValue:setDecisionValue, getValues, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      decisionList: ['test'],
      decisionList2: ['test2'],
      test:0
    } 
  });
  const [chips, setChips] = useState(['chip 1','chip 2','chip 3']);

  //new
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [firstName, setFirstName] = useState('');
  //new 18 Aug
  const {fields, append, remove} = useFieldArray({
    name: 'movies',
    control
  })
  //new 21 aug
  const [currentSelection, setSelection] = useState('');
  console.log(currentSelection)
  const decisionFields2 = getValues('decisionList2')

  const {fields:decisionFields, update:updateSelect, append:appendSelect, remove:removeSelect} = useFieldArray({
    name: 'decisionList',
    control
  })

  function handleDelete(chipToDelete:String){
    setChips((chips) =>  chips.filter((chip) => chip !== chipToDelete))
  }

  const onChangehandleInput = (event: any, newValue: any | null) => {
      if (newValue !!= null) {
        console.log(newValue)
        //console.log('done')
        remove()
        for(var i = 0; i < newValue.length; i++)
        {
          if (typeof newValue[i] === "string")
            append({'string':newValue[i]})
          else
            append({'year':newValue[i]['year']})
        }
      }
  }

  console.log(getValues())
  // decisionFields.map((chipName, j) =>{
  // console.log('decisionF')
  // console.log(chipName)
  // }
  // )
  return (
    <Stack>
      <Stack direction={'row'} spacing={1} >
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          //fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            value={value}
            onChange={e => setFirstName(e.target.value)} // send value to hook form
            onBlur={onBlur} // notify when input is touched
            inputRef={ref} // wire up the input ref
          />
        )}
        name="TextField"
        control={control}
        rules={{ required: true }}
      />
      {
        chips.map((chipName) => 
          <CustomizedChip key={chipName} label={chipName} onDelete={()=>handleDelete(chipName)}/>
        )
      }
      </Stack>
      <Stack>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        freeSolo
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
      </Stack>
      <Stack>
      <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films} //top100Films.map((option) => option.title)
        getOptionLabel={(option) => typeof option === "string" ? option : option.title}
        //defaultValue={[top100Films[0].title]}
        freeSolo
        onChange={onChangehandleInput}
        // renderTags={(value2: any, getTagProps) =>
        //   value2.map((option: string, index: number) => (
        //     <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        //     // `movies.${index}.${option}.0`
        //   ))
        // }
        renderInput={(params) => (
          <TextField
            
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />
      </Stack>
      <Stack>
        {
          chips.map((chipName) => 
            <input key={chipName} {...register(`inputName.${chipName}`)} placeholder="Input Name" />
          )
        }
      </Stack>
      <Stack>
        <Autocomplete
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={option => option.title}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
          onChange={(event, newValue) => {
            console.log(JSON.stringify(newValue, null, ' '));
          }}
        />

      </Stack>
      <Stack>
        <Autocomplete
          freeSolo
          multiple
          id="combo-box-demo2"
          options={top100Films}
          getOptionLabel={(option) => typeof option === "string" ? option : option.title} //{option => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
          onChange={(event, newValue) => {
            console.log(JSON.stringify(newValue, null, ' '));
          }}
        />

      </Stack>
      <Stack>
      {
         decisionFields.map((chipName, j) =>
            <Stack direction='row' spacing={6} key={j}>
            <CustomizedSelect
              //{...register(`decisionList.${index}.${obj.type}`)}
              key={j}
              onChange={ (e) => {

                var help = JSON.parse(e.target.value)
                console.log(help)
                
                // if (decisionFields.length <= help.index) {
                //   for (var i = decisionFields.length; i <help.index+1; i++){
                //     appendSelect("blank")
                //   }
                // }

                updateSelect(help.index, help)//{"bro": help})
                //help
              }}
              
              
            >
            
            <option>Select an option</option>
            {
              daList.map((obj) => {
                //console.log("hi")
                return <option key={obj.id} 
                              value={JSON.stringify({
                                  index: j,
                                  id: obj.id,
                                  label: obj.title,
                                  type: obj.type
                              })} 
                              label={obj.title} 
                      />
              })
            }
            </CustomizedSelect>
            {(j==decisionFields.length-1) && <Button variant='contained' onClick={()=>{appendSelect("blank")}}>Add</Button>}
            {(decisionFields.length>1 && j==decisionFields.length-1) && <Button variant='contained' onClick={()=>{removeSelect(j)}}>Remove</Button>}
            </Stack>
        )
        
      }
      </Stack>
      <Stack>
      <Controller
        name="decisionList2"
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange:oc_controller, value:value3},
          //fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Box>
          <TextField          
            value={currentSelection}
          />
          {
            decisionFields2.map((chipName2, k) =>
              <Stack direction='row' key={k}>
              <NativeSelect 
                //{(typeof value3 === 'object') ?value3[1].label:'hi'}
                onChange={(e) => {

                  var help = JSON.parse(e.target.value)
                  console.log(help)
                  
                  //oc_controller({[help.index]:help})//update controller values
                  setDecisionValue(`decisionList2.${help.index}`, help)
                  //oc_value = help.label//update UI
                  setSelection(help.label)
                  //console.log(oc_controller)
                  //console.log(value3[1].label + "hi")
                  //value3 = help.label
                  console.log(typeof value3)
                  console.log('end')
                  //help
                }}
                //onBlur={onBlur}
                //name={name}
                //ref={ref}          
              >
              <option>Select an option</option>
              {
                daList.map((obj) => {
                  //console.log("hi")
                  return <option key={obj.id} 
                                value={JSON.stringify({
                                    index: k,
                                    id: obj.id,
                                    label: obj.title,
                                    type: obj.type
                                })} 
                                label={obj.title} 
                        />
                })
              }
              </NativeSelect>
              {/* (k==decisionFields2.length-1) &&  */}
              {/* (decisionFields2.length>1 && k==decisionFields2.length-1) &&  */}
              {(k==decisionFields2.length-1) && <Button variant='contained' onClick={()=>{console.log('done'); setDecisionValue(`decisionList2.${k+1}`, "bruh");}}>Add</Button>}
              {<Button variant='contained' 
                onClick={()=>{
                  decisionFields2.splice(k,1);
                }}>Remove</Button>}
              </Stack>
            )
          }
          </Box>
        )}
        
      />
      
      </Stack> 
    </Stack>
  );
}
