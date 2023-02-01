import { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { incrementVisits } from "../redux/visitSlice";

function HomeModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const visits = useSelector((state) => state.visits.visits);

  const handleClose = () => setOpen(false);

  const style = {
    width: "25rem",
    bgcolor: "background.default",
    p: 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    backgroundColor: "#514f4d",
    color: "#fcdfbc ",
    outline: "none",
    border:'1px white solid'
  };

  useEffect(() => {
    if (visits === 0) {
    setTimeout(() => {
      setOpen(true);
      dispatch(incrementVisits());
    }, 1000);
    }
  }, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h3" textAlign={"center"}>
            Welcome to my fake website
          </Typography>
          <Typography
            variant="body1"
            paragraph
            marginTop={3}
            textAlign={"center"}
            color={"white"}
          >
            this is a fake clothes ecommerce website, with all the basic
            features, feel free to take a look.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default HomeModal;
