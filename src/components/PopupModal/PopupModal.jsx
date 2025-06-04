const PopupModal = ({ message, onClose }) => (
  <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
    <div className='bg-white p-6 rounded shadow-md text-center'>
      <p>{message}</p>
      <button onClick={onClose} className='mt-4 btn'>
        OK
      </button>
    </div>
  </div>
);
export default PopupModal;
