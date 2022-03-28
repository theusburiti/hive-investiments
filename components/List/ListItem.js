import { useRef, useEffect } from "react";
import clsx from "clsx";
import { ethers } from 'ethers'
import styles from "./ListItem.module.scss";

// Utils
import { ellipseAddress } from "../../Utils";
import { useAddressIcon } from "../../Hooks/useAddressIcon";

const indexToStringMap = {
  0: "I.",
  1: "II.",
  2: "III.",
}

const formatter = new Intl.NumberFormat('en-US', {
  // style: 'currency',
  // currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function Avatar({ address }) {
  const icon = useAddressIcon(30, address);
  const ref = useRef();

  useEffect(()=> {
    if (ref.current != null && ref.current.children.length == 0) {
      ref.current.appendChild(icon)
    } 

  
  },[icon, ref])

  return (
    <div 
      ref={ref}
      className="h-[30px] w-[30px] rounded-full"
    />
  )
}

export default function ListItem(props) {
  const { index, item, theme, isAbsoluteLabel, ENVIRONMENT, total, showBidder } = props;
  const address = item.args[1];
  const id = ethers.BigNumber.from(item.args[0]).toNumber();
  const amount = ethers.utils.formatEther(ethers.BigNumber.from(item.args[2]))
  return (
    <li className="flex mt-[18px]">
      {theme === "dark" ? (
      <div className={clsx(styles.listItemDark, 'hidden lg:flex flex items-center px-3 py-2 lg:px-6 lg:py-4 whitespace-nowrap text-white')}>
        {index + 1}
      </div>
      ) : (
      <div className={`hidden absolute -left-[20px] lg:block self-center text-[#FFC164] ${isAbsoluteLabel ? 'absolute left-0' : ''}`}>
        {indexToStringMap[index]}
      </div>
      )}
      <div
        className={clsx(
          theme === 'dark' ? styles.listItemDark : styles.listItem,
          'flex items-center justify-center w-full justify-around z-10',
          { 'lg:ml-[20px]': theme === 'dark' }
        )}
      >
        {index === 0 && theme !== 'dark' ? (<div className={clsx('z-[-5]', styles.firstListItem)} />) : null}
        <div className="px-1 py-2 md:px-3 lg:px-6 lg:py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-[30px] w-[30px]">
              <Avatar address={address} />
            </div>
            {showBidder ?
            <div className="ml-4">
              <div className="text-white text-sm">{`Bidder ${total - index}`}</div>
            </div>
            : <div className="ml-4">
                <div className="text-white text-sm">{`Queen #${id}`}</div>
              </div> 
            }
          </div>
        </div>
        <div className="px-1 py-2 md:px-3 lg:px-6 lg:py-4 whitespace-nowrap">
          <div className="text-white text-sm">{ellipseAddress(address, 4)}</div>
        </div>
        <div className="px-1 py-2 md:px-3 lg:px-6 lg:py-4 whitespace-nowrap">
          <div className="text-white text-sm"><span className="text-[#FFC164]">$</span>{formatter.format(amount)}</div>
        </div>
        <div className="px-1 py-2 md:px-3 lg:px-6 lg:py-4 whitespace-nowrap text-right font-medium">
          <a href={ENVIRONMENT === "testnet" ? `https://mumbai.polygonscan.com/tx/${item.transactionHash}` : `https://polygonscan.com/tx/${item.transactionHash}`} rel="noreferrer" target="_blank">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 1.00001L6.99997 11M17 1.00001L17 7.00001M17 1.00001L11 1M7 1.00001H1V17H17V11" stroke="#72799B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </li>
  );
}