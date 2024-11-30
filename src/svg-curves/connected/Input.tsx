import React from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { track } from "../../utils/analytics";
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
import { parsePoints } from "../utils/pointsUtil.ts";
import { Input as UnconnectedInput } from "../components/editor/Input.tsx";
import type { Dispatch } from "@reduxjs/toolkit";

type Type =
  | "text"
  | "textarea"
  | "number"
  | "color"
  | "range"
  | "radio"
  | "checkbox";

type Props = Selector & {
  type: Type;
  options?: string[]; // Used for radio inputs
  max?: number; // Used for range inputs
  long?: boolean; // Used for text inputs
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
  if (feature === "text") return getValue(feature, property);
  if (feature === "polygon" || feature === "polyline") {
    const value = getValue(feature, property);

    // Special formatting for polygon and polyline points
    return value.map(({ x, y }) => `${x},${y}`).join(" ");
  }
  throw Error(`Unknown feature: ${feature}`);
}

const extractValueFromEvent = (
  e: React.ChangeEvent<HTMLInputElement>,
  type: Type
) => {
  if (type === "number" || type === "range") {
    return Number(e.currentTarget.value);
  }

  if (type === "checkbox") {
    if (e.currentTarget.type === "checkbox") {
      return (e.currentTarget as HTMLInputElement).checked;
    }
    // Checkbox inputs are represented both as a checkbox and a number input
    return e.currentTarget.value === "1";
  }

  return e.currentTarget.value;
};

const onChange = (
  arg: React.ChangeEvent<HTMLInputElement> | string,
  props: Props,
  dispatch: Dispatch
) => {
  const { feature, property, type } = props;

  const value =
    typeof arg === "string" ? arg : extractValueFromEvent(arg, type);

  // Log the event to analytics. Only log one event per feature/property per session
  track("Editor Input Change", { feature, property }, true);

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

  // Special handling of polygon and polyline points
  if (
    (feature === "polygon" || feature === "polyline") &&
    property === "points"
  ) {
    if (typeof value !== "string") throw Error("points must be a string");
    const points = parsePoints(value);
    return dispatch(set({ feature, values: { [property]: points } }));
  }

  dispatch(set({ feature, values: { [property]: value } }));
};

export const InputWithoutProvider: React.FC<Props> = (props) => {
  let value = getValue2(props);
  if (typeof value == "undefined") {
    throw Error(`Value ${props.feature}/${props.property} is undefined`);
  }
  if (typeof value == "number") value = Math.round(value);

  const dispatch = useDispatch();

  return (
    <UnconnectedInput
      {...props}
      value={value}
      onChange={(e) => onChange(e, props, dispatch)}
    />
  );
};

export const Input: React.FC<Props> = (props) => (
  <Provider store={store}>
    <InputWithoutProvider {...props} />
  </Provider>
);
