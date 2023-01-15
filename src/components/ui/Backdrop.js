import { useDispatch } from "react-redux";
import { setBackToInitial } from "../../reducers/detailCardSlice";
import { setShowForm } from "../../reducers/authStateSlice";
import { setMessage } from "../../reducers/messageSlice";

///////////////////////////////////////////////////////////////
// This component creaes a black backdrop that blocks the view.
///////////////////////////////////////////////////////////////
const Backdrop = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black opacity-[.8] z-[30]"
      onClick={() => {
        dispatch(setBackToInitial());
        dispatch(setShowForm(false));
        dispatch(
          setMessage({
            show: false,
            header: null,
            body: null,
            color: null,
          })
        );
      }}
    ></div>
  );
};

export default Backdrop;
