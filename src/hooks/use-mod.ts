import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setData } from "../../src/mod-slice";

//create mod to useQuery get the mod data and populate the redux slice
const fetchMod = async (id) => {
  const res = await fetch(`https://ugc-api.dovetailgames.com/mods/${id}`);
  return await res.json();
};

function useMod(id) {
  const dispatch = useDispatch();

  const { isLoading, isError, data, error, status } = useQuery(
    `mod-${id}`,
    () => fetchMod(id)
  );

  if (status === "success") dispatch(setData(data));

  return { isLoading, isError, error, status }; //data,
}

export default useMod;
