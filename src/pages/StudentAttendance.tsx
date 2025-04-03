import React from 'react';

export default function StudentAttendance() {
  const attendanceData = [
    { subject: 'Mathematics', total: 45, attended: 40, percentage: 89 },
    { subject: 'Physics', total: 42, attended: 35, percentage: 83 },
    { subject: 'Chemistry', total: 40, attended: 38, percentage: 95 },
    { subject: 'Computer Science', total: 38, attended: 36, percentage: 95 },
    { subject: 'English', total: 35, attended: 32, percentage: 91 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Overall Attendance</h2>
          <p className="text-3xl font-bold text-indigo-600">91%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Classes</h2>
          <p className="text-3xl font-bold text-gray-700">200</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Classes Attended</h2>
          <p className="text-3xl font-bold text-green-600">181</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Classes Missed</h2>
          <p className="text-3xl font-bold text-red-600">19</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Classes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes Attended
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((subject) => (
              <tr key={subject.subject}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {subject.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {subject.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {subject.attended}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subject.percentage >= 85
                        ? 'bg-green-100 text-green-800'
                        : subject.percentage >= 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {subject.percentage}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {subject.percentage >= 75 ? (
                    <span className="text-green-600">Good Standing</span>
                  ) : (
                    <span className="text-red-600">Attendance Shortage</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Attendance Guidelines</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Minimum 75% attendance is required to be eligible for examinations</li>
          <li>Medical leaves require proper documentation</li>
          <li>Students with attendance below 75% may need to attend extra classes</li>
        </ul>
      </div>
    </div>
  );
}