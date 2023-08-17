import ReactDatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Autocomplete, Chip } from "@mui/material";
import { useState } from "react"

type FormValues = {
  ReactDatepicker: string;
} 

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 }
]

export const Controller2 = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const [chips, setChips] = useState(['chip 1','chip 2','chip 3']);

  //new
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');
  //new
  

  function handleDelete(chipToDelete:String){
    setChips((chips) =>  chips.filter((chip) => chip !== chipToDelete))
  }

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
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[0].title]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
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
    </Stack>
  );
}
