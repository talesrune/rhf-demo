import ReactDatePicker from "react-datepicker";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Stack, TextField, Autocomplete, Chip } from "@mui/material";
import { useState } from "react"

type FormValues = {
  TextField: string,
  inputName:any
  movies: any
  // {
  //   number: string
  // }[]
} 

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

export const Controller2 = () => {
  const { register, getValues, handleSubmit, control } = useForm<FormValues>();
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
          <Chip key={chipName} label={chipName} onDelete={()=>handleDelete(chipName)}/>
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
    </Stack>
  );
}
