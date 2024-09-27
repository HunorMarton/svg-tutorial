import React from "react";
import { ExpandButton } from "./ExpandButton";
import "./Embed.css";

interface EmbedProps {
  id: string;
  link: string;
  fullScreen?: boolean;
  children: React.ReactNode;
}

export const Embed: React.FC<EmbedProps> = ({
  id,
  link,
  fullScreen,
  children,
}) => (
  <div id={id} className={`embed ${fullScreen ? "fullScreen" : ""}`}>
    {children}
    {!fullScreen && <ExpandButton link={link} />}
  </div>
);

export default Embed;
