import {
  getUploadingStatus,
  getUserData,
  uploadProfile,
} from "@/redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import user from "@/assets/user.png";
import { useState } from "react";
import Button from "@/components/Button";
import { getProfilePath } from "@/constant";
import Loading from "@/components/Loading";

const Profile = () => {
  const {
    user: { first_name, email, last_name, phone_number },
    profile_pic,
  } = useSelector(getUserData);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadingStatus = useSelector(getUploadingStatus);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadProfileHandler = () => {
    const userProfile = new FormData();
    userProfile.append("profile_pic", selectedImage);
    dispatch(uploadProfile(userProfile));
    setPreview(null);
  };

  return (
    <div className="col-span-5 bg-white p-12 relative">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
        <div className="flex items-center gap-2">
          {!preview && !profile_pic && (
            <img
              src={user}
              alt="oxford-blog-image"
              className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
            />
          )}
          {preview && (
            <img
              src={preview}
              alt="profile-pic"
              className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
            />
          )}
          {profile_pic && (
            <img
              src={getProfilePath(profile_pic)}
              alt="profile-pic"
              className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
            />
          )}
          <div>
            <h4>{first_name + " " + last_name}</h4>
            <span className="text-sm text-red-color">{email}</span>
          </div>
        </div>
        <div className="text-red-color">
          <label htmlFor="profile_pic" className="cursor-pointer underline">
            Upload Your Profile Picture
          </label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="hidden"
            onChange={handleImageChange}
            disabled={profile_pic}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <h5>Name</h5>
        </div>
        <div className="justify-self-end">
          <span>{first_name + " " + last_name}</span>
        </div>
        <div>
          <h5>Email Account</h5>
        </div>
        <div className="justify-self-end">
          <span>{email}</span>
        </div>
        <div>
          <h5>Mobile Number</h5>
        </div>
        <div className="justify-self-end">
          <span>+977-{phone_number}</span>
        </div>
      </div>
      <div className="absolute bottom-0 pb-12">
        <div className="flex items-center gap-6">
          <Button
            title={uploadingStatus === "loading" ? "Saving..." : "Save"}
            disabled={!selectedImage}
            onClick={uploadProfileHandler}
          />
          {uploadingStatus === "loading" && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
