import Types from "../../constants/Types";
import { useDispatch } from "react-redux";
import { setDetailCard } from "../../reducers/detailCardSlice";

//////////////////////////////////////////////////////////////////////////
// This component creates a wrapper card for individual pokemons from the
// fetched data.
//////////////////////////////////////////////////////////////////////////
const PokemonCard = ({ id, name, types, picture }) => {
  const dispatch = useDispatch();
  const type0Class = getTypeClass(types[0]);
  const type1Class = getTypeClass(types[1]);

  const handleClick = () => {
    dispatch(
      setDetailCard({
        show: true,
        id: id,
        name: name,
      })
    );
  };
  return (
    // Main card outline
    <li
      className="relative flex flex-col border-[#8877e7] border-solid border-[4px] rounded-xl
      p-3 hover:drop-shadow-2xl h-[240px] w-[180px] max-[405px]:w-[165px] outline outline-1 outline-[#A050E5] bg-[#a1ade0]"
      onClick={handleClick}
    >
      {/* id div */}
      <div
        className="w-[22px] h-[22px] rounded-full bg-[#8877e7] flex justify-center items-center text-white 
        text-xs absolute top-[4px] left-[4px] outline outline-2 outline-[#6e5ae4] scale-[0.8]"
      >
        {id}
      </div>

      {/* name div */}
      <div
        className="mx-auto text-[16px] text-center font-medium text-white bg-[#8877e7] rounded-lg 
      px-[6px] mt-[10px] outline outline-2 outline-[#6e5ae4] max-w-[105px]"
      >
        {name}
      </div>

      {/* image div */}
      <div className="m-auto w-[130px] h-[130px] flex rounded-xl bg-[#eef0ff]/[0.7] border-2 border-[#8877e7]">
        <img className="m-auto" src={picture} />
      </div>

      {/* types div */}
      <div className="mx-auto flex flex-row w-[130px]">
        <div
          className={`mx-auto text-[14px] text-center text-white font-medium rounded-md w-[60px]
           border border-y-[1px] border-x-0 ${type0Class}`}
        >
          {types[0]}
        </div>
        {types[1] && (
          <div
            className={`mx-auto text-[14px] text-center text-white font-medium rounded-md w-[60px] 
            border border-y-[1px] border-x-0 ${type1Class}`}
          >
            {types[1]}
          </div>
        )}
      </div>
    </li>
  );
};

// Get background and border colors according to the pokemons' type
const getTypeClass = (type) => {
  const data = Types.find((t) => t.name === type);
  const typeClass = data ? data.class : "";
  return typeClass;
};

export default PokemonCard;
