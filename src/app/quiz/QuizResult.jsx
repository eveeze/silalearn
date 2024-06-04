import React from "react";
import { formatTime } from "@/utils/formatTime";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
const QuizResults = ({ result }) => {
  const { score, duration, correctAnswers, incorrectAnswers } = result;

  return (
    <div className="p-4 bg-white shadow-md rounded mx-auto max-w-screen-xl">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <Player
          src="https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
          className="player"
          loop
          autoplay
          style={{ height: "400px", width: "400px" }}
        />
        <p className="text-xl font-bold">Score: {score}</p>
        <p className="text-xl font-bold">Total Time: {formatTime(duration)}</p>
        <Link href={"/"} className="btn mt-2">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
