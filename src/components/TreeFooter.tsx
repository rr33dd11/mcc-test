import { FC, useContext, Dispatch, SetStateAction } from "react";
import { IdContext } from "../context/IdContext.tsx";
import { ITreeNode } from "../types/TreeNode.ts";
import {addNode, editNode, removeNode} from "../helpers/treeHelper.ts";

interface FooterProps {
    treeData: Map<string, ITreeNode>
    setTreeData: Dispatch<SetStateAction<Map<string, ITreeNode>>>;
}

export const TreeFooter: FC<FooterProps> = ({treeData, setTreeData}) => {
    const { id, toggleId } = useContext(IdContext);

    const handleReset = () => {
        toggleId(null)
        setTreeData(new Map());
    };

    const handleRemove = () => {
        const newTreeData = new Map(treeData);

        if (removeNode(id, newTreeData)) {
            setTreeData(newTreeData);
            toggleId(null)
        }
    };

    const handleAdd = () => {
        const newTreeData = new Map(treeData);
        const nodeId = crypto.randomUUID()
        const newNode = {nodeId: nodeId, title: 'New Node', children: new Map(), isEditable: true}
        toggleId(nodeId)

        if (id === null) {
            newTreeData.set(nodeId, newNode);
            setTreeData(newTreeData);
            return
        }

        if (addNode(id, newNode, newTreeData)) {
            setTreeData(newTreeData);
        }
    };

    const handleEdit = () => {
        const newTreeData = new Map(treeData);
        if (editNode(id, newTreeData)) {
            setTreeData(newTreeData);
        }
    };



    return (
        <div className="tree-footer">
            <button className="tree-btn" onClick={(event) => {handleAdd(); event.stopPropagation()}}>Add</button>
            <button className="tree-btn" disabled={id === null} onClick={(event) => {handleRemove(); event.stopPropagation()}}>Remove</button>
            <button className="tree-btn" disabled={id === null} onClick={(event) => {handleEdit(); event.stopPropagation()}}>Edit</button>
            <button className="tree-btn" onClick={(event) => {handleReset(); event.stopPropagation()}}>Reset</button>
        </div>
    )
};
