// import apiFetch, { IApiFetchParams } from "../utils/apiFetch";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchChannels, selectChannels } from "./searchSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);

  useEffect(() => {
    console.log(channels);
  }, [channels]);
  // apiFetch(request).then((data) => console.log(data));
  return (
    <>
      <h1>Search</h1>
      <button onClick={() => dispatch(fetchChannels())}>getChannels</button>
    </>
  );
}
