import Modal from "react-modal";
import "./SavedMealModal.css";

/**
  A reusable modal component using `react-modal` to confirm that a food item was successfully saved to the daily tracker.

  - react-modal: https://www.npmjs.com/package/react-modal
 
  Props:
  (1) isOpen (boolean): Controls modal visibility.
  (2) onRequestClose (function): Function to close the modal when triggered.

  @example (parent: HomePage.jsx)
  <SavedMealModal
    isOpen={showModal}
    onRequestClose={() => setShowModal(false)}
  />
 */

const SavedMealModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Food data Uploaded Modal"
      className="saved-meal-modal"
      overlayClassName="saved-meal-modal-overlay"
    >
      <h3>This food item was saved in your daily tracker successfully!</h3>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SavedMealModal;
