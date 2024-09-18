import React from "react";
import "./Embed.css";

interface EmbedProps {
  id: string;
  fullScreen?: boolean;
  children: React.ReactNode;
}

export const Embed: React.FC<EmbedProps> = ({ id, fullScreen, children }) => (
  <div id={id} className={`embed ${fullScreen ? "fullScreen" : ""}`}>
    {children}
  </div>
);

export default Embed;
