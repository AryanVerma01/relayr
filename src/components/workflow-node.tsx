"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Ghost, SettingsIcon, TrashIcon } from "lucide-react";

interface workflowNodeProps {
  children: ReactNode;
  name?: string;
  description?: string;
  showToolbar?: boolean;
  selected?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
}

export const WorkflowNode = ({
  children,
  name,
  description,
  showToolbar,
  selected,
  onDelete,
  onSettings,
}: workflowNodeProps) => {
  const isToolbarVisible = showToolbar ?? selected;
  return (
    <>
      {isToolbarVisible && (
        <NodeToolbar>
          <Button size="sm" variant={"ghost"} onClick={onSettings}>
            <SettingsIcon className="size-4" />
          </Button>
          <Button size={"sm"} variant={"ghost"} onClick={onDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="text-white max-w-[200px] text-center"
        >
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground truncate font-sm">
            {description}
          </p>
        </NodeToolbar>
      )}
    </>
  );
};
