import { Dialog } from "@headlessui/react";
import React from "react";

export default function BeeHiveModal({ open, close }) {
  return (
    <Dialog
      open={open}
      onClose={close}
      className="fixed z-10 inset-0 overflow-y-scroll">
      <div className="flex items-center justify-center min-h-screen w-full h-full">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white w-full mx-2 md:mx-12 rounded-xl  h-full max-w-[960px] max-h-[558px] overflow-hidden">
          <iframe
            src="/beeHive/index.html"
            title="Bee Hive"
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </Dialog>
  );
}
