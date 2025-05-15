import React from 'react';
import { TextInput, Select, RangeSlider } from '@mantine/core';
import './FiltersBar.css'; // Optional: for your own styles

function FiltersBar({ filters, setFilters }) {
  return (
    <div className="filters-bar">
      <TextInput
        className="filter-input"
        placeholder="Search By Job Title, Role"
        value={filters.title}
        onChange={e => setFilters({ ...filters, title: e.target.value })}
      />
      <TextInput
        className="filter-input"
        placeholder="Preferred Location"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
      />
      <Select
        className="filter-input"
        placeholder="Job type"
        data={[
          { value: 'FullTime', label: 'Full Time' },
          { value: 'PartTime', label: 'Part Time' },
          { value: 'Contract', label: 'Contract' },
          { value: 'Internship', label: 'Internship' }
        ]}
        value={filters.job_type}
        onChange={value => setFilters({ ...filters, job_type: value })}
      />
      <div className="filter-salary-slider">
        <RangeSlider
          min={0}
          max={200000}
          value={filters.salary}
          onChange={value => setFilters({ ...filters, salary: value })}
          label={(value) => `₹${value / 1000}k`}
        />
      </div>
    </div>
  );
}

export default FiltersBar;
