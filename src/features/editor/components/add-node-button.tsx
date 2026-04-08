"use client";

import { NodeSelector } from "@/components/node-selector";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { memo, useState, useEffect } from "react";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trigger = (
    <Button
      size="icon"
      onClick={() => {}}
      variant={"outline"}
      className="bg-white"
    >
      <PlusIcon />
    </Button>
  );

  if (!mounted) {
    return trigger;
  }

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      {trigger}
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";
