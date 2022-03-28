import { Fragment, useEffect, useState } from "react";
// Core   
import Image from "next/image";
import Link from "next/link";
// Components
import Bubbles from "../components/Bubbles/Bubbles.jsx";
import Button from "../components/Button/Button";
import Header from "../components/Layout/Header/Header";
import Section from "../components/Layout/Section/Section";
import GridContainer from "../components/Layout/Container/GridContainer.jsx";
import FlexContainer from "../components/Layout/Container/FlexContainer";
import GradientBorder from "../components/Border/GradientBorder";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  BlueBlur,
  Graph,
  GrayBlur,
  GreenBlur,
  Hexagon,
  PurpleBlur,
  SmallPurpleBlur,
  WhiteBlur,
  YellowBlur,
} from "../components/Layout/Section/Flair";
// Image
import CardWave from "../assets/img/card-wave.png";
import DarkCircles from "../assets/img/hive-dark-circles.png";
import YellowCorner from "../assets/img/yellow-corner.png";
import YellowLines from "../assets/img/yellow-lines.png";
import CloudImage from "../assets/img/yellow-cloud.png";
import CrescentImage from "../assets/img/yellow-crescent.png";
import HeroImage from "../assets/img/hive-hero-image.png";
import HouseImage from "../assets/img/hive-house-image.png";
import TownhallImage from "../assets/img/hive-townhall-image.png";
import ChevronDown from "../assets/icons/chevron-down.svg";
import Footer from "../components/Layout/Footer/Footer";
import Container from "../components/Layout/Container/Container";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
// Content
import { faq, faqTopics, TOPIC_ONE } from "../components/Content/FAQ";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import EasterEgg from "../components/EasterEgg/EasterEgg";
import Head from "next/head";

