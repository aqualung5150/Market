import { useParams } from "react-router-dom";

const Bar = () => {
  const id = useParams().id;
  return <h1>id: {id}</h1>;
};

export default Bar;
