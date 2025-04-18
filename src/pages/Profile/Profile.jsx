import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../services/axios";
import { useAuth } from "../../context/AuthContext";
import "./profile.css"; // Assuming you have a CSS file for styling
import Button from "../../components/Button";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const [createdPolls, setCreatedPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [file, setFile] = useState(null);
  const { user, token, setUser } = useAuth(); // Accessing setUser from AuthContext
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        console.log("profileres", res);
        setCreatedPolls(res.data.createdPolls);
        setVotedPolls(res.data.votedPolls);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, [id]); // Update the dependency to be based on id

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("profile", file);
    try {
      const res = await API.post("/users/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile picture updated");
      setUser((prevUser) => ({ ...prevUser, profilePicture: res.data.path }));
    } catch (err) {
      toast.error("Upload Failed ! Please Try again!");
      console.error("Upload failed", err);
    }
  };

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="profileContainer">
      <div className="userDetails">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="userImage"
        />
        <div className="userInfo">
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button onClick={handleUpload} text={"Upload"} />
      </div>

      <div className="profilePolls">
        <h3 className="titles">Polls Created</h3>
        {createdPolls.map((poll) => (
          <div key={poll._id} className="profilePollDetails">
            {poll.question}
          </div>
        ))}
      </div>

      <div className="profilePolls">
        <h3 className="titles">Polls Voted</h3>
        {votedPolls.map((poll) => (
          <div key={poll._id} className="profilePollDetails">
            {poll.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
