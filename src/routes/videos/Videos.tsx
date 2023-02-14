import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectChannel } from "../search/channelsSlice";
import { fetchVideos, selectVideos } from "./videosSlice";
import Image from "mui-image";
import { EventRounded, VisibilityRounded } from "@mui/icons-material";
import useDebounce from "../../hooks/useDebounce";
import { getDate } from "../../utils/functions";

export default function Videos() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectVideos);
  const channelRaw = useAppSelector(selectChannel);
  console.log(channelRaw);
  const channel =
    channelRaw && channelRaw.items.length > 0 ? channelRaw.items[0] : undefined;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pageToken, setPageToken] = useState("");
  const debouncedPageToken: string = useDebounce<string>(pageToken, 500);
  const debouncedRowsPerPage: number = useDebounce<number>(rowsPerPage, 500);

  const dispatchData = () => {
    dispatch(
      fetchVideos({
        channelId: channel ? channel.id : "",
        rowsPerPage,
        pageToken,
      })
    );
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

  useEffect(() => {
    if (debouncedPageToken || debouncedRowsPerPage) {
      dispatchData();
    }
  }, [debouncedPageToken, debouncedRowsPerPage]);

  return (
    <>
      <TableContainer aria-label="Channel Table" sx={{ mt: 2 }}>
        <Table aria-labelledby="tableTitle" size="medium">
          <TableBody>
            {videos &&
              videos.items.map((row) => (
                <TableRow
                  key={row.id.videoId}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(event) =>
                    handleVideoClick(event, row.snippet.channelId)
                  }
                >
                  <TableCell sx={{ border: "none", width: "120px" }}>
                    <Image
                      src={row.snippet.thumbnails.default.url}
                      height="90px"
                      width="120px"
                      fit="cover"
                      duration={500}
                      easing="cubic-bezier(0.7, 0, 0.6, 1)"
                      showLoading={true}
                      errorIcon={true}
                      shift={null}
                      distance="100px"
                      shiftDuration={100}
                      bgColor="inherit"
                    />
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography variant="body1">{row.snippet.title}</Typography>
                    <Typography
                      variant="body2"
                      alignItems="center"
                      sx={{ display: "flex", gap: "5px" }}
                    >
                      <EventRounded color="disabled" fontSize="small" />
                      {getDate(row.snippet.publishedAt)}
                    </Typography>
                    <Typography
                      variant="body2"
                      alignItems="center"
                      sx={{ display: "flex", gap: "5px" }}
                    >
                      <VisibilityRounded color="disabled" fontSize="small" />
                      Fetch por vídeo para viewCount
                      {/* {row.statistics.viewCount} */}
                    </Typography>
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
