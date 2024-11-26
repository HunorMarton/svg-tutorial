import Arrow from "./Arrow.astro";
import Decoration from "./Decoration.astro";
import Tree from "./Tree.astro";
import Gingerbread from "./Gingerbread.astro";
import House from "./House.astro";
import DecorationWithClip from "./DecorationWithClip.astro";
import Star from "./Star.astro";
import Snowflake from "./Snowflake.astro";
import Lamp from "./Lamp.astro";
import Forest from "./Forest.astro";
import Snowman from "./Snowman.astro";
import ThreeWithCurves from "./ThreeWithCurves.astro";
import Gift from "./Gift.astro";
import Candy from "./Candy.astro";
import Bear from "./Bear.astro";
import Text from "./Text.astro";
import Sled from "./Sled.astro";
import RingingBell from "./RingingBell.astro";
import Background from "./Background.astro";
import Clock from "./Clock.astro";
import Lights from "./Lights.astro";
import Diagram from "./Diagram.astro";
import SnowGlobe from "./SnowGlobe.astro";
import Windmill from "./Windmill.astro";

const componentNamesObject: {
  [key: string]: any;
} = {
  Arrow,
  Decoration,
  Tree,
  Gingerbread,
  House,
  DecorationWithClip,
  Star,
  Snowflake,
  Lamp,
  Forest,
  Snowman,
  ThreeWithCurves,
  Gift,
  Candy,
  Bear,
  Text,
  Sled,
  RingingBell,
  Background,
  Clock,
  Lights,
  Diagram,
  SnowGlobe,
  Windmill,
};

export default function getComponent(name: string) {
  return componentNamesObject[name];
}
