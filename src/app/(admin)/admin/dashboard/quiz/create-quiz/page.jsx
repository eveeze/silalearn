"use client";
import { useState } from "react";
import AdminButton from "@/components/adminButton";
import { useRouter } from "next/navigation";

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  const handleAddQuestion = () => {
    setQuestions([...questions, { content: "", type: "", options: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = questions.slice();
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = questions.slice();
    if (newQuestions[index].options.length < 5) {
      newQuestions[index].options.push({ content: "", isCorrect: false });
      setQuestions(newQuestions);
    } else {
      alert("Each question can have a maximum of 5 options");
    }
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = questions.slice();
    if (field === "isCorrect" && value === true) {
      newQuestions[qIndex].options.forEach((option, index) => {
        newQuestions[qIndex].options[index].isCorrect = false;
      });
    }
    newQuestions[qIndex].options[oIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, questions }),
      });

      if (response.ok) {
        router.push("/admin/dashboard/quiz");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="min-h-dvh w-full mx-auto p-8 space-y-8 max-w-screen-xl">
      <h1 className="text-5xl mt-4 font-bold">Buat Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-2xl font-semibold" htmlFor="Quiz Title">
            Nama Quiz
          </label>
          <input
            type="text"
            placeholder="Masukan Nama Quiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="text-2xl font-semibold" htmlFor="Description">
            Deskripsi
          </label>
          <textarea
            placeholder="Masukan Deskripsi Quiz"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="border-2 border-merah-300 p-4 rounded space-y-2"
          >
            <div>
              <label
                className="text-xl font-semibold"
                htmlFor="Question Content"
              >
                Pertanyaan
              </label>
              <input
                type="text"
                placeholder="Masukan Pertanyaan"
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "content", e.target.value)
                }
                className="w-full p-2 border border-merah-300 rounded"
                required
              />
            </div>
            <div>
              <label
                className="text-xl font-semibold"
                htmlFor="Tipe Pertanyaan"
              >
                Tipe Pertanyaan
              </label>
              <input
                type="text"
                placeholder="Tipe Pertanyaan (HOTS/REGULAR)"
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "type", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Masukan Opsi Jawaban "
                  value={option.content}
                  onChange={(e) =>
                    handleOptionChange(
                      qIndex,
                      oIndex,
                      "content",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleOptionChange(
                      qIndex,
                      oIndex,
                      "isCorrect",
                      e.target.checked
                    )
                  }
                />
              </div>
            ))}
            <AdminButton onClick={() => handleAddOption(qIndex)}>
              Tambahkan Opsi
            </AdminButton>
          </div>
        ))}
        <AdminButton onClick={handleAddQuestion}>Tambah Pertanyaan</AdminButton>
        <AdminButton type="submit">Simpan Quiz yang dibuat</AdminButton>
      </form>
    </div>
  );
}