function Home({ matic }) {
  const [faqTopic, setFaqTopic] = useState(TOPIC_ONE);
  const [faqPanel, setFaqPanel] = useState("");
  const [maticChartData, setMaticChartData] = useState(null);
  const [hiveChartData, setHiveChartData] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    if (matic) {
      const maticData = matic.prices.map((price) => ({
        name: price[0],
        value: price[1],
      }));
      // Hack a HIVE chart in as well
      const hiveData = matic.prices.map((price) => ({
        name: price[0],
        value: 0.0,
      }));
      maticData && setMaticChartData(maticData);
      hiveData && setHiveChartData(hiveData);
    }

    // Start the Easter Egg listener
    handleEasterEgg();
  }, [matic]);

  const renderPriceChangePercent = (change) => {
    if (!change) return null;
    const roundedChange = Math.round((change + Number.EPSILON) * 100) / 100;
    const isPositive = Boolean(change > 0);

    return (
      <div className="flex items-center">
        <span>
          {isPositive ? (
            <ChevronUpIcon className="text-green-600 w-4 h-4" />
          ) : (
            <ChevronDownIcon className="text-red-600 w-4 h-4" />
          )}
        </span>

        <span
          className={`${
            isPositive ? "text-green-600" : "text-red-600"
          } ml-0.5`}>
          {roundedChange} %
        </span>
      </div>
    );
  };

  const handleEasterEgg = () => {
    let matched = 0;
    const word = "queenbee";
    window?.addEventListener("keypress", (event) => {
      const char = String.fromCharCode(event.which);

      if (word.charAt(matched) === char) {
        matched++;
      } else {
        matched = 0;
      }
      if (matched === word.length) {
        setShowEasterEgg(true);
      }
    });
  };
  return (
    <>
      <Bubbles />
      <main className="overflow-hidden">
        {/* Hero */}
        <Section>
          <Container first>
            <GridContainer>
              <div className="col-span-12 lg:col-span-6 flex flex-col justify-center relative">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[.05em] leading-normal text-center lg:text-left">
                  <span className="text-[#FFB444] flex justify-center lg:justify-start leading-normal">
                    Welcome
                  </span>{" "}
                  to the Hive
                </h1>
                <p className="mt-6 lg:mt-12 text-white text-base lg:text-lg text-center lg:text-left">
                  <span className="text-blue-400">The Next Generation</span> of
                  DeFi as a Service
                </p>
                <div className="flex space-x-4 mt-6 lg:mt-12 justify-center lg:justify-start">
                  <Button
                    href="/whitepaper.pdf"
                    target="_blank">
                    Whitepaper
                  </Button>
                </div>

                <div className="mt-12 lg:mt-28 flex space-x-6 justify-center lg:justify-start">
                  <Link href="https://twitter.com/hiveinvestments">
                    <a
                      target="_blank"
                      className="text-[#00acee] text-xl fab fa-twitter"></a>
                  </Link>
                  {/* <Link href="#">
                  <a className="text-[#00acee] text-xl fab fa-telegram-plane"></a>
                </Link> */}
                  <Link href="https://discord.gg/HiveInvestments">
                    <a className="text-[#C1CDEB] text-xl fab fa-discord"></a>
                  </Link>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="relative -top-12">
                  {/* Background Flair */}
                  <div className="absolute z-0 hidden -left-8 lg:flex w-[672px] h-[674px]">
                    <Image
                      src={DarkCircles}
                      layout="fill"
                      alt="Hive Investments"
                    />
                  </div>
                  <div className="absolute z-0 -top-24 -left-14 w-[715px] h-[495px] hidden lg:flex">
                    <div className="absolute left-80 top-8">
                      <Hexagon className="transform rotate-[45deg]" />
                    </div>
                    <Image
                      className="cloud"
                      src={CloudImage}
                      layout="fill"
                      alt="Hive Investments"
                    />
                  </div>
                  <div className="absolute z-0 -bottom-12 left-8 w-[750px] h-[480px] hidden lg:flex">
                    <Image
                      className="transform rotate-2"
                      src={YellowLines}
                      layout="fill"
                      alt="Hive Investments"
                    />
                  </div>

                  <div className="absolute z-0 bottom-24 left-4 w-[91px] h-[138px] hidden lg:flex">
                    <Image
                      src={YellowCorner}
                      layout="fill"
                      alt="Hive Investments"
                    />
                  </div>

                  {/* Video */}
                  <video
                    width="640"
                    height="640"
                    autoPlay
                    playsInline
                    muted
                    loop
                    className="z-10 relative hidden lg:flex">
                    <source src="./assets/hero.webm" />
                  </video>
                </div>
                {/* Image for Mobile */}
                <div className="relative -right-8 sm:-right-12 flex lg:hidden ">
                  <Image
                    src={HeroImage}
                    width="1106"
                    height="1082"
                    alt="Hive Investments"
                  />
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
        </Section>

        {/* The Hive Vision */}
        <Section>
          <Container>
            <GridContainer>
              {/* Column */}
              <div className="col-span-12 order-last lg:order-first lg:col-span-6 ">
                {/* Content Container */}
                <div className="relative flex flex-col lg:flex-row space-y-8 lg:space-x-8 lg:space-y-0 h-full items-center">
                  {/* Card */}
                  <div className="w-full lg:w-1/2 relative z-20">
                    {/* Effect */}
                    <div className="absolute w-full h-full -top-4 left-0 z-0">
                      <div className="w-10/12 mx-auto h-24 bg-gradient-to-b from-[#94AFF6]/5 via-transparent to-transparent rounded-[20px] z-0"></div>
                    </div>
                    <div className="bg-gradient-to-t from-[#94AFF6]/5 to-[#94AFF6]/10 rounded-[20px] p-4 z-20">
                      <div className="text-xs uppercase text-white font-bold">
                        $HNY
                      </div>
                      <div className="my-4 relative">
                        <ResponsiveContainer height={80}>
                          <LineChart data={hiveChartData}>
                            <YAxis
                              hide
                              type="number"
                              domain={["dataMin", "dataMax"]}
                            />
                            <Line
                              dataKey="value"
                              stroke="#FFB444"
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className=" text-xl font-medium text-white">
                        ~ <span className="text-[#FFC164]">$</span> 0.00
                      </div>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="w-full lg:w-1/2 relative z-20">
                    <div className="absolute w-full h-full -top-4 left-0 z-0">
                      <div className="w-10/12 mx-auto h-24 bg-gradient-to-b from-[#94AFF6]/5 via-transparent to-transparent rounded-[20px] z-0"></div>
                    </div>
                    <div className="bg-gradient-to-t from-[#94AFF6]/5 to-[#94AFF6]/10 rounded-[20px] p-4 z-20">
                      <div className="text-xs uppercase text-white font-bold">
                        $MATIC
                      </div>
                      <div className="my-4 relative">
                        <ResponsiveContainer height={80}>
                          <LineChart data={maticChartData}>
                            <YAxis
                              hide
                              type="number"
                              domain={["dataMin", "dataMax"]}
                            />
                            <Line
                              dataKey="value"
                              stroke="#82B4FF"
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-xl font-medium text-white relative">
                        ~ <span className="text-[#82B4FF] mx-2">$</span>
                        {matic?.usd}
                        <span className="text-xs absolute top-0 ml-3">
                          {renderPriceChangePercent(matic?.usd_24h_change)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-16 left-24 z-0">
                    <Graph className="transform rotate-180 opacity-60" />
                  </div>
                </div>
              </div>

              {/* Column */}
              <div className="col-span-12 order-first lg:order-last lg:col-start-8 lg:col-span-5">
                {/* Content */}
                <h3 className="text-5xl md:text-6xl font-semibold text-white tracking-[.03em] leading-tight">
                  The Hive <span className="text-blue-400">Vision</span>
                </h3>
                <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider">
                  Our mission is to bring about the next evolution of DeFi
                  through transparency, sustainability, and innovation.
                </p>
                <p className="mt-4 text-white opacity-60 text-sm font-medium tracking-wider">
                  A Hive where all bees can thrive, prosper, and enjoy their
                  honey.
                </p>
              </div>
            </GridContainer>
          </Container>
          <div className="absolute -left-[392px] top-24 z-0">
            <PurpleBlur />
          </div>
        </Section>

        {/* How Hive Works */}
        <Section>
          <Container>
            <GridContainer>
              {/* Column */}
              <div className="relative col-span-12 lg:col-span-6 flex flex-col justify-center">
                <h3 className="text-5xl md:text-6xl  font-semibold text-white tracking-[.03em] leading-tight">
                  How <span className="text-blue-400">Hive</span> works
                </h3>
                <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider">
                  Simply mint or purchase a NFT to enjoy some sweet rewards.
                </p>
                <p className="mt-4 text-white opacity-60 text-sm font-medium tracking-wider">
                  Due to our sustainable operating model, we are confident to
                  promise you a daily supply of honey for as long as DeFi lasts.
                </p>
                <p className="mt-4 text-white opacity-60 text-sm font-medium tracking-wider">
                  On the other hand, our unique NFT model allows you to maintain
                  your initial capital which you can choose to sell at any time
                  on our proprietary marketplace.
                </p>
                <p className="mt-4 text-white opacity-60 text-sm font-medium tracking-wider">
                  Lastly, we have implemented KYC, contract audits, and a robust
                  multisign for both your security and confidence.
                </p>

                <div className="absolute -top-24 z-0 pointer-events-none">
                  <Graph className="w-400" />
                </div>

                <div className="flex space-x-6 mt-12">
                  <Button
                    href="https://medium.com/@hiveinvestments"
                    target="_blank">
                    Read Docs
                  </Button>
                  {/* <Button>Audit</Button> */}
                  <Button
                    href="https://www.assuredefi.io/projects/hive-investments"
                    target="_blank">
                    KYC
                  </Button>
                </div>
              </div>

              {/* Column */}
              <div className="relative col-span-12 lg:col-start-8 lg:col-span-5">
                <div className="absolute z-0 bottom-[125px] left-[25px] w-[340px] h-[340px] hidden lg:flex pointer-events-none">
                  <Image
                    src={CrescentImage}
                    layout="fill"
                    alt="Hive Investments"
                  />
                </div>
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="z-10 relative hidden lg:flex ">
                  <source src="./assets/house.webm" />
                </video>
                <div className="relative flex justify-center lg:hidden">
                  <Image
                    src={HouseImage}
                    width="735"
                    height="735"
                    alt="How Hive Works"
                  />
                </div>
              </div>
            </GridContainer>
          </Container>
          <div className="absolute -right-[5px] top-0 z-0">
            <GreenBlur />
          </div>
        </Section>

        {/* Get Started */}
        <Section>
          <Container>
            <FlexContainer className="w-full justify-start lg:justify-center z-10">
              <h3 className="text-5xl md:text-6xl font-semibold text-white tracking-[.03em] leading-tight">
                How To <span className="text-[#FFB444]">Get Started</span>
              </h3>
            </FlexContainer>

            <div className="flex max-w-[980px] mx-auto flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0 z-10">
              {/* Card */}
              <div className="w-full lg:w-1/3 relative">
                <div className="flex flex-col items-center justify-between text-center py-12 px-8 rounded-3xl text-white card-filter with-hover h-full transition">
                  <div className="absolute -top-1 left-0 card-wave transition opacity-0  pointer-events-none z-0 w-full">
                    <Image
                      src={CardWave}
                      width={318}
                      height={186}
                      layout="responsive"
                    />
                  </div>
                  <div>
                    <GradientBorder>
                      <div className="bg-[#293548] p-3 min-w-[48px] min-h-[48px] rounded-2xl">
                        <div className="min-w-[20px] min-h-[20px] flex justify-center items-center">
                          1
                        </div>
                      </div>
                    </GradientBorder>
                    <div className="font-bold text-xl mt-8">
                      <span className="text-[#FFB444]">Buy</span> Honey
                    </div>
                    <p className="text-white opacity-60  text-sm font-medium tracking-wider mt-6">
                      $HNY is available on the Polygon Network. Buy 10 $HNY to
                      get started.
                    </p>
                  </div>
                  <Button className="mt-12">Buy</Button>
                </div>
                {/* Effect */}
                <div className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none flex items-end">
                  <div className="w-10/12 mx-auto h-48 bg-gradient-to-b from-[#94AFF6]/[0.07] via-transparent to-transparent rounded-[20px] z-0 transform rotate-180 relative -bottom-4 opacity-30"></div>
                </div>
              </div>

              {/* Card */}
              <div className="w-full lg:w-1/3 relative">
                <div className="flex flex-col items-center justify-between text-center py-12 px-8 rounded-3xl text-white card-filter with-hover h-full">
                  <div className="absolute top-0 left-0 card-wave transition opacity-0  pointer-events-none z-0 w-full">
                    <Image
                      src={CardWave}
                      width={318}
                      height={186}
                      layout="responsive"
                    />
                  </div>
                  <div>
                    <GradientBorder>
                      <div className="bg-[#293548] p-3 min-w-[48px] min-h-[48px] rounded-2xl">
                        <div className="min-w-[20px] min-h-[20px] flex justify-center items-center">
                          2
                        </div>
                      </div>
                    </GradientBorder>

                    <div className="font-bold text-xl mt-8">
                      <span className="text-[#FFB444]">Mint</span> NFT
                    </div>
                    <p className="text-white opacity-60 text-sm font-medium tracking-wider mt-6">
                      Mint your bee to start generating some sweet honey.
                    </p>
                  </div>
                  <Button className="mt-12">Mint</Button>
                </div>
                {/* Effect */}
                <div className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none flex items-end">
                  <div className="w-10/12 mx-auto h-48 bg-gradient-to-b from-[#94AFF6]/[0.07] via-transparent to-transparent rounded-[20px] z-0 transform rotate-180 relative -bottom-4 opacity-30"></div>
                </div>
              </div>

              {/* Card */}
              <div className="w-full lg:w-1/3 relative">
                <div className="flex flex-col items-center justify-between text-center py-12 px-8 rounded-3xl text-white card-filter with-hover h-full">
                  <div className="absolute top-0 left-0 card-wave transition opacity-0  pointer-events-none z-0 w-full">
                    <Image
                      src={CardWave}
                      width={318}
                      height={186}
                      layout="responsive"
                    />
                  </div>
                  <div>
                    <GradientBorder>
                      <div className="bg-[#293548] p-3 min-w-[48px] min-h-[48px] rounded-2xl">
                        <div className="min-w-[20px] min-h-[20px] flex justify-center items-center">
                          3
                        </div>
                      </div>
                    </GradientBorder>

                    <div className="font-bold text-xl mt-8">
                      <span className="text-[#FFB444]">Harvest</span> Honey
                    </div>
                    <p className="text-white opacity-60 text-sm font-medium tracking-wider mt-6">
                      Sit back, relax, and collect your $HNY, produced fresh
                      every day.
                    </p>
                  </div>
                  <Button className="mt-12">Harvest</Button>
                </div>
                {/* Effect */}
                <div className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none flex items-end">
                  <div className="w-10/12 mx-auto h-48 bg-gradient-to-b from-[#94AFF6]/[0.07] via-transparent to-transparent rounded-[20px] z-0 transform rotate-180 relative -bottom-4 opacity-30"></div>
                </div>
              </div>
            </div>
          </Container>
          <div className="absolute -left-[180px] top-[10rem] z-0">
            <Hexagon className="transform rotate-90" />
          </div>

          <div className="absolute -left-[280px] top-0 z-0">
            <GrayBlur />
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <Container className="pb-0">
            <GridContainer>
              {/* Column */}
              <div className="col-span-12 order-last lg:order-first lg:col-span-6 relative flex items-center">
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="z-10 relative hidden lg:flex ">
                  <source src="./assets/townhall.webm" />
                </video>
                <div className="relative flex lg:hidden">
                  <Image
                    src={TownhallImage}
                    width="884"
                    height="884"
                    alt="FAQ"
                  />
                </div>
              </div>

              {/* Coljumn */}
              <div className="col-span-12 order-first lg:order-last lg:col-span-6 flex flex-col">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[.03em] leading-tight">
                  FAQ
                </h1>
                {/* Topics */}
                <div className="flex flex-col space-y-4  mt-16 md:flex-row md:space-x-6 md:space-y-0">
                  {[faqTopics[0], faqTopics[1], faqTopics[2]].map((topic) => (
                    <Button
                      onClick={() => setFaqTopic(topic.id)}
                      key={topic.id}
                      active={topic.id === faqTopic}
                      minimal>
                      {topic.title}
                    </Button>
                  ))}
                </div>

                {/* Accordion */}
                <div className="text-white mt-12 space-y-4">
                  {faq.map(
                    (item) =>
                      item.topic === faqTopic && (
                        <Disclosure key={item.id} as="div" className="w-full">
                          <div
                            onClick={() =>
                              setFaqPanel((faqPanel) =>
                                faqPanel === item.id ? "" : item.id
                              )
                            }>
                            <Disclosure.Button className="flex items-center w-full justify-between">
                              <span
                                className={`text-base text-left font-bold tracking-wide py-2 mr-8 transition ${
                                  faqPanel === item.id
                                    ? "text-[#FFB444]"
                                    : "text-white"
                                }`}>
                                {item.title}
                              </span>
                              <Image
                                src={ChevronDown}
                                width="16"
                                height="8"
                                className={`${
                                  faqPanel === item.id
                                    ? "transform rotate-180"
                                    : ""
                                } transition`}
                                alt="Chevron Down"
                              />
                            </Disclosure.Button>
                          </div>
                          {faqPanel === item.id && (
                            <Disclosure.Panel className="mt-4" static>
                              <p className="text-white opacity-60 text-sm font-medium tracking-wider mt-3 mb-6">
                                {item.content}
                              </p>
                            </Disclosure.Panel>
                          )}
                        </Disclosure>
                      )
                  )}
                </div>
                {/* Effect */}
                <div className="absolute z-0 pointer-events-none">
                  <Graph />
                </div>
              </div>
            </GridContainer>
          </Container>
          <div className="absolute top-80 -left-[200px] z-0">
            <GrayBlur />
          </div>
          <div className="absolute bottom-72 -left-[120px] z-0">
            <Hexagon />
          </div>
          <div className="absolute right-[50%] -top-[168px] z-0 opacity-70">
            <SmallPurpleBlur />
          </div>
          <div className="absolute -right-[20px] top-0 z-0">
            <YellowBlur />
          </div>
        </Section>

        <Footer />

        <EasterEgg open={showEasterEgg} close={() => setShowEasterEgg(false)} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const chart = await fetch(
    `https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=1&interval=hourly`
  );
  const chartData = await chart.json();
  const price = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&include_24hr_change=true"
  );
  const priceData = await price.json();

  return {
    props: {
      matic: {
        ...priceData?.["matic-network"],
        ...chartData,
      },
    },
    revalidate: 60,
  };
}

export default Home;
