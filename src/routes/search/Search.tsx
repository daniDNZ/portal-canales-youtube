import { SearchOutlined } from "@mui/icons-material";
import {
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchChannel, fetchChannels, selectChannels } from "./searchSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pageToken, setPageToken] = useState("");

  const dispatchData = () => {
    dispatch(fetchChannels({ searchTerm, rowsPerPage, pageToken }));
  };

  // TODO: No va muy bien el paginar. Al lanzar la petición, no devuelve la misma página excepto la primera de todas.
  const handleChangePage = (_ev: unknown, newPage: number) => {
    if (newPage > page && channels.nextPageToken) {
      setPageToken(channels.nextPageToken);
    } else if (newPage < page && channels.prevPageToken) {
      setPageToken(channels.prevPageToken);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+ev.target.value);
  };

  const handleChannelClick = (
    _ev: React.MouseEvent<unknown>,
    channelId: string
  ) => {
    dispatch(fetchChannel(channelId));
  };

  useEffect(() => {
    dispatchData();
  }, [searchTerm, rowsPerPage, page]);

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: "600px", mx: "auto", mb: "60px" }}>
        <TextField
          id="search-input"
          value={searchTerm}
          label="Search Channels"
          variant="outlined"
          onChange={(ev) => {
            if (typeof ev.target.value === "string") {
              setSearchTerm(ev.target.value);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ minWidth: 650 }} aria-label="Channel Table">
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableBody>
              {channels.items.map((row) => (
                <TableRow
                  key={row.snippet.channelId}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(event) =>
                    handleChannelClick(event, row.snippet.channelId)
                  }
                >
                  <TableCell component="th" scope="row" sx={{ border: "none" }}>
                    {row.snippet.channelTitle}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={channels.pageInfo.totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
