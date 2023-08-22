import {
  TextField,
} from "@mui/material";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

export const PaymentForm = () => {
    const { control, getValues, formState } = useFormContext();
    const { errors } = formState;
    
    console.log('payment')
    console.log(getValues())
    console.log(errors)
    return (
      <>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field }) => (
            <TextField
              id="cardNumber"
              label="Card Number"
              variant="outlined"
              placeholder="Enter Your Card Number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="cardMonth"
          render={({ field }) => (
            <TextField
              id="cardMonth"
              label="Card Month"
              variant="outlined"
              placeholder="Enter Your Card Month"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="cardYear"
          render={({ field }) => (
            <TextField
              id="cardYear"
              label="Card Year"
              variant="outlined"
              placeholder="Enter Your Card Year"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };