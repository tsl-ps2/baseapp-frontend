import { useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import Dialog from '..'
import { DialogProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Dialogs/BaseDialog',
  component: Dialog,
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    customMaxWidth: {
      control: 'text',
      table: { type: { summary: 'string | number' } },
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the dialog.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  tags: ['autodocs'],
} as Meta<DialogProps>

type Story = StoryObj<DialogProps>

const DialogTemplate = (args: any) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} style={{ width: '250px' }}>
        Open Dialog
      </Button>
      <Dialog {...args} open={open} onClose={handleClose}>
        <Box padding={3}>
          <Typography variant="h6" gutterBottom>
            Dialog Title
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is a sample dialog content. It can hold any content you would like to display in a
            dialog.
          </Typography>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: (args) => <DialogTemplate {...args} />,
  args: {
    open: false,
  },
}