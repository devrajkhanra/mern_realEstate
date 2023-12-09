import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [toggleViewListing, setToggleViewListing] = useState({
    width: "max-w-xl",
    hidden: "hidden",
    border: "",
  });
  // const [hidden, setHidden] = useState("hidden");
  // const [border, setBorder] = useState(""); //border-r-2 pr-3
  const [userListings, setUserListings] = useState([]);
  const [userListingsError, setUserListingsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (sanpshot) => {
        const progress =
          (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
        setFilePerc(progress);
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleViewListings = async () => {
    setToggleViewListing((prev) => ({
      ...prev,
      width: prev.width === "max-w-xl" ? "max-w-4xl" : "max-w-xl",
      hidden: prev.hidden === "hidden" ? "" : "hidden",
      border: prev.border === "" ? "border-r-2 pr-3" : "",
    }));

    try {
      setUserListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setUserListings(null);
        setUserListingsError(true);
      }
      setUserListings(data);
    } catch (error) {
      setUserListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) return console.log(data.message);

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`p-3 ${toggleViewListing.width} mx-auto`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* PROFILE */}
        <div
          className={`flex flex-col gap-4 flex-1 ${toggleViewListing.border}`}
        >
          <h1 className="text-3xl text-slate-600 font-medium text-center my-7">
            Profile
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />

            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />

            <p>
              {fileUploadError ? (
                <span className="text-red-700">Error Image Upload</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading {filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">Image Upload Successfull</span>
              ) : (
                ""
              )}
            </p>

            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              id="username"
              className="outline outline-1 outline-gray-400 p-3"
            />
            <input
              type="email"
              placeholder="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              id="email"
              className="outline outline-1 outline-gray-400 p-3 "
            />
            <input
              type="password"
              placeholder="password"
              defaultValue={currentUser.password}
              onChange={handleChange}
              id="password"
              className="outline outline-1 outline-gray-400 p-3"
            />

            <button
              disabled={loading}
              className="p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 hover:bg-green-500 hover:shadow-xl"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>

          <div className="flex flex-col gap-4 my-3">
            <span
              onClick={handleDelete}
              className="text-red-700 cursor-pointer"
            >
              Delete Account?
            </span>
          </div>

          <p className="text-red-700">{error ? error : ""}</p>
          <p className="text-green-700">
            {updateSuccess ? "Successfully Updated!" : ""}
          </p>

          <button
            type="button"
            className="text-sm font-light text-slate-900"
            onClick={handleViewListings}
          >
            View Listings
          </button>
          <p className="text-red-500 mt-5">
            {userListingsError ? "Error showing listings" : ""}
          </p>
        </div>

        {/* HISTORY */}
        <div
          className={` ${toggleViewListing.hidden} flex flex-col gap-4 flex-1`}
        >
          <h1 className="text-3xl text-slate-600 font-medium text-center mt-7">
            History
          </h1>
          <hr />
          {userListings &&
            userListings.length > 0 &&
            userListings.map((listings) => (
              <div
                key={listings._id}
                className="flex items-center gap-4 border border-t-0 pr-1"
              >
                <Link to={`/listing/${listings._id}`}>
                  <img
                    src={listings.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16"
                  />
                </Link>
                <div className="flex flex-col">
                  <p className="text-slate-600 font-light truncate ">
                    {listings.name}
                  </p>
                  <span className="text-slate-500 text-xs">
                    {listings.createdAt}
                  </span>
                </div>
                <div className="flex flex-grow justify-end gap-3">
                  <button
                    type="button"
                    className="h-6 w-5 hover:shadow-lg"
                    onClick={() => handleDeleteListing(listings._id)}
                  >
                    <img className="hover:shadow-lg" src="delete.svg" alt="" />
                  </button>
                  
                  <Link to={`/updatelisting/${listings._id}`}>
                  <button
                    type="button"
                    className="h-6 w-6 hover:shadow-lg"
                  >
                    <img className="hover:shadow-lg" src="edit.svg" alt="" />
                  </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
