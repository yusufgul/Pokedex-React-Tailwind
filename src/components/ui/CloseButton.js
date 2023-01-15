/////////////////////////////////////////////////
// This component creaes a reusable close button.
/////////////////////////////////////////////////
const CloseButton = (props) => {
  return (
    <button
      className="absolute flex right-[4px] top-[4px] h-[21px] w-[21px] justify-center items-center border-2
border-red-800 bg-red-600 rounded-full font-medium text-white"
      onClick={props.onClick}
    >
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>
  );
};

export default CloseButton;
