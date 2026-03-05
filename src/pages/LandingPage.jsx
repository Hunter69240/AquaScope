import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LandingPage = () => {
  const [search,setSearch]=useState("")

  const handleClick=()=>{
    console.log(search)
    setSearch("")
  }
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
          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              lineHeight: 1.2
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

         
          <Box
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "background.paper",
                borderRadius: "40px",
                p: 0.5,
                width: "500px",
                boxShadow: 3
              }}
            >
              <TextField
                placeholder="Search..."
                variant="standard"
                fullWidth
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                sx={{
                  px: 2
                }}
              />

              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  borderRadius: "30px",
                  px: 4,
                  textTransform: "none"
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default LandingPage