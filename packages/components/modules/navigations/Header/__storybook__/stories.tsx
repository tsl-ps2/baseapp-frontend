import { SendMessageIcon } from '@baseapp-frontend/design-system'

import { Meta, StoryObj } from '@storybook/react'

import Header from '..'
import defaultTheme from '../../../../.storybook/__mocks__/theme'
import { withTokenSetup } from '../../../../.storybook/decorators'
import { HeaderProps } from '../types'
import ProjectLogoCondensed from './ProjectLogoCondensed'

const meta: Meta<typeof Header> = {
  title: '@baseapp-frontend | components/Navigation/Header',
  component: Header,
  argTypes: {
    settings: { control: 'object' },
    onOpenNav: { action: 'onOpenNav' },
    LogoIcon: { control: 'object' },
    AccountMenu: { control: 'object' },
    AccountMenuProps: { control: 'object' },
    ToolbarProps: { control: 'object' },
    additionalComponent: { control: 'object' },
    children: { control: 'object' },
  },
  tags: ['autodocs'],
  decorators: [withTokenSetup],
}

export default meta

type Story = StoryObj<HeaderProps>

export const InvalidUserHeader: Story = {
  parameters: {
    userType: 'invalid',
  },
  args: {
    settings: {
      ...defaultTheme.settings,
      themeLayout: 'centered',
    },
    onOpenNav: () => {},
    LogoIcon: ProjectLogoCondensed,
    AccountMenuProps: {
      onRegisterClick: () => console.log('Register clicked'),
      onLoginClick: () => console.log('Login clicked'),
    },
  },
}

export const ValidUserHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...InvalidUserHeader.args,
    AccountMenuProps: {
      menuItems: [
        {
          label: 'Settings',
          onClick: () => console.log('Settings clicked'),
        },
      ],
    },
  },
}

export const ValidUserHeaderWithAdditionalComponent: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUserHeader.args,
    additionalComponent: <SendMessageIcon />,
  },
}

export const CustomAccountMenuHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUserHeader.args,
    AccountMenu: () => <div>Custom AccountMenu</div>,
  },
}
