import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OPENAI_API_URL = process.env.REACT_APP_OPENAI_API_URL;

function InterviewService() {
  useEffect(() => {
    const savedQuestionsFromStorage =
      JSON.parse(localStorage.getItem("savedQuestions")) || [];
    setSavedQuestions(savedQuestionsFromStorage);
  }, []);

  const saveQuestion = () => {
    setSavedQuestions([...savedQuestions, interviewQuestions]);
    localStorage.setItem(
      "savedQuestions",
      JSON.stringify([...savedQuestions, interviewQuestions])
    );
  };

  const [savedQuestions, setSavedQuestions] = useState([]);

  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const [formData, setFormData] = useState({
    position: "",
    industry: "",
    difficulty: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `为一个${formData.industry}行业的${formData.level}级别的${formData.position}职位生成1个${formData.difficulty}难度的面试问题和3个相应的回答。固定格式为：“面试问题：……回答1：……回答2：……回答3：……”`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const parseText = (text) => {
      let lines = text.split("\n");
      let questions = [];
      let question = null;

      console.log("Lines:", lines);

      lines.forEach((line) => {
        console.log("Processing line:", line);

        if (/^面试问题：/.test(line)) {
          if (question !== null) {
            questions.push(question);
          }
          question = { question: line, answer: [] };
        } else if (/^回答\d：/.test(line) && question !== null) {
          question.answer.push(line + "\n");
        }
      });

      if (question !== null) {
        questions.push(question);
      }

      console.log("Questions array:", questions);
      setInterviewQuestions(questions);
    };

    try {
      const response = await axios.post(OPENAI_API_URL, requestBody);
      console.log("API Response Object:", response);
      console.log("API Response:", response.data);
      const responseText = response.data.choices[0].message.content;
      console.log("API Response Text:", responseText);
      parseText(responseText);

      if (
        !response.data.choices ||
        !response.data.choices[0] ||
        !response.data.choices[0].message.content
      ) {
        console.error("Unexpected API response:", response.data);
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Error calling OpenAI API: ", error);
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">面试问题生成器</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium">
            职位:
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="industry" className="block text-sm font-medium">
            行业:
          </label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium">
            难度:
          </label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="level" className="block text-sm font-medium">
            级别:
          </label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "加载中..." : "生成面试问题"}
        </button>
      </form>
      {interviewQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">生成的面试问题:</h2>
          {interviewQuestions.map((item, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{item.question}</h3>
              <ol className="list-decimal list-inside">
                {item.answer.map((answer, idx) => (
                  <li key={idx} className="mb-2">
                    {answer}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <button
            onClick={saveQuestion}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            保存问题
          </button>
        </div>
      )}
      {savedQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">已保存的问题:</h2>
          {savedQuestions.map((item, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{item.question}</h3>
              <ol className="list-decimal list-inside">
                {item.answer.map((answer, idx) => (
                  <li key={idx} className="mb-2">
                    {answer}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <Link
            to="/saved-questions"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            查看所有已保存的问题
          </Link>
        </div>
      )}
    </div>
  );
}

export default InterviewService;
