import AboutGroup from "../../assets/Aboutgroup.svg";
import Icon from "../../components/icon/Icon";
import "./contactPage.css";

function ContactPage() {
  return (
    <div className="contact-page wrapper">
      <div className="contact-page-hero">
        <div className="contact-page-title-container">
          <h1 className="contact-page__title">About Vegaway</h1>

          <p className="contact-page__description first-paragraph-about">
            Vegaway was born one late night in Malmö when Jacob, a passionate
            vegetarian, stared at his empty fridge. He dreamed of a service that
            could deliver fresh, plant-based options straight to his door—a
            perfect blend of convenience and sustainability.
          </p>
          <p className="contact-page__description second-paragraph-about-2">
            With the help of his friends Isak, a tech expert, and Linus, a
            culinary creator, Jacob launched Vegaway in 2020. Starting with bike
            deliveries in Malmö, the company quickly gained popularity for its
            high-quality, eco-friendly approach.
          </p>
        </div>
        <a className="kontaktLink" href="#kontaktForm">
          <img
            src={AboutGroup}
            alt="About Vegaway"
            className="about-group-icon"
          />
        </a>
      </div>

      <div className="contact-container-page px-1">
        <h2 className="contact-page__title">Our vision</h2>

        <p className="contact-page__description first-paragraph-ourvision-1">
          Our vision is to revolutionize food delivery by making plant-based
          options the natural first choice. We believe in a future where
          sustainable eating is not just a trend, but a way of life.
        </p>
        <p className="contact-page__description second-paragraph-ourvision-2">
          By 2025, we aim to operate entirely on renewable energy, use only
          eco-friendly packaging, and expand our service to all major Nordic
          cities while maintaining our commitment to local partnerships and zero
          food waste.
        </p>
        <section className="contact">
          <h2 className="contact-page__title contact-page__title-contact">
            Contact us
          </h2>
          <form id="kontaktForm" className="contact-page__form">
            <textarea
              id="meddelande"
              name="meddelande"
              className="contact-page__textarea"
              placeholder="Write your message ..."
            ></textarea>
            <button
              type="submit"
              className="button button--second contact-page__button"
            >
              <Icon name="Navigation" className="button__icon" />
              <span className="button__text">Send</span>
              <Icon name="ChevronRight" className="button__icon" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;

/* Författare: Linus
 *
 * Kontakt-sida, visar vår vision och hur man kan kontakta oss.
 * Innehållet kan vara något fiktivt.
 * Byggd enligt skiss. Spenderade på tok för mycket tid här.
 * Implementerade form för att kunna skicka meddelanden. (Som inte fungerar)
 */

/* Uppdaterad: Jacob
 *
 * Responsiv styling och rework.
 */
