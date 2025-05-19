import React from 'react';
import { TextInput, Select, Textarea, Button, Group } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { DateInput } from '@mantine/dates';
import axios from 'axios';
import '@mantine/dates/styles.css';


function JobForm({ onClose, onJobCreated }) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Format date as YYYY-MM-DD if needed
      if (data.application_deadline instanceof Date) {
        const yyyy = data.application_deadline.getFullYear();
        const mm = String(data.application_deadline.getMonth() + 1).padStart(2, '0');
        const dd = String(data.application_deadline.getDate()).padStart(2, '0');
        data.application_deadline = `${yyyy}-${mm}-${dd}`;
      }
      await axios.post('https://job-client-project.onrender.com/api/jobs', data);
      reset();
      if (onJobCreated) onJobCreated();
      if (onClose) onClose();
    } catch (error) {
      console.error('Failed to create job:', error);
      // Optionally, show error to user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group grow mb="sm">
        <TextInput
          label="Job Title"
          placeholder="Full Stack Developer"
          {...register('title', { required: 'Job Title is required' })}
          error={errors.title && errors.title.message}
        />
        <TextInput
          label="Company Name"
          placeholder="Amazon, Microsoft, Swiggy"
          {...register('company', { required: 'Company Name is required' })}
          error={errors.company && errors.company.message}
        />
      </Group>
      <Group grow mb="sm">
        <TextInput
          label="Location"
          placeholder="Preferred Location"
          {...register('location', { required: 'Location is required' })}
          error={errors.location && errors.location.message}
        />
        <Controller
          name="job_type"
          control={control}
          rules={{ required: 'Job Type is required' }}
          render={({ field }) => (
            <Select
              label="Job Type"
              placeholder="Select job type"
              data={["FullTime", "PartTime", "Contract", "Internship"]}
              {...field}
              error={errors.job_type && errors.job_type.message}
            />
          )}
        />
      </Group>
       <Group grow mb="sm" className="salary-deadline-row">
        <div className="salary-range-group">
          <label className="salary-range-label">Salary Range</label>
          <div className="salary-range-inputs">
            <div className="salary-range-input">
              <TextInput
                placeholder="₹ 0"
                type="number"
                {...register('salary_min', { required: 'Minimum salary is required', valueAsNumber: true })}
                className="custom-input sal-min-input"
                style={{ paddingLeft: 32 }}
              />
            </div>
            <div className="salary-range-input">

              <TextInput
                placeholder="₹ 12,00,000"
                type="number"
                {...register('salary_max', { required: 'Maximum salary is required', valueAsNumber: true })}
                className="custom-input"
                style={{ paddingLeft: 32 }}
              />
            </div>
          </div>
        </div>
        <Controller
          name="application_deadline"
          control={control}
          rules={{ required: 'Application deadline is required' }}
          render={({ field }) => (
            <DateInput
              label="Application Deadline"
              placeholder="Pick a date"
              {...field}
              className="custom-input application-input"
            />
          )}
        />
      </Group>

      <Textarea
        label="Job Description"
        placeholder="Please share a description to let the candidate know more about the job role"
        {...register('description', { required: 'Job description is required' })}
        error={errors.description && errors.description.message}
        mb="sm"
        minRows={3}
      />
      <Group position="apart" mt="md">
        <Button variant="default" className="modal-btn save-draft-btn" onClick={onClose} type="button">
          Save Draft
        </Button>
        <Button type="submit" className="modal-btn publish-btn">
          Publish <span style={{fontSize: 18, marginLeft: 4}}>&#187;</span>
        </Button>
      </Group>
    </form>
  );
}

export default JobForm;
