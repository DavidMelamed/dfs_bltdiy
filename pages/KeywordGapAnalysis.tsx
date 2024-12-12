import React, { useState } from 'react';
import { Table } from '../components/common/Table';
import { ExportButton } from '../components/common/ExportButton';
import { KeywordChip } from '../components/keywords/KeywordChip';

interface KeywordGapAnalysisProps {
  mainDomain: string;
  competitors: string[];
  data: any;
  loading: boolean;
}

export function KeywordGapAnalysis({
  mainDomain,
  competitors,
  data,
  loading
}: KeywordGapAnalysisProps) {
  const [filter, setFilter] = useState('all'); // all, missing, better, worse
  const [sortField, setSortField] = useState('volume');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const gapData = data?.competitors?.keywordGaps || [];
  
  const filteredData = gapData.filter((keyword: any) => {
    switch (filter) {
      case 'missing':
        return !keyword[mainDomain]?.position;
      case 'better':
        return competitors.every(comp => 
          !keyword[comp]?.position || 
          (keyword[mainDomain]?.position < keyword[comp]?.position)
        );
      case 'worse':
        return competitors.some(comp =>
          keyword[comp]?.position &&
          keyword[mainDomain]?.position > keyword[comp]?.position
        );
      default:
        return true;
    }
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const columns = [
    {
      key: 'keyword',
      title: 'Keyword',
      render: (value: string) => (
        <KeywordChip keyword={value} volume={data?.volume} />
      )
    },
    {
      key: 'volume',
      title: 'Search Volume',
      render: (value: number) => value.toLocaleString()
    },
    {
      key: mainDomain,
      title: 'Your Position',
      render: (value: any) => value?.position || '-'
    },
    ...competitors.map(comp => ({
      key: comp,
      title: comp,
      render: (value: any) => value?.position || '-'
    })),
    {
      key: 'difficulty',
      title: 'Difficulty',
      render: (value: number) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['all', 'missing', 'better', 'worse'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-3 py-1 rounded-full text-sm
                ${filter === f
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <ExportButton
          data={sortedData}
          filename={`keyword-gap-${filter}`}
        />
      </div>

      {/* Results Table */}
      <Table
        columns={columns}
        data={sortedData}
        loading={loading}
        sortable={true}
        onSort={(field) => {
          if (field === sortField) {
            setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
          } else {
            setSortField(field);
            setSortDirection('desc');
          }
        }}
        currentSort={{
          field: sortField,
          direction: sortDirection
        }}
      />
    </div>
  );
}
