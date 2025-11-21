import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/app/components/ui/stepper';

const steps = [
  {
    step: 1,
    title: 'Shipping Address',
  },
  {
    step: 2,
    title: 'Payment Method',
  },
  {
    step: 3,
    title: 'Review Order',
  },
];

const CheckoutStepper = ({ currentStep = 1 }) => {
  return (
    <Stepper className='mt-4 mb-10' value={currentStep}>
      {steps.map(({ step, title }) => (
        <StepperItem
          key={step}
          step={step}
          className='not-last:flex-1 max-md:items-start'
        >
          <StepperTrigger className='rounded max-md:flex-col'>
            <StepperIndicator />
            <div className='text-center md:text-left'>
              <StepperTitle>{title}</StepperTitle>
            </div>
          </StepperTrigger>
          {step < steps.length && (
            <StepperSeparator className='max-md:mt-3.5 md:mx-4' />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;
