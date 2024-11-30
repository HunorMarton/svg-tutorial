import React from "react";
import { getColorHex } from "../../utils/colorUtil";
import "./Input.css";

type Props = {
  type:
    | "text"
    | "textarea"
    | "number"
    | "color"
    | "range"
    | "radio"
    | "checkbox";
  options?: string[];
  max?: number;
  long?: boolean;
  value: string | number | boolean;
  onChange: (arg: React.ChangeEvent<HTMLInputElement> | string) => void;
};

export const Input: React.FC<Props> = ({
  type,
  options,
  max,
  long,
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
    if (typeof value !== "string") throw Error("Color input must be a string");
    return (
      <div className="editor-input-container">
        <input
          className="editor-input"
          type={type}
          value={getColorHex(value)}
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
  if (type === "number" || type === "text") {
    if (typeof value === "boolean") throw Error("Text input must be a string");

    return (
      <input
        className={`editor-input ${long ? "long" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (type === "textarea") {
    if (typeof value === "boolean" || typeof value === "number") {
      throw Error("Text input must be a string");
    }

    const [localValue, setLocalValue] = React.useState(value);

    // Update the local value when the store value changes
    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    // Set the value locally
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalValue(event.target.value);
    };

    // Set the value in the store
    const setValue = () => {
      onChange(localValue);
    };

    return (
      <div>
        <textarea
          className="editor-input"
          value={localValue}
          onChange={handleChange}
          rows={3}
        />
        <button onClick={setValue}>Set</button>
      </div>
    );
  }
  throw Error("Invalid input type");
};
