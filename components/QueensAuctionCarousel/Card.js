import clsx from "clsx";
import Image from "next/image";
import styles from "./Card.module.scss";

export default function Card(props) {
  const { isActive, activeIndex, previousIndex, nextIndex, total, isBeginning, isEnd, index, img, onShowModal } = props;

  return (
    <div
      className={clsx(
        "absolute w-[217px] h-[310px] lg:w-[400px] lg:h-[400px] left-0 right-0 rounded-[20px] overflow-hidden",
        { 'z-10 opacity-100': isActive },
        isActive ? styles.active : 'hidden',
        !isActive && index === activeIndex +1 ? styles.leftBeforeActive : '',
        !isActive && index === activeIndex +2 ? styles.secondLeftBeforeActive : '',
        !isActive && index === activeIndex -1 ? styles.rightAfterActive : '',
        !isActive && index === activeIndex -2 ? styles.secondRightAfterActive : '',
        { 'z-0 opacity-80': !isActive }
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <button
          type="button"
          onClick={(e) => onShowModal(img)}
      >
          <Image
            src={img}
            alt="Hive Investments"
            layout="fill"
            objectFit="contain"
          />
      </button>
    </div>
  );
}