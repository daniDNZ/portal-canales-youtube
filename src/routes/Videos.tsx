import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchVideos, selectChannel, selectVideos } from "./search/searchSlice";

export default function Videos() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectVideos);
  const channel = useAppSelector(selectChannel);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pageToken, setPageToken] = useState("");

  const dispatchData = () => {
    dispatch(fetchVideos({ channelId: "", rowsPerPage, pageToken }));
  };

  // TODO: No va muy bien el paginar. Al lanzar la petición, no devuelve la misma página excepto la primera de todas.
  const handleChangePage = (_ev: unknown, newPage: number) => {
    if (newPage > page && videos.nextPageToken) {
      setPageToken(videos.nextPageToken);
    } else if (newPage < page && videos.prevPageToken) {
      setPageToken(videos.prevPageToken);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+ev.target.value);
  };

  const handleVideoClick = (
    _ev: React.MouseEvent<unknown>,
    channelId: string
  ) => {
    console.log("click");
  };

  return (
    <>
      <TableContainer sx={{ minWidth: 650 }} aria-label="Channel Table">
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableBody>
            {videos.items.map((row) => (
              <TableRow
                key={row.snippet.channelId}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(event) =>
                  handleVideoClick(event, row.snippet.channelId)
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
        count={videos.pageInfo.totalResults}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
