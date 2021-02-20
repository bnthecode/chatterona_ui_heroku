import { connect } from "react-redux";
import AppRouter from "./components/Router";


function App({ userId }) {

  return (
    <div style={{ backgroundColor: "#36393f", overflow: 'hidden',height: "100vh", width: "100%" }}>
      <AppRouter userId={userId} />
    </div>
  );
}


const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
});

export default connect(mapStateToProps, null)(App);
