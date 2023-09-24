import React, { useState } from "react";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Stack,
  Alert,
  TextField,
  CssBaseline,
  Switch,
  IconButton,
  typographyClasses
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { deepOrange, grey, yellow, red } from '@mui/material/colors';

import {
  useForm,
  FormProvider,
} from "react-hook-form";
import { BasicForm } from "./BasicForm";
import { ContactForm } from "./ContactForm";
import { PaymentForm } from "./PaymentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"
import UploadJson from "./UploadJson";

import {Brightness4, Brightness7} from '@mui/icons-material';



const schema = z.object({
    firstName: z.string().nonempty("fN is required"),
    lastName: z.string().nonempty("lN is required"),
    nickName: z.string().nonempty("nN is required"),
    emailAddress: z.string().nonempty("email is required").email("email format is not valid"),
    phoneNumber: z.string().nonempty("pN is required"),
    alternatePhone: z.string().nonempty("aP is required"),
    cardNumber: z.string().nonempty("cN is required"),
    cardMonth: z.string().nonempty("cM is required"),
    cardYear: z.string().nonempty("cY is required"),
    reportInfo: z.array(
        z.object({
            name: z.string().nonempty("Name is required")
        })
    )
});

const schemaBasic = schema.pick({ firstName: true, lastName:true, nickName:true, reportInfo:true })

const schemaContact = schema.pick({ emailAddress: true, phoneNumber:true, alternatePhone:true });
function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Payment",
  ];
}

