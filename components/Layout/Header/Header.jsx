import { Fragment, useRef, useEffect } from "react";
import { useRouter } from 'next/router'
import { navigation } from "../../Content/Navigation";

// Core
import Link from "next/link";
import Image from "next/image";
//Image
import Logo from "../../../assets/img/hive-logo-min.png";
// Component
import Button from "../../Button/Button";
import BeeHiveButton from "../../BeeHive/BeeHiveNav";
import { Popover, Transition } from "@headlessui/react";
// Icons
import DarkModeIcon from "../../../assets/icons/dark-toggle-icon.svg";
import MenuIcon from "../../../assets/icons/menu-icon.svg";
import { Graph, SmallGraph } from "../Section/Flair";
// import { MenuIcon } from "@heroicons/react/outline";
import { ellipseAddress } from "../../../Utils";
import { useAddressIcon } from "../../../Hooks/useAddressIcon";

function nodeToString(node) {
  let tmpNode = document.createElement( "div" );
  tmpNode.appendChild( node.cloneNode( true ) );
  let str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE
  return str;
}

export default function Header({ children, connect, disconnect, address }) {
  const { pathname } = useRouter();
    const ref = useRef();
    const icon = useAddressIcon(30, address);

    useEffect(()=> {
      if (ref?.current) {
        ref.current.appendChild(icon)
      }
    },[icon])

  return (
    <header className="max-w-[1600px] mx-auto w-full px-8 sm:px-12 lg:px-8 mt-8  lg:mb-0 py-4 z-10 ">
      {/* <div className="absolute -top-8 -left-12  z-0 ">

        <Graph className="transform rotate-180" />
      </div> */}
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Logo */}
        <div className="max-w-[188px] mb-3 lg:mb-0 w-full h-full relative">
          <Link href="/">
            <a>
              <Image src={Logo} width={262} height={51} alt="Hive Logo" />
            </a>
          </Link>
        </div>
        {children}

        {/* Mobile Navigation */}
        {/* <Popover as="nav" className="relative flex lg:hidden ">
          {({ open }) => (
            <>
              <Popover.Button className="flex items-center">
                <Image src={MenuIcon} width="24" height="24" alt="Navigation" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute z-20 right-0 mt-10 px-2 w-screen max-w-xs sm:px-0 ">
                  <div className="rounded-lg shadow-lg overflow-hidden">
                    <div className="relative grid gap-6 px-4 py-6 sm:gap-8 sm:p-6 bg-[#232B47]">
                      {navigation.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="-m-3 p-3 block rounded-md hover:bg-[#94AFF6]/10 text-[#ffffff]/30 hover:text-[#ffffff]/100 transition ease-in-out duration-150">
                          <p className="text-sm font-semibold">{item.title}</p>
                        </a>
                      ))}
                      <Button className="justify-center">Queens Auction</Button>
                      <Button className="justify-center">Enter Hive</Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover> */}

        {/* Navigation */}
        <nav className="hidden lg:flex">
          <ul className="inline-flex space-x-8 items-center text-white">
            <li> <a href="https://dapp.hive.investments/whitelist" className="text-sm font-medium opacity-30 hover:opacity-100 cursor-pointer transition">
              Hivelist Sale
            </a> </li>
            <li> <a href="https://www.hiveacademy.io" className="text-sm font-medium opacity-30 hover:opacity-100 cursor-pointer transition">
              Hive Academy
            </a> </li>
            <BeeHiveButton />
          </ul>
        </nav>

        {/* Call to Action */}
        <div className="lg:flex items-center space-x-8">
          {/* <Image
            src={DarkModeIcon}
            width={18}
            height={18}
            alt="Dark Mode Toggle"
          /> */}
          {pathname !== '/queensauction' ? (
            <>
              {/*} <BeeHiveButton /> 
              <Button className="!ml-0 lg:!ml-4" href="https://dapp.hive.investments/whitelist">Hivelist</Button> */}
              <Button className="!ml-0 lg:!ml-4" href={'/queensauction'}>Queen&apos;s Auction</Button>
              
            </>
            ) : address?.length ? (
              <span className="flex items-center lg:text-xl text-xs text-white">
                {ellipseAddress(address)}
                <div ref={ref} className="ml-4" />
                <Button onClick={disconnect} className="ml-4">Disconnect</Button>
                {/* <div dangerouslySetInnerHTML={{__html: nodeToString(icon)}} /> */}
              </span>
            ) : (
            <Button onClick={connect}>Connect</Button>
          )}
        </div>
      </div>
    </header>
  );
}
