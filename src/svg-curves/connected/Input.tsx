import React from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store, type RootState } from "../state/store.ts";
import { set } from "../state/features/style.ts";
import {
  setStartPointByCoord,
  setRotationByValue,
  setRadiusXByValue,
  setRadiusYByValue,
  setFlags,
  setEndPointByCoord,
} from "../state/features/arc.ts";
import { type Selector } from "../utils/types.ts";
import { Input as UnconnectedInput } from "../components/editor/Input.tsx";

type Props = Selector & {
  type: "text" | "number" | "color" | "range" | "radio" | "checkbox";
  options?: string[]; // Used for radio inputs
  max?: number; // Used for range inputs
};

function getValue<K extends keyof RootState>(
  feature: K,
  property: keyof RootState[K]
) {
  return useSelector((state: RootState) => state[feature][property]);
}

// getValue("style", "stroke");
// getValue("style", "stroke2");
// getValue('line', 'x1');

function getValue2({ feature, property }: Selector) {
  if (feature === "style") return getValue(feature, property);
  if (feature === "line") return getValue(feature, property);
  if (feature === "circle") return getValue(feature, property);
  if (feature === "rect") return getValue(feature, property);
  if (feature === "arc") return getValue(feature, property);
  if (feature === "cubicBezier") return getValue(feature, property);
  if (feature === "quadraticBezier") return getValue(feature, property);
}

export const InputWithoutProvider: React.FC<Props> = (props) => {
  let value = getValue2(props);
  if (typeof value == "undefined") throw Error("Value is undefined");
  if (typeof value == "number") value = Math.round(value);

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = {
      number: Number(e.target.value),
      range: Number(e.target.value),
      text: e.target.value,
      color: e.target.value,
      radio: e.target.value,
      checkbox:
        e.target.type == "checkbox" ? e.target.checked : e.target.value === "1",
    }[props.type];

    const { feature, property } = props;

    console.log("change", feature, property, value);

    // Special handling for arc because of the many side effects of setting a property
    if (feature === "arc") {
      if (property === "x1") {
        if (typeof value !== "number") throw Error("x1 must be a number");
        return dispatch(setStartPointByCoord({ x: value }));
      }
      if (property === "y1") {
        if (typeof value !== "number") throw Error("y1 must be a number");
        return dispatch(setStartPointByCoord({ y: value }));
      }
      if (property === "x2") {
        if (typeof value !== "number") throw Error("x2 must be a number");
        return dispatch(setEndPointByCoord({ x: value }));
      }
      if (property === "y2") {
        if (typeof value !== "number") throw Error("y2 must be a number");
        return dispatch(setEndPointByCoord({ y: value }));
      }
      if (property === "rx") {
        if (typeof value !== "number") throw Error("rx must be a number");
        return dispatch(setRadiusXByValue(value));
      }
      if (property === "ry") {
        if (typeof value !== "number") throw Error("ry must be a number");
        return dispatch(setRadiusYByValue(value));
      }
      if (property === "degree") {
        if (typeof value !== "number") throw Error("degree must be a number");
        return dispatch(setRotationByValue(value));
      }
      if (property === "largeArcFlag") {
        if (typeof value !== "boolean")
          throw Error("largeArcFlag must be a boolean");
        return dispatch(setFlags({ largeArcFlag: value }));
      }
      if (property === "sweepFlag") {
        if (typeof value !== "boolean")
          throw Error("sweepFlag must be a boolean");
        return dispatch(setFlags({ sweepFlag: value }));
      }
    }

    dispatch(set({ feature, values: { [property]: value } }));
  };

  return <UnconnectedInput {...props} value={value} onChange={onChange} />;
};

export const Input: React.FC<Props> = (props) => (
  <Provider store={store}>
    <InputWithoutProvider {...props} />
  </Provider>
);
