import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center mt-4">
            {pages.map(page => (
                <button
                    key={page}
                    className={`rounded-full mx-1 px-4 py-2 border ${currentPage === page ? 'bg-slate-600 text-white' : 'bg-white text-slate-600 border-slate-600'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
