import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

import useCurrentProfile from '../../context/useCurrentProfile'

const CurrentProfile: FC = () => {
  const { profile } = useCurrentProfile()

  if (!profile) return null

  return (
    <Box sx={{ m: 1.5, mb: 0, px: 1, py: 0.75, gap: 1.5 }} display="flex" alignItems="center">
      <AvatarWithPlaceholder
        width={40}
        height={40}
        src={profile.image?.url ?? ''}
        alt="Current profile avatar"
        color="secondary"
      />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Typography component="p" variant="subtitle2" noWrap>
          {profile.name}
        </Typography>

        {profile.urlPath?.path && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile.urlPath?.path}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default CurrentProfile
