import React from "react";
import { usePagination } from "../../hooks/usePagination";

export default function PaginatedTable({ title, data, columns }) {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(data, 10);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-4 w-full">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {!data || data.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No {title.replace(" Information", "").toLowerCase()} data available.
        </p>
      ) : (
        <>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th key={col.header} className="px-4 py-2 border-b">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-2 border-b">
                      {col.Cell ? col.Cell({ row }) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
