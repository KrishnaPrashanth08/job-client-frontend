import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid, TextInput, Select, RangeSlider, Button, Group, Modal } from '@mantine/core';
import JobForm from '../components/JobForm';
import './JobList.css';
import logo_main from '../logo_main.png';
import search_logo from '../search_logo.png';
import location_logo from '../location_logo.png';
import job_type_logo from '../job_type_logo.png';
import amazon from '../amazon.png';
import swiggy from '../swiggy.png';
import tesla from '../tesla.png';
import experience from '../exp-img.png';
import onsite from '../onsite-img.png';
import packages from '../package-img.png';
import '@mantine/dates/styles.css';



// Navbar component
function Navbar({ onCreateJob }) {
  return (
    <nav className="navbar">
        <div className='navbar-wrap'>
            <div className="navbar-logo"><img src={logo_main} alt='main_logo' style = {{ height: 44.68 ,width: 44}}></img></div>
        <div className="navbar-links">
        <Group spacing={100} className='text-group'>
          
          <a href="/" className="navbar-link home-container">Home</a>
          <a href="/" className="navbar-link">Find Jobs</a>
          <a href="/" className="navbar-link">Find Talents</a>
          <a href="/" className="navbar-link">About Us</a>
          <a href="/" className="navbar-link">Testimonials</a>
        </Group>
      </div>
      <div className='create-botton'>
             <Button
        color="blue"
        className="navbar-create-btn"
        onClick={onCreateJob}
      >
        Create Jobs
      </Button>
      </div>
     
        </div>
        
    </nav>
  );
}

// Filters bar
function FiltersBar({ filters, setFilters }) {
  const handleSalaryChange = (value) => {
    setFilters(prev => ({
      ...prev,
      salary: value,
      salary_min: value[0],
      salary_max: value[1]
    }));
  };

  return (
    <div className="filters-bar">
        <div className='search-box'>
            
            <img src={search_logo} className = 'search-logo' alt='search-logo'></img>
            <div className='text-box search-inside-box'>
                <TextInput
                className="filter-input "
                placeholder="Search By Job Title, Role"
                value={filters.title}
                onChange={e => setFilters({ ...filters, title: e.target.value })}
                />
            </div>
            
        </div>
        <div className='location-box'>
            <img src={location_logo}  className = 'location-logo' alt='location_logo'></img>
            <div className='text-box'>
                <TextInput
                    className="filter-input"
                    placeholder="Preferred Location"
                    value={filters.location}
                    onChange={e => setFilters({ ...filters, location: e.target.value })}
                />
            </div>
            
        </div>

        <div className='job-type-box'>
            <img src={job_type_logo} className = 'job-logo' alt='job_type_logo'></img>
            <div className='text-box'>
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
            </div>
            
        </div>
        <div className='slider-box'>
            <div className="salary-slider-row">
                <div className='text-slider'>
                    <label className="salary-label">Salary Per Month</label>
                    <span className="salary-value">
                        ₹{filters.salary[0] / 1000}k - ₹{filters.salary[1] / 1000}k
                    </span>
                </div>
            
            <RangeSlider
                min={0}
                max={200000}
                step={1000}
                value={filters.salary}
                onChange={handleSalaryChange}
                className="salary-slider"
                styles={{
                track: { background: '#222222', height: 2 },
                thumb: { border: '5px solid #000', background: '#fff', width: 12.5, height: 12.5 },
                }}
                // Remove label prop for a clean look
            />
            </div>

        </div>

    
  
    </div>
    
  );
}



// Job card component
function JobCard({ job }) {

const logoMap = {
  Amazon: amazon,
  Swiggy: swiggy,
  Tesla: tesla,
  // Add more as needed
    };

  return (
    <div className="job-card">
  
      <div className="job-time-badge">24h Ago</div>
      <div className='job-card-header'>
  
          <div className="job-card-logo-container">
            <img
              src={logoMap[job.company] || job.logo_url || amazon} 
              alt={job.company}
              className="jobcard-logo"
            />
          </div>


          <div className="job-card-header-info">
            <div className="job-card-title">{job.title}</div>
            
          </div>
      </div>



      <div className="job-card-meta">
        <span className="job-card-meta-item exp-class">
          <img src={experience} alt='exp-logo'/>
          {job.requirements && job.requirements.trim() ? job.requirements : "1-3yr Exp"}
        </span>
        <span className='job-card-meta-item'><img src={onsite} alt='onsite-logo' />{job.location}</span>
        <span className="job-card-meta-item"><img src={packages} alt='packages-logo' />{job.salary_max
                ? `${Math.round((job.salary_max * 12) / 100000)} LPA`
                : ''}</span>
      </div>

      <ul className="job-card-description">
         <li>A user-friendly interface lets you browse stunning photos and videos</li>
         <li>Filter destinations based on interests and travel style, and create personalized </li>
      </ul>

      <Button color='#00aaff' size="lg"  fullWidth className="job-card-apply-btn">
        Apply Now
      </Button>
</div>
  );
}

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    job_type: '',
    salary: [0, 200000],
    salary_min: 0,
    salary_max: 200000
  });

  // Modal state for JobForm
  const [modalOpened, setModalOpened] = useState(false);

  // Fetch jobs function
  const fetchJobs = useCallback(async () => {
    try {
      const params = {
        title: filters.title,
        location: filters.location,
        job_type: filters.job_type,
        salary_min: filters.salary[0],
        salary_max: filters.salary[1]
      };
      const response = await axios.get('https://job-client-project.onrender.com/api/jobs', { params });
      setJobs(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [filters]);

  // Fetch jobs whenever filters change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Handler for when a job is created
  const handleJobCreated = () => {
    fetchJobs();        // Refresh job list
    setModalOpened(false); // Close the modal
  };

  return (
    <>
  <div className="navbar-filters-wrapper">
    <div className='navbar-container'>
        <Navbar onCreateJob={() => setModalOpened(true)} />
    </div>
    <div className='filters-container'>
      <FiltersBar filters={filters} setFilters={setFilters} />
    </div>
    
  </div>
  <Modal
    className="custom-modal"
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
    title="Create Job Opening"
    size="lg"
    radius="24px"
    centered
     styles={{
      content:{
        padding: '20px',
        fontFamily: "'Satoshi Variable', sans-serif",
      },
    title: { 
      
      width: '100%',
      textAlign: 'center',
      fontWeight: 600
    }
  }}
  >
    <JobForm onClose={() => setModalOpened(false)} onJobCreated={handleJobCreated} />
  </Modal>
  <div className='joblist-boxbox'>
    <Container size="xl" className="joblist-container">
    <div className='joblist-bg'>
      <Grid className="joblist-grid">
      {jobs.map(job => (
        <Grid.Col span={3} key={job.id}>
          <JobCard job={job} />
        </Grid.Col>
      ))}
    </Grid>
    </div>
    
  </Container>
  </div>
  
</>
  );
}

export default JobList;
