import {
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  Controller,
  useFormContext,
} from "react-hook-form";


export const BasicForm = () => {
    const { control, getValues, formState } = useFormContext();
    const { errors } = formState;
    
    return (
      <>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              id="first-name"
              label="The quick brown fox jumps over the lazy dog"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Grid xs={12}> <Button >The quick brown fox jumps over the lazy dog</Button></Grid>       
        <Grid xs={12}><Button sx={{ fontFamily:'"Comic Sans MS", "Comic Sans"', fontSize:'28px'}}>Whatsup</Button></Grid>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              InputLabelProps={{ shrink: true}}              
              id="last-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              size="medium"
              {...field}
            />
          )}
        />
  
        <Controller
          control={control}
          name="nickName"
          render={({ field }) => (
            <TextField
              id="nick-name"
              label="Nick Name"
              variant="outlined"
              placeholder="Enter Your Nick Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };