import React from 'react';

export default function ChartCard({
  title = '',
  description = '',
  type = 'full',
  height = '300px',
  hasTableView = false,
  isTableView = false,
  hasXButton = true,
  children,         
  tableContent,     
  onClose = () => {},
  onToggleView = () => {}
}) {

  const typeClasses = {
    full: 'col-span-1 md:col-span-6',
    half: 'col-span-1 md:col-span-3',
    third: 'col-span-1 md:col-span-2',
};

  return (
    <div
      className={`flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative w-full ${typeClasses[type]}`}
      style={{ height: height }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2 h-8">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          {hasTableView && (
            <div className="flex rounded-full border border-gray-200 p-0.5 bg-gray-50">
              <button
                className={`px-2 py-0.5 text-xs rounded-full transition-colors ${!isTableView ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => onToggleView(false)}
              >
                Chart
              </button>
              <button
                className={`px-2 py-0.5 text-xs rounded-full transition-colors ${isTableView ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => onToggleView(true)}
              >
                Table
              </button>
            </div>
          )}
          {hasXButton && (
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 w-full h-full overflow-hidden">
        {isTableView ? tableContent : children}
      </div>
    </div>
  );
}