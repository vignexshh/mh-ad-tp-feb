'use client';
import React, { useState } from 'react';
import { Select, InputNumber, Table, Flex } from 'antd';
import quotaData from './2_ALL INDIA QUOTA AYUSH ROUND-1 ALLOTMENTS.json';
import AppLayout from '../../AppLayout';

const { Option } = Select;

interface QuotaItem {
  SNo: string;
  Rank: string;
  'Allotted Quota': string;
  'Allotted Institute': string;
  Course: string;
  'Alloted Category': string;
  'Candidate Category': string;
  Remarks: string;
}

export default function Home() {
  // State to manage filter values
  const [filters, setFilters] = useState({
    quota: null as string | null,
    institute: null as string | null,
    course: null as string | null,
    allottedCategory: null as string | null,
    candidateCategory: null as string | null,
    rankValue: null as number | null,
  });

  // Extract unique values for each field
  const uniqueValues = {
    quotas: [...new Set(quotaData.map((item) => item['Allotted Quota']))],
    institutes: [...new Set(quotaData.map((item) => item['Allotted Institute']))],
    courses: [...new Set(quotaData.map((item) => item.Course))],
    allottedCategories: [...new Set(quotaData.map((item) => item['Alloted Category']))],
    candidateCategories: [...new Set(quotaData.map((item) => item['Candidate Category']))],
  };

  // Filter data based on selected filters
  const filteredData = quotaData.filter((item: QuotaItem) => {
    const rank = parseInt(item.Rank);
    return (
      (!filters.quota || item['Allotted Quota'] === filters.quota) &&
      (!filters.institute || item['Allotted Institute'] === filters.institute) &&
      (!filters.course || item.Course === filters.course) &&
      (!filters.allottedCategory || item['Alloted Category'] === filters.allottedCategory) &&
      (!filters.candidateCategory || item['Candidate Category'] === filters.candidateCategory) &&
      (!filters.rankValue || rank <= (filters.rankValue ?? Infinity))
    );
  });

  // Table columns configuration
  const columns = [
    { title: 'S.No', dataIndex: 'SNo', key: 'SNo' },
    { title: 'Rank', dataIndex: 'Rank', key: 'Rank' },
    { title: 'Quota', dataIndex: 'Allotted Quota', key: 'quota' },
    { title: 'Institute', dataIndex: 'Allotted Institute', key: 'institute' },
    { title: 'Course', dataIndex: 'Course', key: 'course' },
    { title: 'Category', dataIndex: 'Alloted Category', key: 'category' },
    { title: 'Candidate Type', dataIndex: 'Candidate Category', key: 'candidate' },
    { title: 'Remarks', dataIndex: 'Remarks', key: 'remarks' },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col h-full justify-start items-center gap-4 p-4">
        {/* First Container - Filters */}
        <div
          className="w-full bg-white p-6 shadow-lg rounded-md overflow-y-auto"
          style={{ height: '10rem' }} // Fixed height of 20rem
        >
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <Flex wrap gap="small" className="w-full">
            {/* Allotted Quota Filter */}
            <Select
              style={{ width: 200 }}
              placeholder="Allotted Quota"
              allowClear
              onChange={(value) => setFilters((prev) => ({ ...prev, quota: value }))}
            >
              {uniqueValues.quotas.map((quota) => (
                <Option key={quota} value={quota}>
                  {quota}
                </Option>
              ))}
            </Select>

            {/* Allotted Institute Filter */}
            <Select
              style={{ width: 200 }}
              placeholder="Allotted Institute"
              allowClear
              onChange={(value) => setFilters((prev) => ({ ...prev, institute: value }))}
            >
              {uniqueValues.institutes.map((institute) => (
                <Option key={institute} value={institute}>
                  {institute}
                </Option>
              ))}
            </Select>

            {/* Course Filter */}
            <Select
              style={{ width: 200 }}
              placeholder="Course"
              allowClear
              onChange={(value) => setFilters((prev) => ({ ...prev, course: value }))}
            >
              {uniqueValues.courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>

            {/* Allotted Category Filter */}
            <Select
              style={{ width: 200 }}
              placeholder="Allotted Category"
              allowClear
              onChange={(value) => setFilters((prev) => ({ ...prev, allottedCategory: value }))}
            >
              {uniqueValues.allottedCategories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            {/* Candidate Category Filter */}
            <Select
              style={{ width: 200 }}
              placeholder="Candidate Category"
              allowClear
              onChange={(value) => setFilters((prev) => ({ ...prev, candidateCategory: value }))}
            >
              {uniqueValues.candidateCategories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            {/* Rank Filter */}
            <InputNumber
              style={{ width: 200 }}
              placeholder="Max Rank"
              min={0}
              onChange={(value) => setFilters((prev) => ({ ...prev, rankValue: value }))}
            />
          </Flex>
        </div>

        {/* Second Container - Table */}
        <div className="w-full bg-white p-6 shadow-lg rounded-md">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="SNo"
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: true }}
          />
        </div>
      </div>
    </AppLayout>
  );
}