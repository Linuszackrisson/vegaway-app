import './ContactPage.css'; 

function ContactPage() {
  return (
    <div className='contact-page'>
      <h2 className='contact-page__title'>Contact us</h2>
      <p className='contact-page__description'>We usually reply within a few hours .. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ... </p>
      <form id="kontaktForm" className='contact-page__form'>
        <textarea id="meddelande" name="meddelande" className='contact-page__textarea' placeholder="Write your message ..."></textarea>
        <button type="submit" className='contact-page__button'>Send</button>
      </form>
    </div>
  )
}

export default ContactPage

/**
 * Författare Linus
 * Boiler plate code and folder structure.
 */