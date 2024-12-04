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
				<h2 className="contact-page__title">About Vegaway</h2>

				<p className="contact-page__description">
					Vegaway was born one late night in Malmö when Jacob, a passionate
					vegetarian, stared at his empty fridge. He dreamed of a service that
					could deliver fresh, plant-based options straight to his door—a
					perfect blend of convenience and sustainability.
				</p>
				<p className="contact-page__description">
					With the help of his friends Isak, a tech expert, and Linus, a
					culinary creator, Jacob launched Vegaway in 2020. Starting with bike
					deliveries in Malmö, the company quickly gained popularity for its
					high-quality, eco-friendly approach.
				</p>
				<p className="contact-page__description">
					Today, Vegaway is a leader in vegetarian home delivery, proving that
					green eating can be both accessible and sustainable.
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
 * Boiler plate code and folder structure.
 */
