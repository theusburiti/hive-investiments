import { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers'
import clsx from "clsx";

// Components
import Section from "../../../Layout/Section/Section";
import Container from "../../../Layout/Container/Container";
import GridContainer from "../../../Layout/Container/GridContainer";
import QueensAuctionCarousel from "../../../QueensAuctionCarousel";
import ArrowButton from "../../../Button/ArrowButton";
import HexagonButton from "../../../Button/HexagonButton";
import List from "../../../List/List";
import {
  Hexagon,
  WhiteBlur
} from "../../../Layout/Section/Flair";
import ModalImage from '../../../Modals/ModalImage';

// Images
import QueenImagePlaceholder from "../../../../assets/img/queen-placeholder.png";
import FoundersQueen20 from "../../../../assets/img/founders-queen-20.jpg";
import FoundersQueen19 from "../../../../assets/img/founders-queen-19.jpg";
import FoundersQueen18 from "../../../../assets/img/founders-queen-18.jpg";
import FoundersQueen17 from "../../../../assets/img/founders-queen-17.jpg";
import FoundersQueen16 from "../../../../assets/img/founders-queen-16.jpg";
import FoundersQueen15 from "../../../../assets/img/founders-queen-15.jpg";
import FoundersQueen14 from "../../../../assets/img/founders-queen-14.jpg";
import FoundersQueen13 from "../../../../assets/img/founders-queen-13.jpg";
import FoundersQueen12 from "../../../../assets/img/founders-queen-12.jpg";
import FoundersQueen11 from "../../../../assets/img/founders-queen-11.jpg";
import FoundersQueen10 from "../../../../assets/img/founders-queen-10.jpg";
import FoundersQueen9 from "../../../../assets/img/founders-queen-9.jpg";
import FoundersQueen8 from "../../../../assets/img/founders-queen-8.jpg";
import FoundersQueen7 from "../../../../assets/img/founders-queen-7.jpg";
import FoundersQueen6 from "../../../../assets/img/founders-queen-6.jpg";
import FoundersQueen5 from "../../../../assets/img/founders-queen-5.jpg";
import FoundersQueen4 from "../../../../assets/img/founders-queen-4.jpg";
import FoundersQueen3 from "../../../../assets/img/founders-queen-3.jpg";
import FoundersQueen2 from "../../../../assets/img/founders-queen-2.jpg";
import FoundersQueen1 from "../../../../assets/img/founders-queen-1.jpg";

// Context
import { Web3Context } from '../../../../pages/_app';

// Config
import { QueenAuctionABIMainnet } from '../../../../config';

const items = [
  { id: 1, img: FoundersQueen1 },
  { id: 2, img: FoundersQueen2 },
  { id: 3, img: FoundersQueen3 },
  { id: 4, img: FoundersQueen4 },
  { id: 5, img: FoundersQueen5 },
  { id: 6, img: FoundersQueen6 },
  { id: 7, img: FoundersQueen7 },
  { id: 8, img: FoundersQueen8 },
  { id: 9, img: FoundersQueen9 },
  { id: 10, img: FoundersQueen10 },
  { id: 11, img: FoundersQueen11 },
  { id: 12, img: FoundersQueen12 },
  { id: 13, img: FoundersQueen13 },
  { id: 14, img: FoundersQueen14 },
  { id: 15, img: FoundersQueen15 },
  { id: 16, img: FoundersQueen16 },
  { id: 17, img: FoundersQueen17 },
  { id: 18, img: FoundersQueen18 },
  { id: 19, img: FoundersQueen19 },
  { id: 20, img: FoundersQueen20 }
];

const indexToIdMap = {
  0: 20,
  1: 19,
  2: 18,
  3: 17,
  4: 16,
  5: 15,
  6: 14,
  7: 13,
  8: 12,
  9: 11,
  10: 10,
  11: 9,
  12: 8,
  13: 7,
  14: 6,
  15: 5,
  16: 4,
  17: 3,
  18: 2,
  19: 1,
  20: 0
}

const idToIndexMap = {
  20: 0,
  19: 1,
  18: 2,
  17: 3,
  16: 4,
  15: 5,
  14: 6,
  13: 7,
  12: 8,
  11: 9,
  10: 10,
  9: 11,
  8: 12,
  7: 13,
  6: 14,
  5: 15,
  4: 16,
  3: 17,
  2: 18,
  1: 19,
  0: 20
}

const formatter = new Intl.NumberFormat('en-US', {
  // style: 'currency',
  // currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function HeroSection(props) {
  const { bidEvents, auctionContractAddress, ENVIRONMENT, TESTNET_RPC, MAINNET_RPC, intId } = props;
  const { state: { tokenContract, auctionContract, address }, dispatch} = useContext(Web3Context);
  const [activeIndex, setActiveIndex] = useState(19);
  const [recentBids, setRecentBids] = useState(bidEvents);
  const bidEventsById = useMemo(() => recentBids.filter(event => {
    const id = ethers.BigNumber.from(event.args[0]).toNumber();
    return id === indexToIdMap[activeIndex]
    }), [activeIndex, recentBids]
  );
  const [tokenBalance, setTokenBalance] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [countdownToStart, setCountdowToStart] = useState(true);
  const total = items.length;
  const reversedItems = [...items].reverse();
  const [currentBid, setCurrentBid] = useState(15000);
  const [highestBid, setHighestBid] = useState(0);
  const [minimumBid, setMinimumBid] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [activeId, setActiveId] = useState(intId);
  const [auctionContractProvider, setAuctionContractProvider] = useState(null);
  
  const getAuctionContract = useCallback(function() {
      let provider;
      if (ENVIRONMENT === 'testnet') {
        provider = new ethers.providers.JsonRpcProvider(TESTNET_RPC)
      } else {
        provider = new ethers.providers.JsonRpcProvider(MAINNET_RPC)
      }
      const auctionContractProvider = new ethers.Contract(auctionContractAddress, QueenAuctionABIMainnet, provider);
      setAuctionContractProvider(auctionContractProvider);

    }, [ENVIRONMENT, TESTNET_RPC, MAINNET_RPC, auctionContractAddress]
  );

  const getHighestBid = useCallback(async function() {
    if (auctionContractProvider) {
      const bid = await auctionContractProvider?.HighestBidDetails(indexToIdMap[activeIndex]);
      const bidAmount = ethers.utils.formatEther(bid.highestBid);
      setHighestBid(bidAmount);
      setMinimumBid(Number(bidAmount) + 15000);
    }
  }, [auctionContractProvider, activeIndex])

  const getActiveId = useCallback(
    async function() {
      if (auctionContractProvider) {
        const id = await auctionContractProvider.getActiveID();
        const intId = ethers.BigNumber.from(id).toNumber();
        setActiveId(intId);
      }
    }, [auctionContractProvider]
  );

  useEffect(() => {
    getAuctionContract();
  }, [getAuctionContract])

  useEffect(() => {
    getHighestBid();
    getActiveId();
  }, [getHighestBid, getActiveId])

  useEffect(() => {
    if (intId !== 0 && activeId !== 0 && activeId !== indexToIdMap[activeIndex]) {
      setActiveIndex(idToIndexMap[activeId]);
    }
  }, [activeId, intId])

  async function handlePlaceBid() {
    getActiveId();
    const id = indexToIdMap[activeIndex];

    if (currentBid < minimumBid || activeId !== id) {
      return;
    }

    const bid = currentBid;
    const bidAmount = ethers.utils.parseEther(bid.toString());
    const allowance = await tokenContract.allowance(address, auctionContractAddress);
    const allowanceString = ethers.utils.formatEther(allowance.toString())

    if (Number(allowanceString) < currentBid) {
      const allow = await tokenContract.increaseAllowance(auctionContract.address, bidAmount);
      const allowanceResult = await allow?.wait();
      console.log(`allowanceResult`, allowanceResult)
    }

    const transaction = await auctionContract.placeBid(activeId, bidAmount);
    const result = await transaction?.wait();
    console.log(`result`, result)
  }

  useEffect(() => {
    async function getTimes() {
      if (auctionContractProvider) {

        console.log(ENVIRONMENT)

        let startTimeUnix = await auctionContractProvider.startTime();
        startTimeUnix = ethers.BigNumber.from(startTimeUnix).toNumber();

        let endTimeUnix = await auctionContractProvider.endTime();
        endTimeUnix = ethers.BigNumber.from(endTimeUnix).toNumber()

        let countDownToStart = false;

        if(startTimeUnix == 0) {

          console.log("STARTTIME 0");
          countDownToStart = true;

          startTimeUnix = 1646071200
          endTimeUnix = 1646078400

          ///TODO: add hardcoded values

        } else {
          const id = await auctionContractProvider.getActiveID();
          const intId = ethers.BigNumber.from(id).toNumber();
          let auctionInterval;

          if(ENVIRONMENT == "testnet") {
            auctionInterval = 3000
          } else {
            auctionInterval = 28800;
          }

          const numAuctionsElapsed = 20 - intId

          console.log(startTimeUnix)

          console.log("numAuctionsElapsed")
          console.log(numAuctionsElapsed)

          startTimeUnix = (startTimeUnix + (auctionInterval * numAuctionsElapsed))
          endTimeUnix = startTimeUnix + auctionInterval

          console.log(endTimeUnix - startTimeUnix);

          console.log(new Date().getTime())

        }

        const startTime = new Date(startTimeUnix * 1000).valueOf();
        const endTime = new Date(endTimeUnix * 1000).valueOf();


        const timeTillEnd = endTime - new Date().valueOf();
        console.log(timeTillEnd);
        setStartTime(startTime);
        setEndTime(endTime);
        setCountdowToStart(countDownToStart);

      }
    }
    getTimes();
  }, [ENVIRONMENT, TESTNET_RPC, MAINNET_RPC, auctionContractProvider])

  function handleIncrease() {
    setCurrentBid(previousBid => previousBid + 15000);
  }

  function handleDecrease() {
    if (currentBid > 15000) {
      setCurrentBid(previousBid => previousBid - 15000);
    }
  }

  function handleNext() {
    getActiveId()

    if (activeIndex === total - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }

  function handePrevious() {
    getActiveId()

    if (activeIndex === 0) {
      setActiveIndex(total - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }
  
  useEffect(() => {
    async function getBalance() {
      const balance = await tokenContract?.balanceOf(address);
      const formattedBalance = ethers.utils.formatEther(balance.toString());

      setTokenBalance(formattedBalance);
    }
    if (tokenContract && address) {
      getBalance();
    }
  }, [tokenContract, address])

  useEffect(() => {
    if (auctionContractProvider?.on) {
      auctionContractProvider.on("Bid", (id, bidder, bid, event) => {
        const intId = ethers.BigNumber.from(id).toNumber();
        const address = bidder;
        const amount = ethers.utils.formatEther(ethers.BigNumber.from(bid))

        const isAlreadyInArray = recentBids.some(bid => {
          const bidAddress = bid.args[1];
          const bidId = ethers.BigNumber.from(bid.args[0]).toNumber();
          const bidAmount = ethers.utils.formatEther(ethers.BigNumber.from(bid.args[2]))
          return address === bidAddress && intId === bidId && amount === bidAmount;
        })
        if (!isAlreadyInArray) {
          setRecentBids((previousBids) => {
            return [event, ...previousBids];
          });
        }
        getHighestBid();
        
      })

      // Subscription Cleanup
      return () => {
        auctionContractProvider.removeAllListeners();
        // if (auctionContract.off) {
        //   provider.off('Bid')
        // }
      }
    }
  }, [auctionContractProvider, getHighestBid])

  return (
    <Section>
      <Container className={"lg:pt-28 pt-0"}> 
        <GridContainer>
          <div className="col-span-12 lg:col-span-6 flex flex-col relative">
              <div className="flex items-center justify-center lg:hidden">
                <h1 className="bg-clip-text text-transparent z-10 bg-gradient-to-r from-[#FFC164] to-[#FFAB2D] tracking-wider leading-[90px] text-5xl font-bold">
                  Queen {indexToIdMap[activeIndex]}
                </h1>
              </div>
              <div className="flex items-center justify-between pt-[17px] lg:hidden">
              <div>
                <p className="text-[#72799B] mb-[6px]">
                  {activeId >= indexToIdMap[activeIndex] ? "Current Bid ($DAI):" : "Winning Bid ($DAI):"}
                </p>
                <p className="text-2xl lg:text-3xl text-white font-medium tracking-wider leading-[45px] inline-flex">
                  <span className="text-[#FFC164]">$</span>{formatter.format(highestBid)}
                  {/* <span className="flex items-baseline text-[10px] font-bold leading-[15px] text-[#86FFBE]">
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 0L8.39711 5.25H0.602886L4.5 0Z" fill="#86FFBE" />
                    </svg>
                    <span className="ml-[3px]">17%</span>
                  </span> */}
                </p>
              </div>
              <div>
                <p className="text-[#72799B] mb-[6px]">
                  Current Rewards Rate
                </p>
                <p className="text-2xl lg:text-3xl text-white font-medium tracking-wider leading-[45px]">
                  {highestBid == 150000 ? '2.0' : ((highestBid / 15000) * 0.2).toFixed(2)}<span className="text-[#FFC164] text-[10px] font-bold leading-[15px]"> $HNY per day</span>
                </p>
              </div>
            </div>
            <QueensAuctionCarousel
              handleNext={handleNext}
              handePrevious={handePrevious}
              items={reversedItems}
              total={total}
              activeIndex={activeIndex}
              startTime={startTime}
              endTime={endTime}
              setModalImage={setModalImage}
              countDownToStart={countdownToStart}
              showTimer={indexToIdMap[activeIndex] === activeId && intId !== 0}
            />
          </div>
          <div className="col-span-12 lg:col-end-13 lg:col-span-6 relative pt-5 lg:pt-0 lg:pl-[80px]">
            <div className="absolute bg-ellipse-group-right bg-no-repeat w-full h-full z-[-2] -top-[8rem] -left-[5.5rem]" />
            <div className="flex items-center justify-between hidden lg:flex">
              <h1 className="bg-clip-text text-transparent z-10 bg-gradient-to-r from-[#FFC164] to-[#FFAB2D] tracking-wider leading-[90px] text-3xl lg:text-6xl font-bold">
                Queen {indexToIdMap[activeIndex]}
              </h1>
              <div className="flex justify-between ml-[36px]">
                <ArrowButton
                  onClick={handleNext}
                  disabled={activeIndex === total - 1}
                />
                <ArrowButton 
                  arrowDirection="right" 
                  className="ml-[18px]"
                  disabled={activeIndex === 0}
                  onClick={handePrevious}
                />
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start pt-[17px] hidden lg:flex">
              <div>
                <p className="text-[#72799B] mb-[6px]">
                  {activeId >= indexToIdMap[activeIndex] ? "Current Bid ($DAI):" : "Winning Bid ($DAI):"}
                </p>
                <p className="text-2xl lg:text-3xl text-white font-medium tracking-wider leading-[45px] inline-flex">
                  <span className="text-[#FFC164]">$</span>{formatter.format(highestBid)}
                  {/* <span className="flex items-baseline text-[10px] font-bold leading-[15px] text-[#86FFBE]">
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 0L8.39711 5.25H0.602886L4.5 0Z" fill="#86FFBE" />
                    </svg>
                    <span className="ml-[3px]">17%</span>
                  </span> */}
                </p>
              </div>
              <div className="mx-[20px] lg:mx-[40px]">
                <svg width="2" height="61" viewBox="0 0 2 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 60C0.5 60.2761 0.723858 60.5 1 60.5C1.27614 60.5 1.5 60.2761 1.5 60H0.5ZM0.5 0.5V60H1.5V0.5H0.5Z" fill="url(#paint0_linear_818_3275)" />
                  <defs>
                    <linearGradient id="paint0_linear_818_3275" x1="1.5" y1="0.5" x2="1.5" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#82B4FF" stopOpacity="0" />
                      <stop offset="0.479167" stopColor="#82B4FF" />
                      <stop offset="1" stopColor="#82B4FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-[#72799B] mb-[6px]">
                  Current Rewards Rate
                </p>
                <p className="text-2xl lg:text-3xl text-white font-medium tracking-wider leading-[45px]">
                  {highestBid == 150000 ? '2.0' : ((highestBid / 15000) * 0.2).toFixed(2)}<span className="text-[#FFC164] text-[10px] font-bold leading-[15px]"> $HNY per day</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:justify-start lg:pt-[45px]">
              <div className="flex flex-col w-full">
                <p className="text-[#72799B] mb-[9px]">
                  Minimum Bid ($DAI): ${formatter.format(minimumBid)}
                </p>
                <div className="flex">
                  <div className="flex items-center justify-center pl-6 pr-5 lg:pr-10 py-4 bg-[#1E2438] lg:pl-0 lg:max-w-[456px] lg:min-w-[440px] rounded-[25px] shadow-[0px_4px_25px_rgba(0, 0, 0, 0.1)] backdrop-blur-[65px] text-white font-500 tracking-wider leading-[45px] max-h-[88px]">
                    <span className="text-[#FFC164] text-2xl lg:text-3xl">$</span>
                    <input
                      className="w-[150px] lg:w-[250px] bg-[#1E2438] ml-[10px] placeholder:text-white placeholder:font-500 placeholder:text-2xl lg:placeholder:text-3xl placeholder:tracking-wider placeholder:leading-none focus:outline-none pt-[10px]"
                      placeholder={formatter.format(currentBid)}
                      disabled
                    />
                    <span onClick={handleDecrease} className="cursor-pointer w-[20px] h-[20px] flex items-center justify-center">
                      <svg width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H19" stroke="#616674" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="ml-[10px] cursor-pointer" onClick={handleIncrease}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 18.75L9.75 13.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.75 10.5L0.75 10.5C0.335787 10.5 2.93552e-08 10.1642 6.55669e-08 9.75C1.01779e-07 9.33578 0.335787 9 0.75 9L9 9L9 0.75C9 0.335787 9.33579 -1.01779e-07 9.75 -6.55671e-08C10.1642 -2.93554e-08 10.5 0.335787 10.5 0.75L10.5 9.75C10.5 10.1642 10.1642 10.5 9.75 10.5Z" fill="white" />
                        <path d="M18.75 9.75L13.75 9.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <HexagonButton
                    className={clsx("-left-5 -top-2", {
                      'cursor-not-allowed': indexToIdMap[activeIndex] !== activeId
                    })}
                    onClick={handlePlaceBid}
                    disabled={indexToIdMap[activeIndex] !== activeId}
                  />
                </div>
                <p className="text-[#72799B] mb-[9px] self-end mt-[10px]">
                  Balance ($DAI): {formatter.format(tokenBalance)}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:items-center justify-center">
              <p className="text-[#72799B] mb-[6px] self-start">
                Recent Bids
              </p>
              <List
                items={bidEventsById}
                ENVIRONMENT={ENVIRONMENT}
                amountToDisplay={3}
                showBidder={true}
              />
              {bidEventsById?.length >= 3 ? (
                <div className="inline-flex items-center justify-center mt-[30px] self-end">
                  <a className="text-[#82B4FF]" href={ENVIRONMENT === "testnet" ? `https://mumbai.polygonscan.com/address/${auctionContractAddress}` : `https://polygonscan.com/address/${auctionContractAddress}`} rel="noreferrer" target="_blank">
                    See all bid history
                  </a>
                  <span className="ml-[15px]">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L3.5 8.5M6 6L1 1" stroke="#82B4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>) : null
              }
            </div>
          </div>
        </GridContainer>
      </Container>
      <div className="absolute -left-[150px] bottom-[70%] z-0">
        <Hexagon />
      </div>
      <div className="absolute -left-[500px] top-32 z-0">
        <WhiteBlur />
      </div>
      <ModalImage image={modalImage} onToggleModal={() => setModalImage(null)}></ModalImage>
    </Section>
  );
}