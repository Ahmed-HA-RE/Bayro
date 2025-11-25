import ContactInfoForm from '@/app/components/user/ContactInfoForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { UserRoundXIcon } from 'lucide-react';
import { getUserById } from '@/app/actions/auth';

const UserProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) throw new Error('Unauthorized');
  const user = await getUserById(session.user.id);

  return (
    <section className='my-4'>
      <h1 className='text-2xl md:text-3xl font-bold mb-14 md:mb-20'>
        Account Information
      </h1>
      {/* User Public information */}
      <div className='flex flex-col md:flex-row gap-5 items-start'>
        <div className='space-y-2 flex-1/5'>
          <h2 className='text-xl font-medium'>Contact Information</h2>
          <p className='opacity-50 dark:opacity-70 text-sm md:max-w-md'>
            Manage your contact information. Update your profile picture, name,
            email, and a short bio. All information here will be reflected in
            your orders.
          </p>
        </div>
        {/* Public Information Form */}
        <ContactInfoForm userContact={user} />
      </div>
    </section>
  );
};

export default UserProfilePage;
