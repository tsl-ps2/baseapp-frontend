import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const PenEditIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15.6001 4.05002L13.9501 2.40002C13.7251 2.17502 13.3501 2.02502 13.0501 2.02502C12.6751 2.02502 12.3751 2.17502 12.1501 2.40002L2.1001 12.375C1.8751 12.6 1.7251 12.975 1.7251 13.275V15.75C1.7251 16.05 1.9501 16.35 2.3251 16.35H4.8001C5.1751 16.35 5.4751 16.2 5.7001 15.975L15.6001 5.92502C15.8251 5.70002 15.9751 5.32502 15.9751 5.02502C15.9751 4.72502 15.9001 4.35002 15.6001 4.05002ZM4.8001 15.15C4.8001 15.15 4.7251 15.225 4.6501 15.225H2.8501V13.35C2.8501 13.275 2.8501 13.275 2.9251 13.2L10.4251 5.62502L12.3751 7.57502L4.8001 15.15ZM14.8501 5.10002L13.2001 6.75002L11.2501 4.80002L12.9001 3.15002C12.9751 3.07502 12.9751 3.07502 13.0501 3.07502C13.0501 3.07502 13.1251 3.07502 13.2001 3.15002L14.9251 4.87502C15.0001 4.95002 15.0001 4.95002 15.0001 5.02502C14.8501 5.02502 14.8501 5.10002 14.8501 5.10002Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default PenEditIcon
