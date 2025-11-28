'use client';

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react';

import { useFileUpload } from '@/app/hooks/use-file-upload';
import { Button } from '@/app/components/ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';

const BannerFileUpload = ({
  setBannerFile,
}: {
  setBannerFile: Dispatch<SetStateAction<File | null>>;
  preview?: string | null;
}) => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/png,image/jpeg,image/jpg,',
    maxSize,
    maxFiles: 1,
  });
  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    if (files.length > 0) {
      setBannerFile(files[0].file as File);
    } else {
      setBannerFile(null);
    }
  }, [files]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        {/* Drop area */}
        <div
          className='relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-black dark:border-white p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50'
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...getInputProps()}
            aria-label='Upload image file'
            className='sr-only'
          />
          {previewUrl ? (
            <div className='absolute inset-0 flex items-center justify-center p-4'>
              <img
                alt={files[0]?.file?.name || 'Uploaded image'}
                className='mx-auto max-h-full rounded object-contain'
                src={previewUrl}
              />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
              <div
                aria-hidden='true'
                className='mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border dark:border-white border-black  bg-background'
              >
                <ImageIcon className='size-5  ' />
              </div>
              <p className='mb-1.5 font-medium text-sm'>Drop your image here</p>
              <p className='text-muted-foreground text-xs'>
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
              </p>
              <Button
                className='mt-4 border-black dark:border-white'
                onClick={openFileDialog}
                variant='outline'
                type='button'
              >
                <UploadIcon
                  aria-hidden='true'
                  className='-ms-1 size-4 border-black dark:border-white'
                />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className='absolute top-4 right-4'>
            <button
              aria-label='Remove image'
              className='z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
              onClick={() => removeFile(files[0]?.id)}
              type='button'
            >
              <XIcon aria-hidden='true' className='size-4' />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className='flex items-center gap-1 text-destructive text-xs'
          role='alert'
        >
          <AlertCircleIcon className='size-3 shrink-0' />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
};
export default BannerFileUpload;
