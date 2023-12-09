import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../store/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  return (
    <>
      {currentUser ? (
        <header className="bg-slate-50 shadow-md">
          <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
              <h1 className="font-semibold text-sm sm:text-4xl flex flex-wrap">
                <span className="text-blue-900">Real</span>
                <span className="text-blue-400">Estate</span>
              </h1>
            </Link>

            <form className="bg-white p-3 rounded-3xl flex items-center">
              <input
                type="search"
                placeholder="Search"
                className="bg-transparent focus:outline-none w-24 sm:w-64"
              />
              <FaSearch className="text-slate-400 hover:cursor-pointer" />
            </form>

            <ul className="flex gap-4">
              <Link to="/">
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  Home
                </li>
              </Link>

              <Link to="/about">
                <li className="hidden sm:inline text-slate-700 hover:underline">
                  About
                </li>
              </Link>

              <Link to="/profile">
                <img
                  className="rounded-full h-6 w-6"
                  src={currentUser.avatar}
                  alt="profile"
                />
              </Link>

              <Link to="/createlisting">
                <img
                  className="h-6 w-6"
                  src="list.svg"
                  alt="create listing"
                />
              </Link>
              
              <img
                className="h-6 w-6 hover:cursor-pointer"
                type="button"
                src="logout.svg"
                onClick={handleSignout}
              ></img>

              
            </ul>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
}
