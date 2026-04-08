"use client";

import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { memo, ReactNode } from "react";
import { WorkflowNode } from "../../../components/workflow-node";
import { BaseNode } from "../../../components/react-flow/base-node";
import { BaseNodeContent } from "../../../components/react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "../../../components/react-flow/base-handle";
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flow/node-status-indicator";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    selected,
    status = "initial",
    onSettings,
    onDoubleClick,
  }: BaseExecutionNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((currentnodes) => {
        const updatedNodes = currentnodes.filter((node) => node.id !== id);

        return updatedNodes;
      });

      setEdges((currentedges) => {
        const updatedEdges = currentedges.filter(
          (edge) => edge.source !== id && edge.target !== id,
        );

        return updatedEdges;
      });
    };
    const handleSetting = () => {};

    return (
      <>
        <WorkflowNode
          name={name}
          description={description}
          onDelete={handleDelete}
          onSettings={handleSetting}
          selected={selected}
        >
          <NodeStatusIndicator status={status} variant={"border"}>
            <BaseNode onDoubleClick={onDoubleClick} status={status}>
              <BaseNodeContent>
                {typeof Icon === "string" ? (
                  <Image
                    src={Icon}
                    alt={name}
                    width={16}
                    height={16}
                    className="fill-shite"
                  />
                ) : (
                  <Icon className="size-4 text-muted-foreground"></Icon>
                )}
                {children}
                <BaseHandle
                  id="target-1"
                  type={"target"}
                  position={Position.Left}
                ></BaseHandle>
                <BaseHandle
                  id="source-1"
                  type={"source"}
                  position={Position.Right}
                ></BaseHandle>
              </BaseNodeContent>
            </BaseNode>
          </NodeStatusIndicator>
        </WorkflowNode>
      </>
    );
  },
);

BaseExecutionNode.displayName = "BaseExecutionNode";
