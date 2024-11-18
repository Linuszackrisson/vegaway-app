import './ContactPage.css'; 
import navigationIcon from '../../assets/navigation.png';
import arrowIcon from '../../assets/arrowright.png'
import yellowcircle from '../../assets/yellowcircle.png'
import twistarrow from '../../assets/twistarrow.png'
import ellipse2 from '../../assets/ellipse2.png';

function ContactPage() {
  return (
    <div className='contact-page'>
      <h2 className='contact-page__title'>Contact us</h2>
      <p className='contact-page__description'>We usually reply within a few hours .. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ... </p>
      <form id="kontaktForm" className='contact-page__form'>
        <textarea id="meddelande" name="meddelande" className='contact-page__textarea' placeholder="Write your message ..."></textarea>
        <button type="submit" className='contact-page__button'>
          <img src={navigationIcon} alt="Navigation" className='button-icon' />
          <p className='button_p'>Send</p>
          <img src={arrowIcon} alt="Arrow Right" className='button-icon' />
        </button>
        <div className="contact-page__readabout">
          <img src={ellipse2} alt="Read about us" className='ellipse-image' />
          <span className='ellipse-text'>Read about us</span>
        </div>
        <img src={yellowcircle} alt="yellowcircle" className='yellow-circle' />
        <img src={twistarrow} alt="yellowcircle" className='twist-arrow' />

      </form>
      
    </div>
  )
}

export default ContactPage

/**
 * Författare Linus
 * Boiler plate code and folder structure.
 */