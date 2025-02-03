import {ITreeNode} from "../types/TreeNode.ts";

export const editNode = (id: string, nodes: Map<string, ITreeNode>): boolean => {
    if (nodes.has(id)) {
        const node = nodes.get(id) as ITreeNode;
        nodes.set(id, { ...node, isEditable: true });
        return true;
    }

    for (const node of nodes.values()) {
        if (editNode(id, node.children)) {
            return true;
        }
    }
    return false;
};


export const addNode = (id: string, newNode: ITreeNode, nodes: Map<string, ITreeNode>): boolean => {
    if (nodes.has(id)) {
        const parentNode = (nodes.get(id) as ITreeNode).children
        parentNode.set(newNode.nodeId, newNode);
        return true;
    }

    for (const node of nodes.values()) {
        if (addNode(id, newNode, node.children)) {
            return true;
        }
    }

    return false;
};


export const removeNode = (id: string, nodes: Map<string, ITreeNode>): boolean => {
    if (nodes.has(id)) {
        nodes.delete(id);
        return true;
    }

    for (const node of nodes.values()) {
        if (removeNode(id, node.children)) {
            return true;
        }
    }

    return false;
};