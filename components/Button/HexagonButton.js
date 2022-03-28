import clsx from "clsx";
import Image from "next/image";
import styles from "./HexagonButton.module.scss";

export default function HexagonButton(props) {
  const { className, onClick, disabled } = props;

  return (
    <div className={"relative"}>
      <button 
        className={clsx('bg-button-png bg-no-repeat hover:bg-button-hover-png bg-cover w-[78px] h-[87px]', className, 'text-white')} 
        onClick={onClick}
        disabled={disabled}
      />
    </div>
  );
}