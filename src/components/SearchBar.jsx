import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useQuery } from '@tanstack/react-query'
import { getFish } from '../services/fishService'
import { validateFish } from '../utils/validateFish'
import Chip from '@mui/material/Chip'
import { useNavigate } from '@tanstack/react-router'

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const [clientError, setClientError] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")
  const navigate = useNavigate()

  const handleClick = () => {
    setClientError("")
    if (!validateFish(search)) {
      setClientError("Please enter a valid fish name (at least 3 characters, letters and spaces only).")
      return
    }
    if (search.toLowerCase() === 'goldfish') {
      setSubmittedSearch(search.toLowerCase())
      setSearch("")
    } else {
      setClientError("Invalid fish searched")
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["fish", submittedSearch],
    queryFn: () => getFish(submittedSearch),
    enabled: !!submittedSearch
  })

  useEffect(() => {
    if (data) {
      navigate({ to: '/FishInfo', search: { fish: submittedSearch } })
    }
  }, [data])

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: "40px",
          p: 0.5,
          width: { xs: "100%", sm: "500px" },
          boxShadow: 3
        }}
      >
        <TextField
          placeholder="Search..."
          variant="standard"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ px: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={isLoading}
          sx={{
            borderRadius: "30px",
            px: 4,
            textTransform: "none"
          }}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, mt: 1 }}>
        {clientError && <Chip label={clientError} color="error" />}
        {error && <Chip label={error.message} color="error" />}
        {!clientError && <Chip label={"The backend is down. Please search Goldfish"} color="error" />}
      </Box>
    </Box>
  )
}

export default SearchBar