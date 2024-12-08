import { useFeedbackStore } from "../../store/useFeedbackStore";
import "./feedback.css"; // You can style the component here

const Feedback: React.FC = ({}) => {
  // Access the store's state and actions
  const { message, isVisible, clearFeedback, setVisibility } =
    useFeedbackStore();

  // If the feedback message is null or is not visible, don't render the component
  if (!message || !isVisible) {
    return null;
  }

  const handleClose = () => {
    setVisibility(false);
    clearFeedback(); // Clear the feedback when closing
  };

  return (
    <div className="feedback feedback--overlay">
      <div className="card feedback__content">
        <p className="feedback__message">{message}</p>
        <button
          className="button feedback__button button button--first"
          onClick={handleClose}
        >
          <span className="button__text">Close</span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;

/* Författare: Isak
 *
 * Komponent som används för att ge användaren feedback vid diverse händelser eller fel
 */
