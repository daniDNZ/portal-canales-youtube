import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { useEffect, useState } from "react";
import {
  IData,
  YTPortalBarChart,
  YTPortalPieChart,
} from "../components/Charts";
import Chips from "../components/Chips";
import { useAppSelector } from "../hooks/reduxHooks";
import { getAverage, getFormattedDate } from "../utils/functions";
import { selectChannel } from "../slices/channelsSlice";
import { Subscriptions, Visibility, YouTube } from "@mui/icons-material";
import { ISpecificSearchItem } from "../models/api";

export default function Dashboard() {
  const channelRaw = useAppSelector(selectChannel);
  const [channelStatistics, setChannelStatistics] = useState({
    subs: 0,
    videos: 0,
    views: 0,
  });
  const [pieChartData, setPieChartData] = useState<Array<IData>>();
  const [barChartData, setBarChartData] = useState<Array<IData>>();
  const [channel, setChannel] = useState<ISpecificSearchItem | undefined>();
  const [chipsData, setChipsData] = useState<Array<string>>([]);

  useEffect(() => {
    setChannel(channelRaw?.items[0]);
  }, [channelRaw]);

  useEffect(() => {
    setChannelStatistics({
      subs: channel?.statistics
        ? Number(channel.statistics.subscriberCount)
        : 0,
      videos: channel?.statistics ? Number(channel.statistics.videoCount) : 0,
      views: channel?.statistics ? Number(channel.statistics.viewCount) : 0,
    });

    setChipsData(
      channel?.brandingSettings &&
        channel.brandingSettings.channel.keywords.length > 0
        ? channel.brandingSettings.channel.keywords.split(" ").slice(0, 8)
        : []
    );
  }, [channel]);

  useEffect(() => {
    const getNextSubsTarget = () => {
      const subs = channelStatistics.subs ? channelStatistics.subs : 1;

      // Digits of subs number - 1
      const digits = Math.floor(Math.log10(subs));

      const nextTarget = subs + Math.pow(10, digits);
      return nextTarget - subs;
    };

    const getPieChartData = () => {
      return [
        {
          name: "Next target",
          value: getNextSubsTarget(),
        },
        {
          name: "Subs",
          value: channelStatistics.subs,
        },
      ];
    };

    const getBarChartData = () => {
      return [
        {
          name: "Views per Sub",
          value: getAverage(channelStatistics.views, channelStatistics.subs),
        },
        {
          name: "Subs per Video",
          value: getAverage(channelStatistics.subs, channelStatistics.videos),
        },
      ];
    };

    setPieChartData(getPieChartData());

    setBarChartData(getBarChartData());
  }, [channelStatistics]);

  return (
    <Container maxWidth="lg" sx={{ p: 4, bgcolor: "background.default" }}>
      {channel && channelStatistics ? (
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
                      channel?.brandingSettings
                        ? channel.brandingSettings.image.bannerExternalUrl
                        : ""
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
                <Grid item xs={12} md={2}>
                  <Avatar
                    alt={channel && channel.snippet.title}
                    src={channel && channel.snippet.thumbnails.default.url}
                    sx={{
                      width: 88,
                      height: 88,
                      margin: "0 auto",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography
                    variant="h5"
                    width="fit-content"
                    margin={{ xs: "0 auto", md: "0" }}
                  >
                    {channel && channel.snippet.title}
                  </Typography>
                  <Tooltip title={channel && channel.snippet.description}>
                    <Typography variant="h6" noWrap>
                      {channel && channel.snippet.description}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="body1">
                    Published at:{" "}
                    {channel && getFormattedDate(channel.snippet.publishedAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Chips data={chipsData} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Subs & Pie Chart */}
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
                {channel?.statistics && channel.statistics.subscriberCount}
              </Typography>
              <Typography variant="h5">Subscribers</Typography>
              <YTPortalPieChart data={pieChartData} />
            </Paper>
          </Grid>
          {/* Bar Chart & Statistics */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                minHeight: 350,
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} md={8}>
                  <YTPortalBarChart data={barChartData} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <List>
                    <ListItem disablePadding>
                      <Tooltip title="Subscriptions">
                        <ListItemButton>
                          <ListItemIcon>
                            <Subscriptions color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={channelStatistics.subs} />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                    <ListItem disablePadding>
                      <Tooltip title="Views">
                        <ListItemButton>
                          <ListItemIcon>
                            <Visibility color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={channelStatistics.views} />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                    <ListItem disablePadding>
                      <Tooltip title="Videos">
                        <ListItemButton>
                          <ListItemIcon>
                            <YouTube color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={channelStatistics.videos} />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 350,
          }}
        >
          <Typography variant="button">No channel</Typography>
        </Paper>
      )}
    </Container>
  );
}
