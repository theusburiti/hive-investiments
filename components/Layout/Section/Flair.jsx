import Image from "next/image";
import Grid from "../../../assets/icons/grid.svg";
import Comb from "../../../assets/icons/comb.svg";
import SmallGrid from "../../../assets/icons/small-grid.svg";
import Grid2 from "../../../assets/icons/gridv2.svg";

export const WhiteBlur = () => {
  return (
    <div className="absolute w-[589px] h-[450px] bg-[#82B4FF] opacity-[0.67] rounded-full blur-[100px]" />
  );
};

export const GrayBlur = () => {
  return (
    <div className="absolute w-[589px] h-[659px] bg-[#86D3FF] opacity-[0.3] blur-[150px]" />
  );
};

export const BlueBlur = () => {
  return (
    <div className="absolute w-[550px] h-[606px] bg-[#86E2FF] opacity-[0.5] blur-[150px]" />
  );
};

export const GreenBlur = () => {
  return (
    <div className="absolute w-[592px] h-[516px] bg-[#86ffbe] opacity-[0.67] rounded-full blur-[150px]" />
  );
};

export const YellowBlur = () => {
  return (
    <div className="absolute w-[592px] h-[888px] bg-[#FFDD86] opacity-[0.67] rounded-full blur-[150px]" />
  );
};

export const PurpleBlur = () => {
  return (
    <div className="absolute w-[592px] h-[516px] bg-[#A586FF] opacity-[0.5] rounded-full blur-[100px]" />
  );
};

export const SmallPurpleBlur = () => {
  return (
    <div className="absolute w-[296px] h-[296px] bg-[#A586FF] opacity-[0.9] rounded-full blur-[120px]" />
  );
};

export const Hexagon = ({ className }) => {
  return (
    <div
      className={`absolute w-[545px] h-[480px] ${className ? className : ""}`}>
      <Image src={Comb} layout="fill" alt="hexagon" />
    </div>
  );
};

export const Graph = ({ className }) => {
  return (
    <div
      className={`absolute w-[846px] h-[543px] ${className ? className : ""}`}>
      <Image src={Grid2} layout="fill" alt="graph" />
    </div>
  );
};

export const SmallGraph = ({ className }) => {
  return (
    <div
      className={`absolute w-[423px] h-[271px] ${className ? className : ""}`}>
      <Image src={Grid2} layout="fill" alt="small graph" />
    </div>
  );
};

export const Matrix = () => {
  return <div className="absolute w-[752px] h-[748px] matrix opacity-50"></div>;
};
