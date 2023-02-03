import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cnt from "../components/Contact";
import Loading from "../components/Loading";

function About() {
  return (
 
      <Loading>
        <Navbar />
        <Cnt />
        <Footer />
      </Loading>
   
  );
}

export default About;
