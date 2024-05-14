"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion((prevQuestion) =>
      prevQuestion === index ? null : index
    );
  };

  const dummyData = [
    {
      question: "What brings you to Verdex?",
      answer: "Ini Jawaban Blablabla",
    },
    {
      question: "What brings you to Verdex?",
      answer: "Ini Jawaban Blablabla",
    },
    {
      question: "What brings you to Verdex?",
      answer: "Ini Jawaban Blablabla",
    },
  ];

  return (
    <>
      <div className="min-h-dvh w-full mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-2 mt-16 p-8 gap-8 bg-gradient-to-b from-merah-300 to-merah-200">
          <div className="mt-8 space-y-6 text-center">
            <h1 className="text-5xl font-bold text-black mt-32">
              Perluas Wawasan Dengan SILALEARN
            </h1>
            <p className="text-black text-2xl mt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              facere distinctio illum provident dolorum natus error commodi,
              dolorem atque rem ipsum! Minus incidunt dicta nisi deleniti? Nam
              reiciendis voluptas ipsa.
            </p>
            <div className="flex items-center justify-center mt-16 gap-8">
              <button className="btn hover:bg-merah-500 focus:ring focus:outline-none focus:ring-red-500">
                Mulai Belajar
              </button>
              <button className="btn hover:bg-merah-500 focus:ring focus:outline-none focus:ring-red-500">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={"/image/hero.png"}
              width={548}
              height={394}
              alt="hero image"
              className="mt-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8 bg-gradient-to-t from-merah-300 to-merah-200">
          <div className="flex items-center justify-center">
            <Image
              src={"/image/about.png"}
              width={500}
              height={500}
              alt="About Image"
            />
          </div>
          <div className="mt-14">
            <h1 className="text-6xl font-bold text-left">About Us</h1>
            <p className="text-2xl font-normal mt-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="min-h-dvh bg-gradient-to-b from-merah-300 to-merah-200">
          <div className="w-full max-w-screen-xl mx-auto px-8">
            <div className="text-black">
              <div className="border-2 border-transparent border-opacity-25 rounded-3xl mb-4 flex flex-col md:flex-row items-center">
                <h1 className="text-6xl font-bold mb-8 text-center justify-center flex items-center gap-4 mt-16">
                  FAQ
                </h1>
              </div>

              <div className="mb-8">
                {dummyData.map((data, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="border-2 border-white border-opacity-25 rounded-3xl p-6 mt-4 mb-4 w-full"
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="relative text-left">
                        <div>
                          <h1 className="font-medium text-xl">
                            {data.question}
                          </h1>
                          {activeQuestion === index && (
                            <p className="text-paragraph">{data.answer}</p>
                          )}
                        </div>
                        <FiArrowUpRight className="flex float-end " />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
