// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, socket } from "../../services/axios";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await API.get("/polls");
        setPolls(res.data);
      } catch (err) {
        console.error("Failed to fetch polls", err);
      }
    };

    fetchPolls();

    // ✅ Listen for real-time vote updates
    socket.on("newVote", (updatedPoll) => {
      setPolls((prev) =>
        prev.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
      toast.info(`Someone voted on "${updatedPoll.question}"`, {
        icon: "🗳️",
      });
    });

    // 🧼 Clean up listener
    return () => {
      socket.off("newVote");
    };
  }, []);

  const [poll, setPoll] = useState(null);
  const handleVote = async (option, id) => {
    try {
      const res = await API.post(`/polls/${id}/vote`, { optionIndex: option });
      const updatedPoll = res.data;
      // ✅ Emit real-time vote event to server
      socket.emit("vote", updatedPoll);
      toast.success("Voting Successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Vote failed");
    }
  };

  return (
    <div className="homeContainer">
      <h1 className="titles">Recent Polls</h1>
      {polls.map((poll) => (
        <div key={poll._id} className="homePollCard">
          <div className="homePollCardContent">
            <p className="pollQuestion">{poll.question}</p>
            <div className="pollOptions">
              {poll.options.map((option, index) => (
                <div
                  key={option._id}
                  onClick={() => handleVote(index, poll._id)}
                  className="pollOption"
                >
                  <p>{option.text}</p>
                  <p>{option.votes} votes</p>
                </div>
              ))}
            </div>
            {console.log(polls)}
          </div>

          <div className="homePollCardFooter">
            <Link to={`/poll/${poll._id}`} className="pollLink">
              View & Comment
            </Link>
            <p className="pollUser">by {poll.creator?.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
