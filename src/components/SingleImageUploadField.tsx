import React from 'react';

interface SingleImageUploadFieldProps {
    setImage: React.Dispatch<React.SetStateAction<File | string | null>>;
    image: File | string | null;
}

const SingleImageUploadField: React.FC<SingleImageUploadFieldProps> = ({ setImage, image }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const selectedImage = files[0];
            setImage(selectedImage);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full border-0 text-sm
                    text-slate-500 file:mr-4 file:rounded-md file:border-0
                    file:bg-pink-50 file:px-4 file:py-2
                    file:text-sm file:font-semibold
                    file:text-pink-700 hover:file:bg-pink-100"
            />
            {image && (
                <div className="flex mt-2">
                    <img
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt="Selected Image"
                        width="200"
                        height="200"
                        className="px-2"
                    />
                </div>
            )}
        </div>
    );
};

export default SingleImageUploadField;
