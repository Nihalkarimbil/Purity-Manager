import React from "react";

function Workflow() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Application Workflow
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
            1
          </div>
          <h4 className="font-semibold text-blue-800">Manage Purities</h4>
          <p className="text-sm text-blue-700">
            Add and manage purities for each metal type
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
            2
          </div>
          <h4 className="font-semibold text-green-800">Add Rates</h4>
          <p className="text-sm text-green-700">
            Enter new rates with automatic history tracking
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
            3
          </div>
          <h4 className="font-semibold text-purple-800">Track History</h4>
          <p className="text-sm text-purple-700">
            View complete rate history with search and filter
          </p>
        </div>
      </div>
    </div>
  );
}

export default Workflow;
