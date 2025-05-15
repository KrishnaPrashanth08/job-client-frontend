// src/components/JobCard.jsx
import React from 'react';
import './JobCard.css'; // (optional, if you want to style it)
import amazon from '../amazon.png';
import swiggy from '../swiggy.png';
import tesla from '../tesla.png';

 const logoMap = {
  Amazon: amazon,
  Swiggy: swiggy,
  Tesla: tesla,
  // Add more as needed
    };

function JobCard({ job }) {
   
  return (
    <div className="jobcard">
      <img
        src={logoMap[job.company] || job.logo_url || amazonLogo} 
        alt={job.company}
        className="jobcard-logo"
        />
      <h2 className="jobcard-title">{job.title}</h2>
      <h3 className="jobcard-company">{job.company}</h3>
      <p className="jobcard-location">{job.location}</p>
      <p className="jobcard-type">{job.job_type}</p>
      <p className="jobcard-salary">
        ₹{job.salary_min / 1000}k - ₹{job.salary_max / 1000}k
      </p>
      <p className="jobcard-description">{job.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default JobCard;
