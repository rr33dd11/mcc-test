import { TreeNode } from "./TreeNode.tsx";
import { FC, memo } from "react";
import { ITreeNode } from "../types/TreeNode.ts";

interface BodyProps {
    treeData: Map<string, ITreeNode>;
}

export const TreeBody: FC<BodyProps> = memo(({ treeData }) => {

    return (
        <div className="tree-body">
            <ul className="tree-list">
                {[...treeData.values()].map(node =>
                    <TreeNode key={node.nodeId} treeNodeData={node} />
                )}
            </ul>
        </div>
    );
});
