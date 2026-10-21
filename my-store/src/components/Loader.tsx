import { useEffect, useState } from "react";

const funMessages = [
  "Bribing the server with cookies...",
  "Convincing the hamsters to run faster...",
  "Dusting off the shelves...",
  "Negotiating with the warehouse...",
  "Asking the data nicely to show up...",
  "Teaching pixels how to arrange themselves...",
  "Counting products on tiny fingers...",
  "Waking up the lazy backend developer...",
  "Chasing down a runaway semicolon...",
  "Reticulating splines... (nobody knows what that means)",
  "Checking if the internet is still a thing...",
  "Downloading more RAM...",
  "Yelling at the cloud...",
  "Herding digital cats...",
  "Pretending to be busy for dramatic effect...",
  "Converting coffee into code...",
  "Loading... please wait... or don't, I'm not your boss...",
  "Summoning the product spirits...",
  "Petting the algorithm until it cooperates...",
  "If this takes too long, blame my professor...",
];

interface LoaderProps {
  message?: string;
  playful?: boolean;
};

const randomFunMessage = () =>
  funMessages[Math.floor(Math.random() * funMessages.length)];

function Loader({ message = "Loading...", playful = false }: LoaderProps) {
  const [current, setCurrent] = useState(() =>
    playful ? randomFunMessage() : message
  );

  useEffect(() => {
    if (!playful) return;
    const interval = setInterval(() => {
      setCurrent(randomFunMessage());
    }, 1000);
    return () => clearInterval(interval);
  }, [playful]);

  return (
    <main className="status-page">
      <div className="status-content">
        <div className="loader" />
        <p>{playful ? current : message}</p>
      </div>
    </main>
  );
}

export default Loader;
