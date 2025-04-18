// frontend/src/pages/PollDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../services/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "../Home/home.css";
import "./pollDetail.css";
import { toast } from "react-toastify";

const PollDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await API.get(`/polls/${id}`);
        setPoll(res.data.poll);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to load poll", err);
      }
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (option) => {
    try {
      console.log("selected", option);

      const res = await API.post(`/polls/${id}/vote`, {
        optionIndex: option,
      });
      setPoll(res.data);
      toast.success("Voted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Vote failed");
    }
  };

  const handleComment = async () => {
    try {
      const res = await API.post(`/polls/${id}/comments`, { text });
      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (!poll) return <div className="p-4">Loading...</div>;

  return (
    <>
      <div key={poll._id} className="homePollCard">
        <div className="homePollCardContent">
          <p className="pollQuestion">{poll.question}</p>
          <div className="pollOptions">
            {poll.options.map((option, index) => (
              <div
                key={option._id}
                onClick={() => handleVote(index)}
                className="pollOption"
              >
                <p>{option.text}</p>
                <p>{option.votes} votes</p>
              </div>
            ))}
          </div>
        </div>

        <div className="homePollCardFooter">
          <p className="pollUser">by {poll.creator?.username}</p>
        </div>
        <div className="commentsSection">
          <>
            <Input
              placeholder="Add a comment"
              state={text}
              setState={setText}
            />
            <Button
              onClick={handleComment}
              // disabled={!user || !text.trim()}
              text={"Comment"}
            />
          </>
          <marquee behavior="scroll" direction="left" scrollamount="5">
            <div className="commentContainer">
              {comments.map((c) => (
                <div key={c._id} className="viewComment">
                  <p className="commentContent"> {c.text}</p>
                  <p className="pollUser">{c.user?.username}</p>
                </div>
              ))}
            </div>
          </marquee>
        </div>
      </div>
    </>
  );
};

export default PollDetail;
