import React, { useState } from 'react';
import { Modal, Button, TextInput, Select, Textarea, Group } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { DateInput } from '@mantine/dates';

function CreateJobModal() {
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // TODO: Send data to backend API
    reset();
    setOpened(false);
  };

  return (
    <>
      {/* Trigger button (replace with your navbar button as needed) */}
      <Button onClick={() => setOpened(true)}>Create Job</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Job Opening"
        size="lg"
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
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
            <Select
              label="Job Type"
              placeholder="Select job type"
              data={["FullTime", "PartTime", "Contract", "Internship"]}
              {...register('job_type', { required: 'Job Type is required' })}
              error={errors.job_type && errors.job_type.message}
            />
          </Group>

          <Group grow mb="sm">
            <TextInput
              label="Salary Min"
              placeholder="Minimum Salary"
              type="number"
              {...register('salary_min', { required: 'Minimum salary is required', valueAsNumber: true })}
              error={errors.salary_min && errors.salary_min.message}
            />
            <TextInput
              label="Salary Max"
              placeholder="Maximum Salary"
              type="number"
              {...register('salary_max', { required: 'Maximum salary is required', valueAsNumber: true })}
              error={errors.salary_max && errors.salary_max.message}
            />
            <DateInput
              label="Application Deadline"
              placeholder="Pick a date"
              {...register('application_deadline', { required: 'Application deadline is required' })}
              error={errors.application_deadline && errors.application_deadline.message}
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

          <Textarea
            label="Requirements"
            placeholder="List the job requirements"
            {...register('requirements')}
            mb="sm"
            minRows={2}
          />

          <Textarea
            label="Responsibilities"
            placeholder="List the job responsibilities"
            {...register('responsibilities')}
            mb="sm"
            minRows={2}
          />

          <Group position="apart" mt="md">
            <Button variant="default" onClick={() => setOpened(false)}>
              Save Draft
            </Button>
            <Button type="submit">Publish</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default CreateJobModal;
