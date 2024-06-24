import { useNavigate } from "react-router-dom";

const MoneySended = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/dashboard");
  }, 1000);
  return (
    <div>
      <div>Payment Done</div>
    </div>
  );
};

export default MoneySended;
