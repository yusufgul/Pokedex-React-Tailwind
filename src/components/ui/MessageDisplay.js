import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../reducers/messageSlice";
import Backdrop from "./Backdrop";
import CloseButton from "./CloseButton";

////////////////////////////////////////////////
// This component creates a message box that can
// be customized.
////////////////////////////////////////////////
function MessageDisplay() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  return (
    <Fragment>
      <Backdrop />
      {/* Main border of message box */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col
    w-[350px] h-[200px] bg-[#f1f7fe] rounded-xl z-[30]"
      >
        {/* Header of message box */}
        <div
          className="flex justify-center items-center text-white font-medium 
        h-[25%] w-full border-b-2 border-black rounded-t-xl"
          style={{ backgroundColor: `${message.color}` }}
        >
          <CloseButton
            onClick={() =>
              dispatch(
                setMessage({
                  show: false,
                  header: null,
                  body: null,
                  color: null,
                })
              )
            }
          />
          {message.header}
        </div>
        {/* Message body */}
        <div className="flex justify-center items-center h-[75%] w-full p-6">
          {message.body}
        </div>
      </div>
    </Fragment>
  );
}

export default MessageDisplay;
