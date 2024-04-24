import React, { useState } from 'react';
import '../styles/ContactCTA.css';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement what happens when the form is submitted
    console.log('Form Data:', formData);
    alert('Thank you for reaching out!');
    // Reset form if needed
    setFormData({name: '', email: '', message: ''});
  };

  return (
    <div className="contact-section">
      <h2 className='formText'>Contact</h2>
      <h4 className='formText'>Have any questions or requests? Get in touch!</h4>

      <form onSubmit={handleSubmit} className="contact-form">        <input
          type="email"
          id="email"
          name="email" placeholder='Enter your email...'
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          id="message"
          name="message" placeholder='Type your message here...'
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactComponent;