import React, { useState } from "react";
import ContactCard from "../../components/contactCard.js";
import "../../styles/pages/contactForm.css";
import RestaurantMap from "../../components/RestaurantMap.js";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the data if needed
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <RestaurantMap />
      </div>
      <div className="contact-card-container">
        <ContactCard name={name} email={email} content={content} />
      </div>
    </div>
  );
};

export default ContactForm;
