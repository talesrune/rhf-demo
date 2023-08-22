import {
  TextField,
} from "@mui/material";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

export const ContactForm = () => {
    const { control, getValues, formState } = useFormContext();
    const {errors} = formState
    console.log('contact')
    console.log(getValues())
    console.log(errors)
    return (
      <>
        <Controller
          control={control}
          name="emailAddress"
          render={({ field }) => (
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              placeholder="Enter Your E-mail Address"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
  
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="alternatePhone"
          render={({ field }) => (
            <TextField
              id="alternate-phone"
              label="Alternate Phone"
              variant="outlined"
              placeholder="Enter Your Alternate Phone"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };