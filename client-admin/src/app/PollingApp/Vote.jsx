import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScalerCampusBanner from "../../components/ScalerCampusBanner";

export default function Vote() {
  let { pollId } = useParams();
  const [pollData, setPollData] = useState({
    question: "If you are seeing this question, possibilities are that :-",
    options: [
      "Something in our backend is broken",
      "Your internet connection is weak",
      "You do not have access",
      "Some other crazy shit has happened.",
    ],
    acceptingResponses: true,
  });
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/poll/${pollId}`
        );
        const question = res.data.question;
        const options = Object.keys(res.data.options);
        const acceptingResponses = res.data.acceptingResponses;
        setPollData({ question, options, acceptingResponses });
      } catch (error) {
        console.error("Error fetching poll data:", error);
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleVoteSubmit = async () => {
    if (!selectedOption) {
      alert("Please select a option");
      return;
    }

    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/api/v1/poll/vote/${pollId}`, {
          option: selectedOption,
          user: localStorage.getItem("email"),
        })
        .then((res) => {
          return res.data;
        });
      const data = await res.data;
    } catch (error) {
      const errorData = await error.response;
      alert(errorData.data.message);
      return;
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
  };

  return (
    <div>
      <ScalerCampusBanner />
      {pollData && (
        <div>
          <div className="Question w-screen p-4 text-2xl">
            {pollData.question}
          </div>
          <div className="w-screen flex flex-col gap-4 p-4">
            {pollData.options.map((option) => (
              <button
                key={`option_${option}`}
                className={`w-full md:w-[50%] p-4 rounded-md shadow-md ${
                  selectedOption === option
                    ? "bg-[#375cd4] text-white font-semibold"
                    : "bg-[#efefef] text-[#1a1a1a]"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
            <button
              onClick={handleVoteSubmit}
              className="md:w-[50%] bg-[#1a1a1a] text-white h-[8vh] rounded-md font-semibold"
            >
              Submit Vote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
