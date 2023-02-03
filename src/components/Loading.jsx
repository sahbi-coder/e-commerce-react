import React from "react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function Loading({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width:'100vw',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:'#f7eee3',
        
        }}
      >
        <ReactLoading
          type={"bubbles"}
          color={"blank"}
          height={"20%"}
          width={"20%"}
      
        />
      </div>
    );
  }
  return <>{children}</>;
}

export default Loading;
