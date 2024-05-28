// admin/dashboard/quiz/create-quiz/page.jsx

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
      <h1 className="text-5xl mt-4 font-bold">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-300 p-4 rounded space-y-2"
          >
            <input
              type="text"
              placeholder="Question Content"
              value={question.content}
              onChange={(e) =>
                handleQuestionChange(qIndex, "content", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Question Type"
              value={question.type}
              onChange={(e) =>
                handleQuestionChange(qIndex, "type", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Option Content"
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
              Add Option
            </AdminButton>
          </div>
        ))}
        <AdminButton onClick={handleAddQuestion}>Add Question</AdminButton>
        <AdminButton type="submit">Submit Quiz</AdminButton>
      </form>
    </div>
  );
}
