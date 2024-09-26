import React from "react";
import { CodeStyle as UnconnectedCodeStyle } from "../components/CodeStyle.tsx";

import type { RootState } from "../state/store";
import { useSelector } from "react-redux";

export const CodeStyle: React.FC = () => {
  const style = useSelector((state: RootState) => state.style);

  return <UnconnectedCodeStyle {...style} />;
};
