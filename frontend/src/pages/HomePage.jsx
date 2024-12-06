import useAuthContext from "../auth/authProvider";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const { logOut } = useAuthContext();
  const { data, loading, error } = useFetch("/channels");
  console.log("data in channels", data);

  // const { data, loading, error } = useFetch('/messages');
  // console.log('data in messages', data)

  return (
    <>
      <div>HomePage</div>
      <button type="button" class="btn btn-outline-primary" onClick={logOut}>
        LogOut
      </button>

      <ul className="list-group">
        {data.map((channel) => (
          <li key={channel.id} className="list-group-item">
            Id:{channel.id} 
           Name:{channel.name}
           removable: {channel.removable}
          </li>
        ))}
      </ul>

    </>
  );
};

export default HomePage;
