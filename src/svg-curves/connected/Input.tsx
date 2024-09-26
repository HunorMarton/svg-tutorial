import React from "react";

import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store, type RootState } from "../state/store.ts";
import { set } from "../state/features/style.ts";
import { type Selector } from "../utils/types.ts";
import { Input as UnconnectedInput } from "../components/editor/Input.tsx";

type Props = Selector & {
  type: "text" | "number" | "color" | "range" | "radio";
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
  const value = getValue2(props);
  if (typeof value == "undefined" || typeof value == "boolean") return null;

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      props.type === "number" || props.type === "range"
        ? Number(e.target.value)
        : e.target.value;
    const { feature, property } = props;
    dispatch(set({ feature, values: { [property]: value } }));
  };

  return <UnconnectedInput {...props} value={value} onChange={onChange} />;
};

export const Input: React.FC<Props> = (props) => (
  <Provider store={store}>
    <InputWithoutProvider {...props} />
  </Provider>
);
