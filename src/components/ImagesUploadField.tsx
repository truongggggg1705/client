import React from 'react';

interface ImageUploadFieldProps {
  setImages: React.Dispatch<React.SetStateAction<any[]>>
  images?: any[]
  hiddenEdit?: boolean
}

const ImagesUploadField: React.FC<ImageUploadFieldProps> = ({ setImages, images, hiddenEdit }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(Array.from(files));
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        disabled={hiddenEdit}
        multiple
        onChange={handleImageChange}
        className='block w-full border-0 text-sm
        text-slate-500 file:mr-4 file:rounded-md file:border-0
        file:bg-pink-50 file:px-4 file:py-2
        file:text-sm file:font-semibold
        file:text-pink-700 hover:file:bg-pink-100'
      />
      <div className='flex my-2'>
        {images?.map((image, index) => (
          <img
            key={index}
            src={hiddenEdit ? image : URL.createObjectURL(image)}
            alt={`Image ${index}`}
            width='100'
            height='100'
            className='px-2'
          />
        ))}
      </div>
    </div>
  );
}

export default ImagesUploadField;
