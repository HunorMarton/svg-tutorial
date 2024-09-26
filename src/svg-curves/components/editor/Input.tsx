import React from "react";
import "./Input.css";

type Props = {
  type: "text" | "number" | "color" | "range" | "radio" | "checkbox";
  options?: string[];
  max?: number;
  value: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  type,
  options,
  max,
  value,
  onChange,
}) => {
  if (type === "checkbox") {
    if (typeof value !== "boolean")
      throw Error("Checkbox input must be a boolean");
    return (
      <div className="editor-input-container">
        <input
          className="editor-input"
          type={type}
          checked={value}
          onChange={onChange}
        />
        <input
          className="editor-input"
          type="number"
          value={value ? 1 : 0}
          min="0"
          max="1"
          onChange={onChange}
        />
      </div>
    );
  }
  if (type === "radio") {
    return (
      <div className="editor-input-container">
        {options?.map((option) => (
          <label
            key={option}
            className={`editor-radio ${option === value ? "selected" : ""}`}
          >
            <input
              className="editor-input"
              type={type}
              value={option}
              checked={option === value}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }
  if (type === "range") {
    if (typeof value !== "number") throw Error("Range input must be a number");
    return (
      <div className="editor-input-container">
        <input
          className="editor-input"
          type={type}
          min="0"
          max={max ?? 100}
          value={value}
          onChange={onChange}
        />
        <input
          className="editor-input"
          type="number"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  if (type === "color") {
    if (typeof value === "boolean") throw Error("Color input must be a string");
    return (
      <div className="editor-input-container">
        <input
          className="editor-input"
          type={type}
          value={value}
          onChange={onChange}
        />
        <input
          className="editor-input"
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  if (typeof value === "boolean") throw Error("Text input must be a string");
  return (
    <input
      className="editor-input"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
