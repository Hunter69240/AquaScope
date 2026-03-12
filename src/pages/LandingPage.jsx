import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchBar from '../components/SearchBar'
const LandingPage = () => {
 
  return (
    <Box>
      <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            pt: "64px", 
            background: theme =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg,#0f172a,#1e293b,#334155)"
                : "linear-gradient(135deg,#FFFFFF,#FBFAFA,#D7EAF5,#5DCCEF)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2
          }}
        >
        <Stack
          spacing={4}
          sx={{
            textAlign: "center",
            maxWidth: "900px",
            width: "100%",
            alignItems:'center'
          }}
        >
       
          <Typography
            variant="h3"
            
            sx={{
              fontWeight: "bold",
              lineHeight: 1.2,
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }
            }}
          >
            Your Gateway to Fish Knowledge—Type, Search, Discover
          </Typography>

          
          <Typography
            variant="subtitle1"
            sx={{
              opacity: 0.7,
              maxWidth: "700px",
              margin: "0 auto"
            }}
          >
            Bringing fish facts to life—dive into interactive 3D models,
            water requirements, and expert tips with a single search.
          </Typography>

         
          <SearchBar />
        </Stack>
      </Box>
    </Box>
  )
}

export default LandingPage