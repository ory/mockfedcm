"use client";

interface StatusTableProps {
  title?: string;
  headers?: Array<string>;
  values?: Array<Array<string>>;
  statusColors?: Array<string>;
  defaultBgColor?: string;
}

const StatusTable = ({
  title,
  headers = [],
  values = [],
  statusColors = [],
  defaultBgColor = "bg-gray-100",
}: StatusTableProps) => {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
      {title && (
        <div className="justify-start text-gray-900 text-base font-medium font-['Space_Grotesk'] leading-none">
          {title}
        </div>
      )}
      <div className="self-stretch p-4 bg-gray-50 rounded-lg outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start w-full">
          {headers.length > 0 && (
            <div className="self-stretch h-14 py-4 border-b border-gray-300 inline-flex justify-start items-center gap-4 w-full">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="flex-1 flex justify-start items-center"
                >
                  <div className="flex-1 opacity-75 justify-start text-black text-base font-semibold font-['Schibsted_Grotesk'] leading-normal">
                    {header}
                  </div>
                </div>
              ))}
            </div>
          )}

          {values.length > 0 ? (
            values.map((rowValues, rowIndex) => (
              <div
                key={rowIndex}
                className="self-stretch h-14 py-4 inline-flex justify-start items-center gap-4 w-full"
              >
                {rowValues.map((value, columnIndex) => {
                  // For the second column (index 1), we apply special styling if it's a status
                  if (columnIndex === 1 && headers.length > 1) {
                    const bgColor = statusColors[rowIndex] || defaultBgColor;
                    return (
                      <div
                        key={columnIndex}
                        className="flex-1 flex justify-start items-center"
                      >
                        <div
                          className={`px-3 py-1.5 ${bgColor} rounded flex justify-center items-center gap-2.5`}
                        >
                          <div className="justify-start text-cyan-950 text-sm font-normal leading-none tracking-tight">
                            {value}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Regular cells
                  return (
                    <div
                      key={columnIndex}
                      className="flex-1 flex justify-start items-center"
                    >
                      <div className="flex-1 justify-start text-black text-base font-normal font-['Schibsted_Grotesk'] leading-normal">
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="self-stretch py-4 flex justify-center items-center">
              <div className="text-gray-500">No data available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTable;
