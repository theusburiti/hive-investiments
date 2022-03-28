import { ethers } from 'ethers'

// Components
import Footer from "../components/Layout/Footer/Footer";

// Sections
import HeroSection from "../components/Sections/QueensAuction/Hero";
import HowItWorksSection from "../components/Sections/QueensAuction/HowItWorks";
import LeaderbordSection from "../components/Sections/QueensAuction/Leaderbord";

// Config
import { QueenAuctionABIMainnet, TestAuctionAddress, MainnetAuctionAddress } from '../config';

export default function QueensAuction(props) {
  const { bidEvents, auctionContractAddress, ENVIRONMENT, MAINNET_RPC, TESTNET_RPC, intId } = props;
  const leaderboard = bidEvents.map(item => item).sort((a, b) => {
    const aAmount = ethers.utils.formatEther(ethers.BigNumber.from(a.args[2]));
    const bAmount = ethers.utils.formatEther(ethers.BigNumber.from(b.args[2]));
    return Number(bAmount) - Number(aAmount);
  });
  let bidMap = {}
  let leaderbord = []

  console.log("leaderboard length = ")
  console.log(leaderboard.length)

  for(let i = 0; i < leaderboard.length; i++) {

    let bid = leaderboard[i];

    let bidId = ethers.BigNumber.from(bid.args[0]).toString();

    if(bidId in bidMap) {

      console.log("bid in bidmap")
      continue
    } 

    leaderbord.push(bid);
    bidMap[bidId] = true;

  }

  const recentBids = bidEvents.map(item => item).sort((a, b) => {
    console.log(b);
    return b.blockNumber - a.blockNumber;
  });

  return (
    <main className="overflow-hidden lg:relative">
      <HeroSection
        bidEvents={recentBids}
        auctionContractAddress={auctionContractAddress}
        MAINNET_RPC={MAINNET_RPC}
        TESTNET_RPC={TESTNET_RPC}
        ENVIRONMENT={ENVIRONMENT}
        intId={intId}
      />
      <HowItWorksSection />
      <LeaderbordSection
        bidEvents={leaderbord}
        auctionContractAddress={auctionContractAddress}
        ENVIRONMENT={ENVIRONMENT}
      />
      <Footer />
    </main>
  );
}

export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider;
  let auctionContractAddress;
  let blockNr;
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider(process.env.TESTNET_RPC)
    auctionContractAddress = TestAuctionAddress
    blockNr = 25324223;
  } else {
    provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC)
    auctionContractAddress = MainnetAuctionAddress
    blockNr = 25402175;
  }

  const contract = new ethers.Contract(auctionContractAddress, QueenAuctionABIMainnet, provider);
  const eventFilter = contract.filters.Bid()
  const events = await contract.queryFilter(eventFilter, blockNr, 'latest');
  const id = await contract.getActiveID();
  const intId = ethers.BigNumber.from(id).toNumber();
  const ENVIRONMENT = await process.env.ENVIRONMENT;
  const MAINNET_RPC = await process.env.MAINNET_RPC;
  const TESTNET_RPC = await process.env.TESTNET_RPC;
  const REACT_APP_INFURA_ID = await process.env.REACT_APP_INFURA_ID;

  return {
    props: {
      bidEvents: JSON.parse(JSON.stringify(events)),
      ENVIRONMENT,
      auctionContractAddress,
      MAINNET_RPC,
      TESTNET_RPC,
      intId,
      REACT_APP_INFURA_ID
    }
  }
}