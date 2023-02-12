import { SearchOutlined } from "@mui/icons-material";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchChannel,
  fetchChannels,
  fetchVideos,
  selectChannels,
} from "./searchSlice";
//TODO: COMPROBAR SI EL REFACTOR FUNCIONA
export default function Search() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatchData = (value: string) => {
    const channelId = channels.items.find(
      (item) => item.snippet.channelTitle === value
    )?.id.channelId;

    dispatch(fetchChannel(channelId ? channelId : ""));
    dispatch(
      fetchVideos({
        channelId: channelId ? channelId : "",
        rowsPerPage: 10,
        pageToken: "",
      })
    );
  };

  useEffect(() => {
    dispatch(fetchChannels(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: "600px", mx: "auto", mb: "60px" }}>
        <Autocomplete
          id="search-channel-input"
          freeSolo
          options={channels.items.map((option) => option.snippet.channelTitle)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Channels"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              onChange={(ev) => {
                if (typeof ev.target.value === "string") {
                  setSearchTerm(ev.target.value);
                }
              }}
            />
          )}
          onChange={(_ev, selectedValue) => {
            dispatchData(selectedValue ? selectedValue : "");
          }}
        />
      </Stack>
    </>
  );
}
