import useFetch from "../hooks/useFetch";

const Channels = () => {
    const { data } = useFetch("/channels");
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {data.map((channel) => (
      <li key={channel.id} className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary"> 
        <span className="me-1">#</span>
        {channel.name}
        </button>
      </li>
    ))}
  </ul>
  )
}

export default Channels;