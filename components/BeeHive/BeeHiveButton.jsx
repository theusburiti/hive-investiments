import React, { useState } from "react";
import Button from "../Button/Button";
import BeeHiveModal from "./BeeHiveModal";

export default function BeeHiveButton() {
  const [showBeeHive, setShowBeeHive] = useState(false);
  return (
    <>
      <Button className="hidden lg:flex" onClick={() => setShowBeeHive(true)}>Protect the Hive</Button>
      <BeeHiveModal open={showBeeHive} close={() => setShowBeeHive(false)} />
    </>
  );
}
