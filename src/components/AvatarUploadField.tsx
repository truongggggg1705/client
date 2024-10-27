import { ImageUp, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

interface AvatarUploadFieldProps {
    setImage: React.Dispatch<React.SetStateAction<any | undefined>>;
    image?: any;
    hiddenEdit?: boolean;
    className?: string;
}

const AvatarUploadField: React.FC<AvatarUploadFieldProps> = ({ className = "", setImage, image, hiddenEdit = false }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedImage = files[0];
            setImage(selectedImage);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDeleteClick = () => {
        setImage(undefined);
    };

    return (
        <div className={`relative w-36 h-36 rounded-full bg-slate-100 cursor-pointer overflow-hidden ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 right-0 left-0 bottom-0 opacity-0"
            />
            <div className="absolute top-14 right-12" onClick={handleUploadClick}>
                <ImageUp color="#bbbbbb" size={40} />
            </div>
            {image && (
                <>
                    <div className="flex justify-center items-center h-full scale-125">
                        <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            alt="Selected Image"
                            width="600"
                            height="600"
                            className="px-2"
                        />
                    </div>
                    {!hiddenEdit &&
                        <div className="absolute top-0 right-0 left-0 bottom-0 hover:bg-[#33333331] hover:*:text-[#333] text-transparent duration-300 ">
                            <div className="h-full w-full flex items-center justify-center gap-4" onClick={handleUploadClick}>
                                <button >
                                    <Upload strokeWidth={3} />
                                </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick();
                                }}>
                                    <Trash2 strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default AvatarUploadField;
