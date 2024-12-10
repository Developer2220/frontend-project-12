// import useFetch from "../hooks/useFetch";
import useFetchChannels from "../hooks/useFetchChannels";

import { useDispatch } from "react-redux";
import { setCurrentChannel } from "../store/slices/dataSlices";

const Channels = () => {
//   const channels = useFetch("/channels");
  const channels = useFetchChannels("/channels");
  console.log('channels', channels)

  const dispatch = useDispatch();
  const handleСlick = (channelName) => dispatch(setCurrentChannel(channelName));

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.data.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            className="w-100 rounded-0 text-start btn btn-secondary"
            onClick={()=> handleСlick(channel.name)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
