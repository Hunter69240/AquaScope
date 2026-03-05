import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export default function ButtonAppBar({ mode, setMode }) {

  const toggleMode = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          color:'text.primary'
        }}
      >
        <Toolbar>
          <Stack justifyContent="space-between" sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                AquaScope
              </Typography>

              <Typography sx={{
                opacity:0.7
              }}>
                Find Any Fish. Know Every Detail.
              </Typography>
          </Stack>

          <Button onClick={toggleMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}