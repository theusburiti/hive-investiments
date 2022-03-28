// Components
import Card from './Card';
import ArrowButton from "../Button/ArrowButton";

// Hooks
import useCountDown from '../../Hooks/useCountDown';

export default function QueensAuctionCarousel(props) {
  const { handleNext, handePrevious, items, total, activeIndex, startTime, endTime, setModalImage, countDownToStart, showTimer } = props;
  const [days, hours, minutes, seconds] = useCountDown(endTime);

  let timeLeft = endTime - new Date().getTime();

  let string1 = "";

  if (countDownToStart == true) {
    string1 = "Starts In ";
  } else {
    string1 = "Ends In ";
  }

  if (timeLeft < 0) {
    string1 = "Auction Finished ";
  }
  
  return (
    <div className="relative flex flex-col justify-start items-center w-full">
      <div
        className="relative w-full flex w-[225px] h-[225px] lg:w-[600px] lg:h-[400px] lg:ml-[200px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => (
          <Card
            key={`card-${index}`}
            index={index}
            img={item.img}
            activeIndex={activeIndex}
            total={total}
            isActive={index === activeIndex}
            previousIndex={index === 0 ? total - 1 : index - 1}
            nextIndex={index === total - 1 ? 0 : index + 1}
            isBeginning={index === 0}
            isEnd={index === total - 1}
            onShowModal={setModalImage}
          />
        ))}
      </div>
      <div className="flex left-0 right-0 justify-center my-[20px]">
        <ArrowButton
          placement="card"
          onClick={handleNext}
          disabled={activeIndex === total - 1}
        />
        <ArrowButton
          arrowDirection="right"
          className="ml-[18px]"
          placement="card"
          disabled={activeIndex === 0}
          onClick={handePrevious}
        />
      </div>
      
      {showTimer ? timeLeft > 0 ? hours < 0 ? <div className='text-white text-3xl '>{}</div> :
        <div className='text-[#FFC164] text-3xl '><span className="text-white">{string1}</span>{ hours < 10 ? `0${hours}` : hours}h  {minutes < 10 ? `0${minutes}` : minutes}m  {seconds < 10 ? `0${seconds}` : seconds}s</div>
        : <div className='text-[#FFC164] text-3xl '>{string1}</div> : <div/>
      }

    </div>
  )
}


