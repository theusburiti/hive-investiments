import { useState } from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import Parser from "html-react-parser";
import { ethers } from 'ethers'

// Components
import Section from "../../../Layout/Section/Section";
import Container from "../../../Layout/Container/Container";
import GridContainer from "../../../Layout/Container/GridContainer";
import List from "../../../List/List";
import Button from "../../../Button/Button";
import {
  Hexagon,
  Graph,
  GrayBlur,
  YellowBlur
} from "../../../Layout/Section/Flair";

// Content
import { faq, faqTopics, TOPIC_FOUR } from "../../../Content/FAQ";

// Images
import ChevronDown from "../../../../assets/icons/chevron-down.svg";

export default function LeaderbordSection(props) {
  const { bidEvents, ENVIRONMENT, auctionContractAddress } = props;
  const [faqTopic, setFaqTopic] = useState(TOPIC_FOUR);
  const [faqPanel, setFaqPanel] = useState("");

  return (
    <Section>
      <Container className="pb-0">
        <GridContainer>
          {/* Column */}
          <div className="col-span-12 order-last lg:order-first lg:col-span-6 relative flex mt-10 lg:mt-0">
            <div className="absolute bg-ellipse-group-left-png bg-no-repeat w-full h-full z-[-2] -left-28" />
            <div className="flex flex-col max-w-full">
              <h3 className="text-4xl lg:text-6xl font-semibold text-white tracking-[.03em] leading-tight">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFC164] to-[#FFAB2D]">Leaderboard</span>
              </h3>
              <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider">
                {"Here, you will be able to view our Leaderboard for the top bidders in the Queen's Auction across all rounds."}
              </p>
              <List
                items={bidEvents}
                theme="dark"
                amountToDisplay = {3}
                showBidder = {false}
              />
              {bidEvents?.length >= 5 ? (
                <div className="inline-flex items-center justify-center mt-[30px] self-end">
                  <a className="text-[#82B4FF]" href={ENVIRONMENT === "testnet" ? `https://mumbai.polygonscan.com/address/${auctionContractAddress}` : `https://polygonscan.com/address/${auctionContractAddress}`} rel="noreferrer" target="_blank">
                    See all bid history
                  </a>
                  <span className="ml-[15px]">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L3.5 8.5M6 6L1 1" stroke="#82B4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Coljumn */}
          <div className="col-span-12 order-first lg:order-last lg:col-span-6 flex flex-col lg:items-end">
            {/* Topics */}
            <div className="flex flex-col space-y-4 mt-0 md:flex-row md:space-x-6 md:space-y-0 lg:self-start">
              {[ faqTopics[3], faqTopics[4], faqTopics[0] ].map((topic) => (
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
            <div className="text-white mt-12 space-y-4 text-justify">
              {faq.map(
                (item) =>
                  item.topic === faqTopic && (
                    <Disclosure key={item.id} as="div">
                      <div
                        onClick={() =>
                          setFaqPanel((faqPanel) =>
                            faqPanel === item.id ? "" : item.id
                          )
                        }>
                        <Disclosure.Button className="flex items-center w-full justify-between">
                          <span
                            className={`text-base text-left font-bold tracking-wide py-2 mr-8 transition ${faqPanel === item.id
                                ? "text-[#FFB444]"
                                : "text-white"
                              }`}>
                            {item.title}
                          </span>
                          <Image
                            src={ChevronDown}
                            width="16"
                            height="8"
                            className={`${faqPanel === item.id
                                ? "transform rotate-180"
                                : ""
                              } transition`}
                            alt="down arrow"
                          />
                        </Disclosure.Button>
                      </div>
                      {faqPanel === item.id && (
                        <Disclosure.Panel className="mt-4" static>
                          <p className="text-white opacity-60 text-sm font-medium tracking-wider mt-3 mb-6">
                            {Parser(item.content)}
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
      <div className="absolute right-[200px] -top-[250px] z-0">
        <YellowBlur />
      </div>
    </Section>
  )
}