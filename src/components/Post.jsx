import { useEffect, useReducer } from "react";

const initialState = { loading: true, data: null, error: false };

function fetchReducer(state, action) {
  switch (action.type) {
    case "PENDING":
      return { loading: true, data: null, error: false };
    case "SUCCESS":
      return { loading: false, data: action.payload, error: false };
    case "REJECT":
      return { loading: false, data: null, error: true };
    default:
      return state;
  }
}

function Post() {
  //1:
  //   const [loading, setLoading] = useState(true);
  //   const [data, setData] = useState(null);
  //   const [error, setError] = useState(false);

  // * 2:
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { loading, data, error } = state;

  useEffect(() => {
    // 1:
    // setLoading(true);
    // setData(null);
    // setError(false);
    // *2:
    dispatch({ type: "PENDING" });
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((res) => {
        // 1:
        // setLoading(false);
        // setData(res);
        // setError(false);
        // *2:
        dispatch({ type: "SUCCESS", payload: res });
      })
      .catch((err) => {
        // 1:
        // setLoading(false);
        // setData(null);
        // setError(true);
        // *2:
        dispatch({ type: "REJECT", payload: "something went wrong!" });
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      {error && <p>Ann error occured</p>}
    </div>
  );
}

export default Post;
