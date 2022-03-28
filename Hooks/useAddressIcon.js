import { useMemo } from 'react';
import generateIdenticon from '../Utils/JazzIcon';

// https://github.com/MetaMask/metamask-extension/blob/c076faeb8fde82d4997bca3a0955cd6b34e5450f/ui/helpers/utils/icon-factory.js#L84
function jsNumberForAddress(address) {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  return seed;
}

export function useAddressIcon(size, address) {
  return useMemo(() => {
    if (typeof window !== "undefined" && address !==  null) {
      return generateIdenticon(size, jsNumberForAddress(address));
    }
  }, [address, size])
}