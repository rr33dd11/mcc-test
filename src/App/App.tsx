import './App.css'
import {TreeHeader} from "../components/TreeHeader.tsx";
import {TreeBody} from "../components/TreeBody.tsx";
import {TreeFooter} from "../components/TreeFooter.tsx";
import {useContext, useState} from "react";
import {ITreeNode} from "../types/TreeNode.ts";
import {IdContext} from "../context/IdContext.tsx";

function App() {

    const {toggleId} = useContext(IdContext);
    const [treeMap, setTreeMap] = useState<Map<string, ITreeNode>>(() => {
        const node3 = { nodeId: crypto.randomUUID(), title: 'Node 3', children: new Map() };
        const node4 = { nodeId: crypto.randomUUID(), title: 'Node 4', children: new Map() };
        const node2 = { nodeId: crypto.randomUUID(), title: 'Node 2', children: new Map([[node3.nodeId, node3], [node4.nodeId, node4]]) };
        const node1 = { nodeId: crypto.randomUUID(), title: 'Node 1', children: new Map([[node2.nodeId, node2]]) };
        const node6 = { nodeId: crypto.randomUUID(), title: 'Node 6', children: new Map() };

        return new Map([[node1.nodeId, node1], [node6.nodeId, node6]]);
    });

    return (
        <div onClick={() => toggleId(null)} className="App">
            <div className="tree-container">
                <TreeHeader/>
                <TreeBody treeData={treeMap}/>
                <TreeFooter treeData={treeMap} setTreeData={setTreeMap} />
            </div>
        </div>
    )
}

export default App
