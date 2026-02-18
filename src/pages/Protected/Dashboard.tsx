import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main>
      <h1>Dashboard Page</h1>;
      <ul>
        <li>
          <Link to="/dashboard/clients">Clients</Link>
        </li>
        <li>
          <Link to="/dashboard/products">Products</Link>
        </li>
      </ul>
    </main>
  );
};

export default Dashboard;
