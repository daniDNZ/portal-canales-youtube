import {
  Box,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { selectChannel } from "../slices/channelsSlice";
import { fetchVideos, selectVideos } from "../slices/videosSlice";
import Image from "mui-image";
import { EventRounded, VisibilityRounded } from "@mui/icons-material";
import { getFormattedDate, getIframeUrl } from "../utils/functions";
import {
  IApiResponse,
  IApiSpecificSearchResponse,
  ISpecificSearchItem,
} from "../models/api";
// TODO PROBAR PAGINACIÓN

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: {
    xs: 0,
    md: 4,
  },
  width: {
    xs: "95%",
  },
  height: {
    xs: "40%",
  },
};

export default function Videos() {
  const dispatch = useAppDispatch();
  const videosRaw = useAppSelector(selectVideos);
  const channelRaw = useAppSelector(selectChannel);
  const [videos, setVideos] = useState<IApiResponse | undefined>(
    videosRaw.videos
  );
  const [videosStats, setVideosStats] = useState<
    IApiSpecificSearchResponse | undefined
  >(videosRaw.videosStats);
  const [channel, setChannel] = useState<ISpecificSearchItem | undefined>(
    channelRaw?.items[0]
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIframe, setModalIframe] = useState<JSX.Element>();
  const [pageToken, setPageToken] = useState("");

  const dispatchData = useCallback(() => {
    dispatch(
      fetchVideos({
        channelId: channel?.id ? channel.id : "",
        rowsPerPage,
        pageToken,
      })
    );
  }, [channel?.id, dispatch, pageToken, rowsPerPage]);

  const handleChangePage = (_ev: unknown, newPage: number) => {
    if (newPage > page && videos?.nextPageToken) {
      setPageToken(videos.nextPageToken);
    } else if (newPage < page && videos?.prevPageToken) {
      setPageToken(videos.prevPageToken);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+ev.target.value);
  };

  const handleVideoClick = (
    _ev: React.MouseEvent<unknown>,
    videoId: string
  ) => {
    const iframeString =
      videosStats?.items.find((item) => item.id === videoId)?.player
        ?.embedHtml || "";
    const url = getIframeUrl(iframeString);
    setModalIframe(
      <iframe
        title="YT Vídeo Player"
        src={url}
        width="100%"
        height="100%"
        allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;"
        style={{
          border: "none",
        }}
      />
    );
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (channel) {
      dispatchData();
    }
  }, [channel, rowsPerPage, page, dispatchData]);

  useEffect(() => {
    setChannel(channelRaw?.items[0]);
  }, [channelRaw]);

  useEffect(() => {
    setVideos(videosRaw?.videos);
  }, [videosRaw]);

  useEffect(() => {
    setVideosStats(videosRaw?.videosStats);
  }, [videosRaw]);

  return (
    <>
      <TableContainer aria-label="Channel Table" sx={{ mt: 2 }}>
        <Table aria-labelledby="tableTitle" size="medium">
          <TableBody>
            {videos?.items.map((row) => (
              <TableRow
                key={row.id.videoId}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(event) =>
                  handleVideoClick(event, row.id.videoId ? row.id.videoId : "")
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
                    {getFormattedDate(row.snippet.publishedAt)}
                  </Typography>
                  <Typography
                    variant="body2"
                    alignItems="center"
                    sx={{ display: "flex", gap: "5px" }}
                  >
                    <VisibilityRounded color="disabled" fontSize="small" />
                    {
                      videosStats?.items.find(
                        (item) => item.id === row.id.videoId
                      )?.statistics?.viewCount
                    }
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
        count={videos ? videos.pageInfo.totalResults : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        closeAfterTransition
      >
        <Fade in={modalIsOpen}>
          <Box sx={modalStyle}>{modalIframe}</Box>
        </Fade>
      </Modal>
    </>
  );
}
