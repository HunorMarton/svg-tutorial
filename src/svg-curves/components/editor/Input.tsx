import React from "react";
import "./Input.css";

type Props = {
  type: "text" | "number" | "color" | "range" | "radio";
  options?: string[];
  max?: number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  type,
  options,
  max,
  value,
  onChange,
}) => {
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
    console.log("max", max);
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
  return (
    <input
      className="editor-input"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
