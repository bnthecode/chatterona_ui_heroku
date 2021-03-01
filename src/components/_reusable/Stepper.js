import { useState } from "react";
import { connect } from "react-redux";

const Stepper = ({ componentList, onComplete, user }) => {
  const [step, setStep] = useState(0);
    // build an object through steps
  const [navState, setNavState] = useState({});
  const Component = componentList[step];

  return (
    <Component
      setStep={setStep}
      setNavState={setNavState}
      navState={navState}
      onComplete={onComplete}
      step={step}
      user={user}
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Stepper);
