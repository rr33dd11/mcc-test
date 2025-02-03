export interface ITreeNode {
    nodeId: string;
    title: string;
    children: Map<string, ITreeNode>;
    isEditable?: boolean
}