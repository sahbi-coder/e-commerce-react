import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import  Abt from "../components/About";
import Loading from '../components/Loading'

function About() {
  return (
    <Loading>
      <Navbar />
      <Abt/>
      <Footer />
    </Loading>
  );
}

export default About;
