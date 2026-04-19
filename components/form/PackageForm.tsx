import React, { useState } from 'react';

interface PackageFormProps {
  packageName: string;
  packageOptions: string[]; // Array of available package names
  onClose: () => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ packageName, packageOptions, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageName: packageName,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic (e.g., send form data to an API)
    try {
      const response = await fetch('/api/submit-package-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted:', formData);
        // Handle successful submission
        alert('Your request has been submitted successfully!');
        onClose(); // Close the modal/form after successful submission
      } else {
        console.error('Error submitting form:', response.statusText);
        alert('There was an issue with your request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your request.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Request {packageName} Package</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <select
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          >
            {/* Dynamically render package options */}
            {packageOptions.map((pkg, index) => (
              <option key={index} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any additional information"
          />
          <button type="submit">Submit Request</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PackageForm;
