import './ContactPage.css'; 
import AboutGroup from '../../assets/Aboutgroup.svg';
import Icon from '../../components/icon/Icon';


function ContactPage() {
  return (
		<div className="contact-page wrapper">
			<a className="kontaktLink" href="#kontaktForm">
				<img
					src={AboutGroup}
					alt="About Vegaway"
					className="about-group-icon"
				/>
			</a>
			<div className="contact-container-page px-1">
				<h1 className="contact-page__title">About Vegaway</h1>

				<p className="contact-page__description first-paragraph-contact">
					Vegaway was born one late night in Malmö when Jacob, a passionate
					vegetarian, stared at his empty fridge. He dreamed of a service that
					could deliver fresh, plant-based options straight to his door—a
					perfect blend of convenience and sustainability.
				</p>
				<p className="contact-page__description second-paragraph-contact">
					With the help of his friends Isak, a tech expert, and Linus, a
					culinary creator, Jacob launched Vegaway in 2020. Starting with bike
					deliveries in Malmö, the company quickly gained popularity for its
					high-quality, eco-friendly approach.
				</p>
				<h2 className="contact-page__title">Our vision</h2>

				<p className="contact-page__description">
					Our vision is to revolutionize food delivery by making plant-based options 
					the natural first choice. We believe in a future where sustainable eating 
					is not just a trend, but a way of life.
				</p>
				<p className="contact-page__description">
					By 2025, we aim to operate entirely on renewable energy, use only 
					eco-friendly packaging, and expand our service to all major Nordic cities 
					while maintaining our commitment to local partnerships and zero food waste.
				</p>
				<h2 className="contact-page__title">Contact us</h2>

				<form id="kontaktForm" className="contact-page__form">
					<textarea
						id="meddelande"
						name="meddelande"
						className="contact-page__textarea"
						placeholder="Write your message ..."
					></textarea>
					<button type="submit" className="button button--second contact-page__button">
						<Icon name="Navigation" className="button__icon" />
						<p className="button_p">Send</p>
						<Icon name="ChevronRight" className="button__icon" />

					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactPage

/**
 * Författare Linus
 * Boiler plate code and folder structure. Samt innehåll. 
 * Uppdaterad: 2024-12-04 med global och responsiv styling
 */
