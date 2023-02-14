import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "mui-image";
import { useEffect } from "react";
import { YTPortalBarChart, YTPortalPieChart } from "../components/Charts";
import Chips from "../components/Chips";
import { useAppSelector } from "../hooks/reduxHooks";
import { getDate } from "../utils/functions";
import { selectChannel } from "./search/channelsSlice";

export default function Dashboard() {
  const bgColor = grey[100];
  const channelRaw = useAppSelector(selectChannel);

  const channel =
    channelRaw && channelRaw.items.length > 0 ? channelRaw.items[0] : undefined;
  // TODO: CALCULAR SIGUIENTE TARGET DE SUBS Y PONERLO. CALCULAR ESTADÍSTICAS INTERESANTES
  const pieChartData = [
    {
      name: "Next target",
      value:
        channel &&
        Math.ceil(Number(channel.statistics.subscriberCount) / 10000) * 10000,
    },
    {
      name: "Subs",
      value: channel && Number(channel.statistics.subscriberCount),
    },
  ];

  const barChartData = [
    {
      name: "Views",
      value: channel && channel.statistics?.viewCount,
    },
    {
      name: "Videos",
      value: channel && channel.statistics?.videoCount,
    },
    {
      name: "Subs",
      value: channel && channel.statistics?.subscriberCount,
    },
  ];

  const chipsData =
    channel && channel.brandingSettings.channel.keywords.length > 0
      ? channel.brandingSettings.channel.keywords.split(" ")
      : [];

  useEffect(() => {
    console.log(channel);
  }, [channel]);
  return (
    <Container maxWidth="lg" sx={{ p: 4, bgcolor: bgColor }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              minHeight: 350,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Image
                  src={
                    channel && channel.brandingSettings.image.bannerExternalUrl
                  }
                  height="88px"
                  width="100%"
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
              </Grid>
              <Grid item xs={2}>
                <Avatar
                  alt={channel && channel.snippet.title}
                  src={channel && channel.snippet.thumbnails.default.url}
                  sx={{ width: "88px", height: "88px" }}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">
                  {channel && channel.snippet.title}
                </Typography>
                <Typography variant="h6">
                  {channel && channel.snippet.description}
                </Typography>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="body1">
                  Published at:{" "}
                  {channel && getDate(channel.snippet.publishedAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Chips data={chipsData} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 350,
            }}
          >
            <Typography variant="h3">
              {channel && channel.statistics.subscriberCount}
            </Typography>
            <Typography variant="h5">Subscribers</Typography>
            <YTPortalPieChart data={pieChartData} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", height: 350 }}
          >
            <YTPortalBarChart data={barChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
