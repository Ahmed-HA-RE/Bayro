'use client';

import {
  FileMetadata,
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from '@/app/hooks/use-file-upload';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from '@/app/components/ui/button';
import { TriangleAlertIcon, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  setFile: Dispatch<SetStateAction<File | FileMetadata | undefined>>;
  onFileChange?: (file: FileWithPreview | null) => void;
  defaultAvatar?: string;
}

const AvatarUpload = ({
  maxSize = 1 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  setFile,
  defaultAvatar,
}: AvatarUploadProps) => {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: 'image/jpeg,image/png,image/jpg',
    multiple: false,
    onFilesChange: (files) => {
      onFileChange?.(files[0] || null);
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar;

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  useEffect(() => {
    if (files) {
      setFile(files[0]?.file);
    }
  }, [files]);

  return (
    <div className='w-full space-y-6'>
      <div className={cn('flex flex-row items-center gap-4', className)}>
        {/* Avatar Preview */}
        <div className='relative'>
          <div
            className={cn(
              'group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors',
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/20',
              previewUrl && 'border-solid'
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input {...getInputProps()} className='sr-only' />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt='Avatar'
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                <User className='size-6 text-muted-foreground' />
              </div>
            )}
          </div>

          {/* Remove Button - only show when file is uploaded */}
          {currentFile && (
            <Button
              size='icon'
              variant='outline'
              onClick={handleRemove}
              className='size-6 absolute end-0 top-0 rounded-full'
              aria-label='Remove avatar'
            >
              <X className='size-3.5' />
            </Button>
          )}
        </div>

        {/* Upload Instructions */}
        <div className=' space-y-2 '>
          <p className='text-sm font-medium'>
            {currentFile ? 'Avatar uploaded' : 'Optimal dimensions: 100x100'}
          </p>
          <p className='text-xs text-muted-foreground'>
            PNG, JPG up to {formatBytes(maxSize)}
          </p>
        </div>
      </div>
      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className='bg-destructive/10 text-destructive border-none max-w-sm'>
          <TriangleAlertIcon />
          <AlertTitle>Upload failed</AlertTitle>
          {errors.map((error, index) => (
            <AlertDescription
              key={index}
              className='last:mb-0 text-destructive/80'
            >
              {error}
            </AlertDescription>
          ))}
        </Alert>
      )}
    </div>
  );
};

export default AvatarUpload;
