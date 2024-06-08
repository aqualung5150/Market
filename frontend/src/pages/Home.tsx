import { jwt } from "../data/jwt";

const Home = () => {
  return (
    <div>
      <h1>This is Home.</h1>
      <h2>${jwt.getToken()}</h2>
    </div>
  );
};

export default Home;
