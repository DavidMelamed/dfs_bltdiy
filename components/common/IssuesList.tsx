import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'resolved';
  description: string;
}

interface IssuesListProps {
  issues: Issue[];
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  const getSeverityColor = (severity: Issue['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: Issue['status']) => {
    return status === 'resolved' ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-yellow-500" />
    );
  };

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(issue.status)}
              <h3 className="text-sm font-medium text-gray-900">{issue.title}</h3>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                issue.severity
              )}`}
            >
              {issue.severity}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">{issue.description}</p>
        </div>
      ))}
    </div>
  );
};
