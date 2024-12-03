import useAuthContext from "../auth/authProvider"

const HomePage = () => {
    const {logOut} = useAuthContext();

  return (
    <>
    <div>HomePage</div>
    <button type="button" class="btn btn-outline-primary"onClick={logOut}>LogOut</button>
    </>
  )
}

export default HomePage