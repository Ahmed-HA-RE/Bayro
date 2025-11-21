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
    <Stepper value={currentStep} className='my-4'>
      {steps.map(({ step, title }) => (
        <StepperItem
          key={step}
          step={step}
          className='relative flex-1  flex-col!'
        >
          <StepperTrigger className='flex-col gap-3 rounded'>
            <StepperIndicator />
            <div className='space-y-0.5 px-2'>
              <StepperTitle>{title}</StepperTitle>
            </div>
          </StepperTrigger>
          {step < steps.length && (
            <StepperSeparator className='absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none' />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;
