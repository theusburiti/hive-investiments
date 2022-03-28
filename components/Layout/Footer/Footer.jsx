import Link from "next/link";
import Image from "next/image";
// icon
import DarkModeIcon from "../../../assets/icons/dark-toggle-icon.svg";
import Button from "../../Button/Button";
import { GrayBlur } from "../Section/Flair";

export default function Footer() {
  return (
    <footer className="max-w-[1600px] w-full mx-auto px-6 sm:px-12 lg:px-8 mb-8 mt-0 py-4 z-10 overflow-hidden relative">
      <div className="flex flex-col justify-start items-start lg:flex-row lg:justify-between lg:items-center space-y-8 lg:space-y-0">
        {/* Socials */}
        <div className="flex space-x-6 items-center">
          <Link href="https://twitter.com/hiveinvestments">
            <a
              target="_blank"
              className="text-[#00acee] text-lg fab fa-twitter"></a>
          </Link>
          {/* <Link href="#">
            <a className="text-[#00acee] text-lg fab fa-telegram-plane"></a>
          </Link> */}
          <Link href="https://discord.gg/HiveInvestments">
            <a className="text-[#C1CDEB] text-lg fab fa-discord"></a>
          </Link>
        </div>
        {/* Footer Nav */}
        <div className="flex space-x-8 justify-between lg:justify-start w-full lg:w-auto items-center">
          <ul className="inline-flex space-x-6 items-center text-blue-300">
            <li>
              <a
                className="text-xs font-medium cursor-pointer transition"
                href="../assets/Hive_Disclaimer.pdf"
                download>
                Disclaimer
              </a>
            </li>
            {/* <li className="text-xs font-medium cursor-pointer transition">
              Privacy Policy
            </li> */}
          </ul>
          <Button minimal className="flex lg:hidden" href={'/queensauction'}>
            Queen&apos;s Auction
          </Button>
          {/* <span className="hidden lg:flex">
            <Image
              src={DarkModeIcon}
              width={18}
              height={18}
              alt="Dark Mode Toggle"
            />
          </span> */}

          <Button className="hidden lg:inline-flex" href={'/queensauction'}>
            Queen&apos;s Auction
          </Button>
        </div>
      </div>
    </footer>
  );
}
