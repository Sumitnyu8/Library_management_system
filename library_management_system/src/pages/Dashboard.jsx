import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";

function Dashboard() {
  return (
    <>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& > :not(style)": {
              m: 5,
              width: 1140,
              height: 500,
            },
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection:"column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"lightgrey"
            }}
          >
            <Typography variant="h2" style={{marginBottom:"50px"}}>
              Welcome to S.M Library
            </Typography>
            <Typography variant="h5">
              To continue search please click here to 
            </Typography>
            <Typography variant="h5">
            <Link component={RouterLink} to="/signin" underline="hover">
              signin
            </Link>
            </Typography>
          </Paper>
        </Box>
      </div>
    </>
  );
}

export default Dashboard;
