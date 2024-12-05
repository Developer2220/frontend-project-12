import useAuthContext from "../auth/authProvider"
import useFetch from "../hooks/useFetch";

const HomePage = () => {
    const {logOut} = useAuthContext();
    // const { data, loading, error } = useFetch('/channels');
    // console.log('data in channels', data);

    const { data, loading, error } = useFetch('/messages');
    console.log('data in messages', data)
 



  return (
    <>
    <div>HomePage</div>
    <button type="button" class="btn btn-outline-primary"onClick={logOut}>LogOut</button>
    </>
  )
}

export default HomePage