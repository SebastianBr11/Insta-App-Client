import React from "react";
import "./PWAButton.css";

const PWAButton = ({ prompt, setPrompt }) => {
  const onClick = e => {
    // hide our user interface that shows our A2HS button
    // Show the prompt
    prompt.prompt();
    // Wait for the user to respond to the prompt
    prompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      setPrompt(null);
    });
  };

  return (
    <button onClick={onClick} className="pwa-button">
      Add to home screen.
    </button>
  );
};

export default PWAButton;
