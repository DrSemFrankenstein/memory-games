import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AlbumLayout({
  cards,
  title,
  subtitle,
  info,
  updateGameComponent,
}) {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {subtitle}
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4} sx={{ placeContent: "center" }}>
          {cards?.map((card, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(import.meta.env.BASE_URL + card.path);
                  updateGameComponent();
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={card.Image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.Heading}
                  </Typography>
                  <Typography>{card.Description}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" fullWidth>
                    {card.action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {info}
        </Typography>
      </Container>
    </main>
  );
}
