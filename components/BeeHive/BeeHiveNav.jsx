import React, { useState } from "react";
import BeeHiveModal from "./BeeHiveModal";

export default function BeeHiveButton() {
  const [showBeeHive, setShowBeeHive] = useState(false);
  return (
    <>
      <li> <a className="text-sm font-medium opacity-30 hover:opacity-100 cursor-pointer transition" onClick={() => setShowBeeHive(true)}>
        Protect the Hive
      </a> </li>
      <BeeHiveModal open={showBeeHive} close={() => setShowBeeHive(false)} />
    </>
  );
}
