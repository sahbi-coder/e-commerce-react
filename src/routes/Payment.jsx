import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
function Payment() {
  return (
    <Loading>
      <Outlet />
    </Loading>
  );
}

export default Payment;
