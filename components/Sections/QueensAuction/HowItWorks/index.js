import Image from "next/image";
import Parser from "html-react-parser";

// Components
import Section from "../../../Layout/Section/Section";
import Container from "../../../Layout/Container/Container";
import GridContainer from "../../../Layout/Container/GridContainer";
import {
  Graph,
  GreenBlur
} from "../../../Layout/Section/Flair";

// Images
import HowItWorks from "../../../../assets/img/queens-auction-page-how-it-works.png";
import HowItWorksImage from "../../../../assets/img/metadata-image.png";

export default function HowItWorksSection() {
  return (
    <Section>
      <Container className={"lg:pt-18"}>
        <GridContainer>
          {/* Column */}
          <div className="relative col-span-12 lg:col-span-6 flex flex-col text-justify">
            <h3 className="text-2xl lg:text-6xl  font-semibold text-white tracking-[.03em] leading-tight">
              <span className="text-blue-400">{"Queen's"}</span> Auction
            </h3>
            <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider">
              {`Hive will utilize the power of both NFTs and DeFi to create a synergistic hybrid project that brings the best of both worlds. Premium artwork, no locking up of your capital, sustainable daily passive income, and philanthropic contributions to global bee preservation are just some of the highlights of Hive NFTs. Due to the immense hype around Hive, there will be strict anti-whale measures for the first few days of launch.`}
            </p>
            <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider z-10">
              {Parser(`Thus, the Queen's Auction has been created specifically for our larger bees to be able to invest to their heart's content. Twenty legendary Founder's Queens, the first twenty NFTs in existence, will be auctioned to the highest bidders - the higher the bid, the higher the reward rate. For more information, please refer to our <a href="https://medium.com/@hiveinvestments" rel="noreferrer" target="_blank" className="underline"> Mediums</a>.`)}
            </p>
            <p className="mt-8 text-white opacity-60 text-sm font-medium tracking-wider">
              <span className="block font-bold text-blue-400 opacity-100">For all Auction winners</span>
              {"Funds will be withdrawn from the smart contract's escrow account, and you will receive a placeholder Queen within 24 hours of the end of the final round. This placeholder NFT will be redeemable on launch for your exact queen with the customized daily reward payout according to your winning bid amount."}
            </p>
            <div className="absolute -top-8 left-24 z-0">
              <Graph className="transform rotate-180" />
            </div>
          </div>

          {/* Column */}
          <div className="image-frame relative flex justify-center mt-10 ml-[20px] sm:mx-auto lg:mt-0 col-span-12 lg:col-span-6">
            <video
              title="How Hive Works"
              width="498"
              height="498"
              autoPlay
              playsInline
              muted
              loop
              className="z-10 relative hidden lg:flex">
              <source src="./assets/auction.mp4" />
            </video>
            <Image
              src={HowItWorksImage}
              width="476"
              height="409"
              alt="How Hive Works"
              className="lg:hidden"
            />
          </div>
        </GridContainer>
      </Container>
      <div className="absolute -right-[5px] top-0 z-0">
        <GreenBlur />
      </div>
    </Section>
  )
}