import React from 'react';

const ContactsPage = () => {
  return (
    <section className="section">
      <h2 className="section-title">Контакты</h2>
      <p className="section-subtitle">Свяжитесь с нами удобным способом</p>
      
      <div className="contacts-grid">
        <div className="contact-card">
          <span className="material-icons-round">telegram</span>
          <h3>Telegram</h3>
          <p>@naex_agency</p>
        </div>
        <div className="contact-card">
          <span className="material-icons-round">email</span>
          <h3>Email</h3>
          <p>hello@naex.agency</p>
        </div>
        <div className="contact-card">
          <span className="material-icons-round">phone</span>
          <h3>Телефон</h3>
          <p>+7 (999) 123-45-67</p>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
