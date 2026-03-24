import { useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getFish } from '../services/fishService'

import {
  Box, Typography, Chip, Grid, Paper,
  Divider, useTheme, CircularProgress, Stack
} from '@mui/material'

const LANG_LABEL = {
  en: 'EN', pt: 'PT', de: 'DE', fr: 'FR', es: 'ES',
  ja: 'JA', ru: 'RU', pl: 'PL', af: 'AF', da: 'DA', et: 'ET'
}

const SectionTitle = ({ children }) => {
  const theme = useTheme()
  return (
    <Typography
      variant="h6"
      fontWeight={700}
      sx={{
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        pb: 0.5,
        mb: 1.5,
        fontFamily: "'Georgia', serif",
        letterSpacing: 0.3,
      }}
    >
      {children}
    </Typography>
  )
}

const StatCard = ({ label, value }) => (
  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
    <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={0.5}>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={700} color="primary">
      {value}
    </Typography>
  </Paper>
)
const FishInfo = () => {
  const { fish } = useSearch({ from: '/FishInfo' })
  const theme = useTheme()

  const [activeImg, setActiveImg] = useState(0)
  const is3D = activeImg === -1

  const { data, isLoading, error } = useQuery({
    queryKey: ['fish', fish],
    queryFn: () => getFish(fish),
    enabled: !!fish,
  })

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    )

  if (!data)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>No data found.</Typography>
      </Box>
    )

  const taxonomyChain = Object.entries(data.taxonomy)
    .filter(([k]) => k !== 'ScientificName')
    .map(([, v]) => v)
    .join(' → ')

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, pt: { xs: 10, sm: 12 }, pb: 6 }}>

     
      <Grid container spacing={4} mb={4} alignItems="flex-start">

       
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 320,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
              mb: 1.5,
              position: 'relative',
            }}
          >
            {is3D ? (
              data.threedstatus?.exists ? (
                
                <model-viewer
                src="goldfish.glb"
                poster={data.threedthumb}
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              ) : (
               
                <Box sx={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 1.5,
                  p: 3, textAlign: 'center',
                }}>
                  <CircularProgress size={36} />
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    3D Model is being generated
                  </Typography>
                  <Chip
                    label={`Status: ${data.threedstatus?.status ?? 'queued'}`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                  {data.threedstatus?.estimated_time && (
                    <Typography variant="caption" color="text.secondary">
                      Estimated time: ~{data.threedstatus.estimated_time}s
                    </Typography>
                  )}
                </Box>
              )
            ) : (
             
              <Box
                component="img"
                src={data.images[activeImg].actual}
                alt={data.scientificName}
                sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
          </Paper>

          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {data.images.map((img, i) => (
              <Paper
                key={i}
                variant="outlined"
                onClick={() => setActiveImg(i)}
                sx={{
                  width: 72, height: 52,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: i === activeImg
                    ? `2px solid ${theme.palette.primary.main}`
                    : `2px solid transparent`,
                  overflow: 'hidden',
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                }}
              >
                <Box
                  component="img"
                  src={img.thumbnail}
                  alt={`thumb-${i}`}
                  sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </Paper>
            ))}

            
            <Paper
              variant="outlined"
              onClick={() => setActiveImg(-1)}
              sx={{
                width: 72, height: 52,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 2,
                border: is3D
                  ? `2px solid ${theme.palette.primary.main}`
                  : `2px solid transparent`,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                gap: 0.3,
              }}
            >
              {data.threedstatus?.exists ? (
                <Typography variant="caption" fontWeight={800} color="primary" fontSize={10}>
                  3D
                </Typography>
              ) : (
                <>
                  <CircularProgress size={14} thickness={5} />
                  <Typography variant="caption" fontSize={9} color="text.secondary" fontWeight={700}>
                    3D
                  </Typography>
                </>
              )}
            </Paper>
          </Stack>

          <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
            {is3D
              ? `3D Model · Status: ${data.threedstatus?.status ?? 'queued'}`
              : `Photo by: ${data.images[activeImg].author} · Type: ${data.images[activeImg].type}`
            }
          </Typography>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ fontFamily: "'Georgia', serif", mb: 0.5, lineHeight: 1.2 }}
          >
            {data.genus} {data.species.charAt(0).toUpperCase() + data.species.slice(1)}
          </Typography>

          <Typography variant="body2" color="text.secondary" fontStyle="italic" mb={2}>
            {taxonomyChain}
          </Typography>

          <Typography variant="h6" color="text.secondary" fontWeight={700} mb={2} lineHeight={1.6}>
            Common Name:{' '}
            {data.commonNames.en.join(', ')}
          </Typography>

          
          <Box mb={2.5}>
            {Object.entries(data.commonNames).map(([lang, names]) => (
              <Box key={lang} display="flex" alignItems="flex-start" mb={0.5}>
                <Chip
                  label={LANG_LABEL[lang] || lang.toUpperCase()}
                  size="small"
                  color="primary"
                  sx={{ mr: 1, fontSize: 10, height: 20, fontWeight: 700, mt: 0.3 }}
                />
                <Typography variant="body2" color="text.primary">
                  {names.join(', ')}
                </Typography>
              </Box>
            ))}
          </Box>

         
          <Grid container spacing={1.5}>
            {Object.entries(data.size).map(([k, v]) => (
              <Grid item xs={6} key={k}>
                <StatCard label={k} value={v} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

     
      <Grid container spacing={4}>

        
        <Grid item xs={12} md={6}>

         
          <Box mb={4}>
            <SectionTitle>General Description</SectionTitle>
            <Typography variant="body2" lineHeight={1.8} textAlign="justify">
              {data.generalDesc}
            </Typography>
          </Box>

         
          <Box mb={4}>
            <SectionTitle>Diagnostic Description</SectionTitle>
            <Typography variant="body2" lineHeight={1.8} textAlign="justify">
              {data.diagnosticDesc}
            </Typography>
          </Box>

          
          <Box mb={4}>
            <SectionTitle>Morphology</SectionTitle>
            <Grid container spacing={1.5}>
              {Object.entries(data.morphology).map(([k, v]) => (
                <Grid item xs={6} key={k}>
                  <StatCard label={k} value={v} />
                </Grid>
              ))}
            </Grid>
          </Box>

          
          <Box mb={4}>
            <SectionTitle>Distribution</SectionTitle>
            <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
              {data.distribution.map((item, i) => (
                <Typography component="li" variant="body2" key={i} lineHeight={2}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

        </Grid>

       
        <Grid item xs={12} md={6}>

          
          <Box mb={4}>
            <SectionTitle>Habitat / Migration</SectionTitle>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 1.5 }}>
              {data.habitat.map((item, i) => (
                <Typography component="li" variant="body2" key={i} lineHeight={2}>
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography variant="body2" lineHeight={1.8}>
              {data.migration}
            </Typography>
          </Box>

         
          <Box mb={4}>
            <SectionTitle>Trophic Strategy</SectionTitle>
            <Typography variant="body2" lineHeight={1.8} textAlign="justify">
              {data.trophicStrategy}
            </Typography>
          </Box>

          
          <Box mb={4}>
            <SectionTitle>Uses</SectionTitle>
            <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
              {Object.entries(data.uses).map(([k, v]) => (
                <Typography component="li" variant="body2" key={k} lineHeight={2}>
                  <strong>{k}:</strong> {v}
                </Typography>
              ))}
            </Box>
          </Box>

         
          <Box mb={4}>
            <SectionTitle>Threats / IUCN Status</SectionTitle>
            <Paper
              variant="outlined"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                borderRadius: 2,
                borderColor: 'success.main',
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(46,125,50,0.15)'
                  : 'rgba(232,245,233,1)',
              }}
            >
              <Chip label="LC" color="success" size="small" sx={{ fontWeight: 800, fontSize: 12 }} />
              <Typography variant="body2" color="success.main" fontWeight={500}>
                {data.threats}
              </Typography>
            </Paper>
          </Box>

        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

    
      <Box mb={4}>
        <SectionTitle>Images</SectionTitle>
        <Grid container spacing={2}>
          {data.images.map((img, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Paper
                variant="outlined"
                onClick={() => { setActiveImg(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <Box
                  sx={{
                    height: 120,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                  }}
                >
                  <Box
                    component="img"
                    src={img.actual}
                    alt={`img-${i}`}
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Chip
                    label={img.type}
                    size="small"
                    color={img.type === 'adult' ? 'primary' : 'warning'}
                    sx={{ mb: 0.5, fontWeight: 700, fontSize: 11 }}
                  />
                  <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.4}>
                    {img.author}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  )
}

export default FishInfo