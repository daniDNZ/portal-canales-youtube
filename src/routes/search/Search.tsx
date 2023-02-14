import { SearchOutlined } from "@mui/icons-material";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useDebounce from "../../hooks/useDebounce";
import { fetchVideos } from "../videos/videosSlice";
import { fetchChannel, fetchChannels, selectChannels } from "./channelsSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  /**
   * Dispatch Api request for the channel and its videos
   *
   * @param {string}channelTitle
   */
  const dispatchData = (channelTitle: string) => {
    const channelId = channels.items.find(
      (item) => item.snippet.channelTitle === channelTitle
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
    if (debouncedSearchTerm) {
      dispatch(fetchChannels(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: "600px", mx: "auto", mb: "60px" }}>
        <Autocomplete
          id="search-channel-input"
          freeSolo
          options={channels.items.map((option) => option.snippet.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Channels"
              InputProps={{
                ...params.InputProps,
                type: "search",
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
            console.log(selectedValue);
            dispatchData(selectedValue ? selectedValue : "");
          }}
        />
      </Stack>
    </>
  );
}
