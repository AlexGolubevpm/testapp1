import React, { useState, useEffect } from "react";
import Select from "react-select";
import Slider from "rc-slider";
import axios from "axios";
import "rc-slider/assets/index.css";

const App = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [maxTokens, setMaxTokens] = useState(512);
  const [temperature, setTemperature] = useState(1.0);
  const [topP, setTopP] = useState(1.0);
  const [topK, setTopK] = useState(50);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.0);
  const [file, setFile] = useState(null);
  const [responseFormat, setResponseFormat] = useState("text");
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.novita.ai/v3/openai/models", {
        headers: { Authorization: `Bearer <YOUR_API_KEY>` },
      })
      .then((response) => {
        if (response.data && response.data.models) {
          setModels(response.data.models);
        } else {
          setLogs((prev) => [...prev, "No models found in response."]);
        }
      })
      .catch((error) => setLogs((prev) => [...prev, `Error fetching models: ${error.message}`]));
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setLogs((prev) => [...prev, `File uploaded: ${uploadedFile.name}`]);
    } else {
      setLogs((prev) => [...prev, "No file selected."]);
    }
  };

  const handleGenerate = () => {
    if (!selectedModel) {
      setLogs((prev) => [...prev, "Please select a model."]);
      return;
    }

    const formData = new FormData();
    formData.append("model", selectedModel);
    formData.append("system_prompt", systemPrompt);
    formData.append("max_tokens", maxTokens);
    formData.append("temperature", temperature);
    formData.append("top_p", topP);
    formData.append("top_k", topK);
    formData.append("presence_penalty", presencePenalty);
    formData.append("frequency_penalty", frequencyPenalty);
    formData.append("repetition_penalty", repetitionPenalty);
    formData.append("response_format", responseFormat);
    if (file) formData.append("file", file);

    setIsProcessing(true);

    axios
      .post("https://api.novita.ai/v3/openai/completions", formData, {
        headers: { Authorization: `Bearer <YOUR_API_KEY>`, "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setResults(response.data);
        setLogs((prev) => [...prev, "Processing complete."]);
      })
      .catch((error) => setLogs((prev) => [...prev, `Error during processing: ${error.message}`]))
      .finally(() => setIsProcessing(false));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">LLM API Interface</h1>

      <div>
        <label className="block font-medium">Select Model:</label>
        <Select
          options={models.map((model) => ({ label: model, value: model }))}
          onChange={(option) => setSelectedModel(option?.value || null)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>System Prompt:</label>
          <textarea
            className="w-full border p-2"
            rows={4}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label>Response Format:</label>
          <select
            className="w-full border p-2"
            value={responseFormat}
            onChange={(e) => setResponseFormat(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="csv">CSV</option>
          </select>

          <label>Max Tokens: {maxTokens}</label>
          <Slider
            min={0}
            max={64000}
            value={maxTokens}
            onChange={setMaxTokens}
          />

          <label>Temperature: {temperature.toFixed(2)}</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            value={temperature}
            onChange={setTemperature}
          />

          <label>Top P: {topP.toFixed(2)}</label>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={topP}
            onChange={setTopP}
          />

          <label>Top K: {topK}</label>
          <Slider
            min={0}
            max={100}
            value={topK}
            onChange={setTopK}
          />

          <label>Presence Penalty: {presencePenalty.toFixed(2)}</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            value={presencePenalty}
            onChange={setPresencePenalty}
          />

          <label>Frequency Penalty: {frequencyPenalty.toFixed(2)}</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            value={frequencyPenalty}
            onChange={setFrequencyPenalty}
          />

          <label>Repetition Penalty: {repetitionPenalty.toFixed(2)}</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            value={repetitionPenalty}
            onChange={setRepetitionPenalty}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label>Upload File:</label>
        <input type="file" onChange={handleFileUpload} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGenerate}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Generate"}
        </button>
      </div>

      <div className="border p-2 h-40 overflow-y-auto">
        <h2 className="font-bold">Logs:</h2>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>

      {results && (
        <div className="border p-2">
          <h2 className="font-bold">Results:</h2>
          <pre>{responseFormat === "text" ? results : JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
