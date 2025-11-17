import Image from 'next/image';
import { Button } from '../components/ui/button';
import Link from 'next/link';

const VerificationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { status } = await searchParams;

  const isSuccess = status?.includes('true'.toLowerCase());

  return (
    <main className='p-6'>
      <section className='min-h-screen flex flex-col items-center justify-center pb-20'>
        <div className='max-w-6xl mx-auto flex flex-col items-center justify-center gap-6'>
          <Image
            src={`/images/${isSuccess ? 'verified' : 'unverified'}.png`}
            alt='Verified'
            width={140}
            height={140}
          />
          <h3 className='text-2xl md:text-3xl font-bold'>
            {isSuccess
              ? 'Password Reset Successful'
              : 'Invalid or Expired Token'}
          </h3>
          <p className='text-center text-base md:text-lg max-w-lg'>
            {' '}
            {isSuccess
              ? 'Your password has been updated successfully. You can now sign in with your new password.'
              : 'Your verification link has expired or is invalid. Please request a new one.'}
          </p>
          <Button asChild className='h-11 text-base'>
            <Link href={isSuccess ? '/signin' : '/forgot-password'}>
              {isSuccess ? 'Return to Sign in' : 'Request new one'}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default VerificationPage;
