import { FC, useCallback, useMemo } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'
import { datesDontHaveSameDay } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { useCurrentProfile } from '../../profiles'
import DefaultMessageItem from '../MessageItem'
import {
  MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME,
  MINIMUM_AMOUNT_OF_PARTICIPANTS_TO_SHOW_ROOM_TITLE,
} from '../constants'
import Timestamp from './Timestamp'
import { DateGroupTypography } from './styled'
import { MessagesGroupProps } from './types'
import { displayFormattedDate } from './utils'

const MessagesGroup: FC<MessagesGroupProps> = ({
  allMessages,
  allMessagesLastIndex,
  hasNext,
  message,
  messageIndex,
  roomParticipantsCount,
  MessageItem = DefaultMessageItem,
  MessageItemProps = {},
}) => {
  const { profile: currentProfile } = useCurrentProfile()

  const renderDateOnTopOfMessagesGroup = useCallback(
    (index: number) => {
      const previousMessage = allMessages?.[index + 1]
      const currentMessage = allMessages?.[index]
      const isLastMessageAvailable = index === allMessagesLastIndex && !hasNext

      if (
        isLastMessageAvailable ||
        datesDontHaveSameDay(previousMessage?.created, currentMessage?.created)
      ) {
        return (
          <DateGroupTypography color="grey.600" variant="caption">
            {displayFormattedDate(currentMessage?.created)}
          </DateGroupTypography>
        )
      }

      return null
    },
    [allMessages, allMessagesLastIndex, hasNext],
  )

  const renderLastMessageTime = useCallback(
    (index: number) => {
      const currentMessage = allMessages?.[index]
      const nextMessage = allMessages?.[index - 1]

      const isNextMessageFromOtherParticipant =
        nextMessage?.profile?.id !== currentMessage?.profile?.id

      const { minutes: dateDiff } = DateTime.fromISO(nextMessage?.created).diff(
        DateTime.fromISO(currentMessage?.created),
        'minutes',
      )
      const isDateDiffAboveMaximumInterval = dateDiff > MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME

      if (isNextMessageFromOtherParticipant || !nextMessage || isDateDiffAboveMaximumInterval) {
        return <Timestamp date={currentMessage?.created} />
      }

      return null
    },
    [allMessages],
  )

  const isFirstGroupedMessage = useMemo(() => {
    const currentMessage = allMessages?.[messageIndex]
    const previousMessage = allMessages?.[messageIndex + 1]

    const isPreviousMessageFromOtherParticipant =
      previousMessage?.profile?.id !== currentMessage?.profile?.id
    const roomHasOnlyOneMessage = allMessagesLastIndex === 0

    if (isPreviousMessageFromOtherParticipant || roomHasOnlyOneMessage) return true

    return false
  }, [allMessages, allMessagesLastIndex, messageIndex])

  const isOwnMessage = currentProfile?.id === message?.profile?.id

  const flexAlignments = isOwnMessage ? 'flex-end' : 'flex-start'
  const canShowAvatar = isFirstGroupedMessage && !isOwnMessage

  const canShowName =
    canShowAvatar &&
    roomParticipantsCount &&
    roomParticipantsCount >= MINIMUM_AMOUNT_OF_PARTICIPANTS_TO_SHOW_ROOM_TITLE

  if (!message) return null

  return (
    <Box display="flex" flexDirection="column" sx={{ paddingTop: 1 / 2, paddingRight: 2 }}>
      {renderDateOnTopOfMessagesGroup(messageIndex)}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignSelf: flexAlignments }}>
        {canShowAvatar && (
          <Box paddingRight="12px">
            <AvatarWithPlaceholder
              className="self-start justify-self-center"
              width={32}
              height={32}
              src={message?.profile?.image?.url}
              sx={{ border: 'none' }}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            ml: isFirstGroupedMessage ? 0 : 5.5,
            alignSelf: flexAlignments,
            alignItems: flexAlignments,
            flexDirection: 'column',
          }}
        >
          {canShowName && (
            <Typography variant="subtitle2" color="text.primary" marginBottom={1 / 2}>
              {message?.profile?.name}
            </Typography>
          )}
          <MessageItem
            messageRef={message}
            isFirstGroupedMessage={isFirstGroupedMessage}
            {...MessageItemProps}
          />
          {renderLastMessageTime(messageIndex)}
        </Box>
      </Box>
    </Box>
  )
}

export default MessagesGroup
