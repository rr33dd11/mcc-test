import { ITreeNode } from "../types/TreeNode.ts";
import { FC, useContext, useEffect, useState } from "react";
import { IdContext } from "../context/IdContext.tsx";

interface TreeNodeProps {
    treeNodeData: ITreeNode;
}

export const TreeNode: FC<TreeNodeProps> = ({ treeNodeData }) => {
    const { nodeId, title, children, isEditable } = treeNodeData;
    const { toggleId, id } = useContext(IdContext);
    const [currentValue, setCurrentValue] = useState<string>(title);
    const [nodeIsEditable, setNodeIsEditable] = useState<boolean>(isEditable || false);

    const handleTextChange = (newText: string) => {
        setCurrentValue(newText);
    };

    useEffect(() => {
        setNodeIsEditable(isEditable || false)
    }, [treeNodeData]);

    return (
        <>
            <li
                className={id === nodeId ? 'tree-list-active' : undefined}
                onClick={(event) => {toggleId(nodeId); event.stopPropagation() }}
            >
                {
                    nodeIsEditable
                    ? <input
                        type="text"
                        value={currentValue}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handleTextChange(e.target.value)}
                        onBlur={() => setNodeIsEditable(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur();
                            }
                        }}
                    />
                    : currentValue
                }
            </li>
            <ul>
                {[...children.values()].map(node =>
                    <TreeNode key={node.nodeId} treeNodeData={node} />
                )}
            </ul>
        </>
    );
};
