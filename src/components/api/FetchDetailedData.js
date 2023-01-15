import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArtWork,
  setGenera,
  setGeneration,
  setText,
  setFirstEvolution,
  setSecondEvolution,
  setThirdEvolution,
  setBackToInitial,
} from "../../reducers/detailCardSlice";
import { setMessage } from "../../reducers/messageSlice";
import { setDetailedDataLoading } from "../../reducers/isLoadingSlice";

//////////////////////////////////////////////////////////////////////////
// This component fetches more data about pokemons when clicked on them.
// It selects some info specially from the coming data and set them to the
// corresponding states to let them be used later.
//////////////////////////////////////////////////////////////////////////
const FetchDetailedData = () => {
  const dispatch = useDispatch();
  const detailCard = useSelector((state) => state.detailCard);
  const pokemonData = useSelector((state) => state.pokemonData);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setDetailedDataLoading(true));
      try {
        //Fetch detailed data for selected pokemon
        const response = await fetch(
          pokemonData[detailCard.id - 1].species.url
        );
        const data = await response.json();

        //Fetch evolution data for selected pokemon
        const evolutionResponse = await fetch(data.evolution_chain?.url);
        const evolutionData = await evolutionResponse.json();

        //Fetch art image for selected pokemon
        const imageResponse = await fetch(
          pokemonData[detailCard.id - 1].sprites.other[`official-artwork`]
            .front_default
        );
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }
        // Extract the image from the api response
        const blob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(blob);

        dispatch(setArtWork(imageUrl));

        dispatch(setGeneration(data.generation?.name));

        // There is a evolution order for every evolving pokemons.
        // There is always one pokemon at the start of evolution chain.
        // If they are exist, add second and third pokemon of the chain.
        dispatch(
          setFirstEvolution({
            id: evolutionData.chain?.species?.url.split("/")[
              evolutionData.chain.species.url.split("/").length - 2
            ],
            name: evolutionData.chain?.species?.name,
          })
        );

        dispatch(
          setSecondEvolution({
            id: evolutionData.chain?.evolves_to[0]?.species?.url.split("/")[
              evolutionData.chain.evolves_to[0].species.url.split("/").length -
                2
            ],
            name: evolutionData.chain?.evolves_to[0]?.species?.name,
          })
        );

        dispatch(
          setThirdEvolution({
            id: evolutionData.chain?.evolves_to[0]?.evolves_to[0]?.species?.url.split(
              "/"
            )[
              evolutionData.chain.evolves_to[0].evolves_to[0].species.url.split(
                "/"
              ).length - 2
            ],
            name: evolutionData.chain?.evolves_to[0]?.evolves_to[0]?.species
              ?.name,
          })
        );

        //Some pokemons have english texts at different order, so we need to check whether it is english or not
        const genus = data.genera.find(
          (genera) => genera.language.name === "en"
        )?.genus;
        dispatch(setGenera(genus));

        const text = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        )?.flavor_text;
        dispatch(setText(text));
      } catch (error) {
        dispatch(setDetailedDataLoading(false));
        dispatch(setBackToInitial());
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      }
      dispatch(setDetailedDataLoading(false));
    };
    fetchData();
  }, [detailCard.id]);
  return null;
};

export default FetchDetailedData;
