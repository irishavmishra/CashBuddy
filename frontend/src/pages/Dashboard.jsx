import NavBar from "../components/NavBar.jsx";
import Balance from "../components/Balance.jsx";
import Users from "../components/Users.jsx";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Balance value={1000} />
      <Users />
    </div>
  );
};

export default Dashboard;
