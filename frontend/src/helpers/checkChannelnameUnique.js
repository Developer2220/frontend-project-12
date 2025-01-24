const checkChannelnameUnique = (channels, name) => {
  if (!channels) return true;
  const channelName = channels.map((channel) => channel.name);
  return !channelName.includes(name);
};

export default checkChannelnameUnique;
