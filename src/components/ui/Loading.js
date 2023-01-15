///////////////////////////////////////////////
// This component displays a loading indicator.
///////////////////////////////////////////////
function Loading() {
  const width = window.innerHeight - 200;

  return (
    <div
      className={`flex items-center bg-[#eef0ff] `}
      style={{ height: `${width}px` }}
    >
      <i className="fa fa-spinner fa-pulse fa-10x fa-fw text-gray-700"></i>
    </div>
  );
}

export default Loading;
