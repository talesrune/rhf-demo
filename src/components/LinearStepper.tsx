import React, { useState } from "react";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import {
  useForm,
  FormProvider,
} from "react-hook-form";
import { BasicForm } from "./BasicForm";
import { ContactForm } from "./ContactForm";
import { PaymentForm } from "./PaymentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"


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
});
console.log('hello')

const schemaBasic = schema.pick({ firstName: true, lastName:true, nickName:true })

console.log('world')
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
        },
        resolver: zodResolver(selectedSchema)
    });

    const {register, handleSubmit, formState, getValues } = methods;
    const { errors } = formState;

    

    const isStepOptional = (step:number) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step:number) => {
        return skippedSteps.includes(step);
    };

    const handleNext = (data:any) => {
        if (activeStep == steps.length - 1) {
            setActiveStep((aStep) => aStep + 1)
            console.log(data);
            console.log('thanks')
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

    return (
        <div>
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

        {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
            Thank You 
            </Typography>
        ) : (
            <>
            <FormProvider {...methods} {...errors}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}

                <Button
                
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    back
                </Button>
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
                    color="primary"
                    // onClick={handleNext}
                    type="submit"
                >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                </form>
            </FormProvider>
            </>
        )}
        </div>
    );
};

export default LinearStepper;