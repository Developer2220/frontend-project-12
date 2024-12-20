// import useFetch from "../hooks/useFetch";
// import useFetchChannels from "../hooks/useFetchChannels";

import { useDispatch } from "react-redux";
import { setCurrentChannel } from "../store/slices/dataSlices";

import { useState, useEffect } from "react";
import { useGetChannelsQuery } from "../API/channels";

const Channels = () => {
  //   const channels = useFetch("/channels");
  //   const channels = useFetchChannels("/channels");
  //   console.log("channels", channels);

  const { data: channels, error, isLoading } = useGetChannelsQuery();
  // if (!isLoading && channels) {
  //     console.log('channels in Channels', channels);
  //   }

  const [activeChannel, setActiveChannel] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (channels && channels.length > 0) {
      const defaultChannel = channels[0];
      setActiveChannel(defaultChannel.id);
      dispatch(setCurrentChannel(defaultChannel.name));
    }
  }, [channels, dispatch]);

  const handleСlick = (channelName, channelId) => {
    dispatch(setCurrentChannel(channelName));
    setActiveChannel(channelId);
  };

  return (
    <div>
      {isLoading && <p>Loading channels...</p>}
      {error && <p>Error loading channels: {error.message}</p>}
      {channels && (
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              <button
                type="button"
                className={`w-100 rounded-0 text-start btn ${
                  activeChannel === channel.id ? "btn-secondary" : ""
                }`}
                onClick={() => handleСlick(channel.name, channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Channels;
