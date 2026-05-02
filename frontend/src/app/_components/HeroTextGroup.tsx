"use client";

import { useState } from "react";
import HeroCodeAnimation from "./HeroCodeAnimation";
import TypewriterRole from "./TypewriterRole";

interface HeroTextGroupProps {
  name: string;
  bio: string;
}

export default function HeroTextGroup({ name, bio }: HeroTextGroupProps) {
  const [codeComplete, setCodeComplete] = useState(false);

  return (
    <>
      <HeroCodeAnimation
        name={name}
        bio={bio}
        onComplete={() => setCodeComplete(true)}
      />
      <TypewriterRole startAnimation={codeComplete} />
    </>
  );
}
