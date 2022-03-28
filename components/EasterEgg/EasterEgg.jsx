import { Dialog } from "@headlessui/react";
import React from "react";

export default function EasterEgg({ open, close }) {
  return (
    <Dialog
      open={open}
      onClose={close}
      className="fixed z-10 inset-0 overflow-y-scroll">
      <div className="flex items-center justify-center min-h-screen w-full h-full">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white md:w-[85%] w-full mx-2 md:mx-12 rounded-xl md:h-[85%] h-full">
          {/* <Dialog.Title>Complete your order</Dialog.Title> */}
          <iframe
            src="https://flappybee.hive.investments/"
            title="Queen Flappy"
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </Dialog>
  );
}
