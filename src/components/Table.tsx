import React from 'react';
import Pagination from './Pagination';

export interface Column {
    field: string;
    headerName: React.ReactNode;
    render?: (row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    rowsPerPage?: number;
    active?: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, rowsPerPage = 5, active, currentPage, setCurrentPage }) => {

    // Tính toán tổng số trang
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Tính toán dữ liệu cần hiển thị cho trang hiện tại
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="overflow-hidden rounded-md border border-gray-200">
                <table className="w-full ">
                    <thead>
                        <tr className='bg-slate-200'>
                            {columns.map((col) => (
                                <th key={col.field} className="border px-4 py-3 text-slate-700 text-left">
                                    {col.headerName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className={active === row.id ? 'bg-blue-300' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                {columns.map((col) => (
                                    <td key={col.field} className="border-gray-100 px-4 py-3">
                                        {col.render ? col.render(row) : row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='py-2 flex items-center justify-end'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Table;
