import React, { useState, useEffect } from "react";
import "./Home.css";
import "../../App.css";
import kirbyFloating from "../../assets/kirby_floating-modified.png";

const Home = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const words = [
    "My name is Gabriel Ong",
    "I am a software engineer",
    "I enjoy running, swimming and cycling",
    "I hope you have a great day!",
  ];

  const [activeParagraph, setActiveParagraph] = useState(0);
  const [typedChars, setTypedChars] = useState(-1);

  useEffect(() => {
    let charIndex = 1;
    const typingInterval = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);

      if (charIndex >= words[activeParagraph].length) {
        clearInterval(typingInterval);
        // Move to the next paragraph after a delay
        setTimeout(() => {
          setActiveParagraph((prev) => (prev + 1) % words.length);
          setTypedChars(0); // Reset typedChars when moving to the next paragraph
        }, 1000);
      }
    }, 60); // Interval for typing speed

    return () => clearInterval(typingInterval);
  }, [activeParagraph]);

  return (
    <>
      <div className="container centering">
        <img src={kirbyFloating}  className="floating-image" style={{ height: 200, border: "2px solid black",  borderRadius: "50%"}} />
        <h1 className="heading">Happy {daysOfWeek[new Date().getDay()]}</h1>
        <p className="paragraph">
          {words[activeParagraph].slice(0, typedChars)}
        </p>
      </div>
    </>
  );
};

export default Home;
