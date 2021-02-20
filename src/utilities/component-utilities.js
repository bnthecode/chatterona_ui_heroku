// CHAT

export const determineChatComponentUpdate = (
  lastMessageUpdated,
  prevProps,
  channelId,
  messages
) => {
  return (
    lastMessageUpdated ||
    prevProps.channelId !== channelId ||
    messages.length !== prevProps.messages.length
  );
};

export const determineCanScroll = (ref) => {
  return ref && ref.current ? ref.current : null;
};