function getStepContent(step:number) {
  switch (step) {
    case 0:
      return <BasicForm/>;
    case 1:
      return <ContactForm />;
    case 2:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

interface LabelProps {
    optional?: any; //? is to allow object to have no optional key
}
interface StepProps {
    completed?: boolean;
}
const LinearStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
    const steps = getSteps();
    //function with doesnt work for selectedSchema
    const selectedSchema = (activeStep === 0) ? schemaBasic : (activeStep === 1) ? schemaContact : schema

    const methods = useForm({
        defaultValues: {
        firstName: "",
        lastName: "",
        nickName: "",
        emailAddress: "",
        phoneNumber: "",
        alternatePhone: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        reportInfo: [{"name":''}]
        },
        resolver: zodResolver(selectedSchema)
    });

    const {register, handleSubmit, formState, getValues, setValue, setError, clearErrors } = methods;
    const { errors, isDirty, isValid } = formState;

    

    const isStepOptional = (step:number) => {
        return step === 1 || step === 2 || step === 0;
    };

    const isStepSkipped = (step:number) => {
        return skippedSteps.includes(step);
    };

    const handleNext = (data:any) => {
        if (activeStep == steps.length - 1) {
            setActiveStep((aStep) => aStep + 1)
            console.log(data);
        } else {
        setActiveStep((aStep) => aStep + 1)
        setSkippedSteps(
            skippedSteps.filter((skipItem) => skipItem !== activeStep)
        );
        }
    };

    const handleBack = () => {
        setActiveStep((aStep) => aStep - 1)
    };

    const handleStuff = () => {
        const receivedValues = getValues()
        const result = selectedSchema.safeParse(receivedValues)

        if(!result.success){
            console.log('hilo')
            console.log(result.error.issues)
            clearErrors()
            for (let x in result.error.issues){
                console.log(result.error.issues[x])
                console.log(result.error.issues[x].message)
                console.log(result.error.issues[x].path)
                const new_key = result.error.issues[x].path.join('.');
                console.log(result.error.issues[x].path.length)
                const t1 = result.error.issues[x].path[0] as keyof typeof errors
                const t2 = result.error.issues[x].path[1] as number
                const t3 = result.error.issues[x].path[2] as keyof typeof errors[typeof t1]

                
                if (result.error.issues[x].path.length === 1){
                    setError(`${t1}`, {message:result.error.issues[x].message} )
                } else {
                    
                    setError(`${t1}.${t2}.${t3}`, {message:result.error.issues[x].message} )
                }
            }
            
        }
       
    };

    const handleSkip = (data:any) => {
        if (!isStepSkipped(activeStep)) {
        setSkippedSteps([...skippedSteps, activeStep]);
        }
        setActiveStep((aStep) => aStep + 1)
        if (activeStep == steps.length - 1) {
            console.log(getValues());
            console.log('skipped thanks')
        }
    };

    function showErrors() {
        console.log('errors')
        console.log(errors)
        const td:any=[]
        for (const key of Object.keys(errors))
        {
            const temp = errors[key as keyof typeof errors]?.message
            if(typeof temp === 'string')
                td.push(<Typography>{key}:{temp}</Typography>)
            else{
                const temp2 = errors.reportInfo
                //@ts-ignore
                const temp3 = temp2[0]?.name?.message
                td.push(<Typography>{key}:{temp3}</Typography>)
            }

        }

        return td
    }

    console.log("isDirty", isDirty)
    console.log("isValid", isValid)

    //Theme 
    const [checked, setChecked] = React.useState(true);
    const theme = createTheme({
        palette:{
            
            mode: checked ? 'dark':'light',
            ...(checked && {
                primary: {
                    main:deepOrange[400],
                    dark:deepOrange[900]
                }                
            })               
            // }
            // secondary:{
            //     main:yellow[700],
            //     dark:yellow[900],
            // }
        },
        typography:{
            ...(checked && {
                // fontFamily: [
                //     '"Segoe UI"',
                //     'Arial',
                //     'sans-serif',
                //     '"Segoe UI Emoji"',
                //     '"Segoe UI Symbol"',
                //   ].join(',')
                fontFamily: '"PT Sans", Nunito'
            })

        },
        components:{
            MuiStepper:{
                styleOverrides:{
                    root:{
                        padding: "14px",
                        borderRadius: "12px"
                    }
                }
            },
            MuiButton:{
                styleOverrides:{
                    root:{
                        ...(checked && {
                            borderRadius:"50px",
                            //fontFamily:'system-ui'                
                        })
                    }
                }
            },
            MuiTextField:{
                styleOverrides:{
                    root:{
                        ...(checked && {
                            borderRadius:"30px",
                            backgroundColor:'#232323',
                            "& fieldset": { border: 'none' },
                            border: `2px dashed ${red[500]}`
                                          
                        })
                    }
                }
            },
            MuiInputLabel: { 
                ...(checked && {
                    styleOverrides:{
                        root: { 
                            color:'white',
                            fontSize: 18,       
                        },
                        shrink: {
                            color:'yellow',
                            fontSize:10,
                            marginTop:-5
                        }        
                    }
                })
            }
        }
    })

    

    const handleChange = () => {
        setChecked(!checked);
    };


    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={0}>
        {/* <Switch 
            checked = {checked}
            onChange = {handleChange}
        /> */}
        <IconButton sx={{ ml: 1 }} onClick={(e) => {handleChange()}} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
            const labelProps:LabelProps = {};
            const stepProps:StepProps = {};
            if (isStepOptional(index)) {
                labelProps.optional = (
                <Typography
                    variant="caption"
                    align="center"
                    style={{ display: "block" }}
                >
                    optional
                </Typography>
                );
            }
            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }
            return (
                <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
        </Grid>

        {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
            Thank You 
            </Typography>
        ) : (
            <>
            <FormProvider {...methods} {...errors}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Grid xs={8}>
                    {getStepContent(activeStep)}
                    </Grid>
                </Grid>
                <UploadJson {...{getValues, setValue}}></UploadJson>
                <Alert severity="warning">
                    {errors && showErrors()}
                </Alert>

                <TextField helperText='wadup'></TextField>
                <Button
                
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    back
                </Button>

                <Button                    
                    variant="contained"
                    color="primary"
                    onClick={handleStuff}
                >oi</Button>

                {isStepOptional(activeStep) && (
                    <Button
                    
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    >
                    skip
                    </Button>
                )}
                <Button
                    
                    variant="contained"
                    color="secondary"
                    // onClick={handleNext}
                    type="submit"
                >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                </form>
            </FormProvider>
            </>
        )}
        </ThemeProvider>
    );
};

export default LinearStepper;