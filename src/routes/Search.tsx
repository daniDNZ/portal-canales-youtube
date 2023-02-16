import { SearchOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useDebounce from "../hooks/useDebounce";
import { fetchVideos } from "../slices/videosSlice";
import {
  fetchChannel,
  fetchChannels,
  selectChannels,
} from "../slices/channelsSlice";

interface IOption {
  name: string;
  thumb: string;
  id: string | undefined;
}
export default function Search() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [acOptions, setAcOptions] = useState<Array<IOption>>();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const dispatchData = (channelId: string) => {
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

  useEffect(() => {
    setAcOptions(
      channels?.items
        ? channels?.items.map((channel) => ({
            name: channel.snippet.title,
            thumb: channel.snippet.thumbnails.default.url,
            id: channel.id.channelId,
          }))
        : []
    );
  }, [channels]);

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: "600px", mx: "auto", mb: "60px" }}>
        <Autocomplete
          id="search-channel-input"
          freeSolo
          options={acOptions || []}
          getOptionLabel={(option) => (option as IOption).name || ""}
          onChange={(_ev, selectedValue) => {
            dispatchData((selectedValue as IOption).id || "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Channel"
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
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <>
                <Avatar
                  alt={option.name}
                  src={option.thumb}
                  sx={{ width: "22px", height: "22px", mr: "5px" }}
                />
                {option.name}
              </>
            </li>
          )}
        />
      </Stack>
    </>
  );
}
