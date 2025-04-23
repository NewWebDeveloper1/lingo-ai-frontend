import { useState } from "react";
import "./genai.css";

const GenAi = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lingo-ai-3.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `"You're a helpful assistant. Keep responses short and under 100 words. Here's the user's message: ${input}`,
        }),
      });

      const data = await res.json();
      const response = data.reply
        .replace(/\\n/g, "")
        .replace(/['"]/g, "")
        .split("Translation");
      // console.log(response);
      setResponse(response);
    } catch (error) {
      console.log("Error : ", error);
      setResponse("Could not fetch response.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start pt-[2%] items-center container">
      <h1 className="gradient-text text-[7rem] text-center text-color-transparent bg-linear-to-r from-cyan-500 to-blue-500 mb-5">
        LingoPal
      </h1>

      <div className="rounded-md m-4 p-5 sub-container w-[30rem]">
        <div className="flex flex-col gap-4 items-center justify-center mb-5 ">
          <label
            htmlFor="input-box"
            className="text-bold-600 text-[2rem] text-white"
          >
            Type your Text
          </label>
          <input
            className="border bg-white px-4 py-2 w-[50%] outline-none"
            id="input-box"
            type="type"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="border rounded-md w-[25%] px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-300 cursor-pointer"
          >
            Submit
          </button>
        </div>

        {loading && (
          <div className="text-center text-white text-xl mt-5">Loading...</div>
        )}

        {response.length > 0 && (
          <div className="flex justify-center items-center flex-col w-[50%] bg-gray-100 my-5 mx-auto  rounded-md border-white p-4 response">
            <strong>Reponse : </strong>
            <span className="block">{response[0]}</span>
            <span className="block mt-4">
              {response[1] && "Translate " + response[1]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenAi;
