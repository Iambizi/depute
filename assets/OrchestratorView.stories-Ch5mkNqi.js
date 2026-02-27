import{j as r,r as S}from"./iframe-D3fIoj3q.js";import{h as x}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const R="_base_4kxz5_3",I="_header_4kxz5_14",T="_headerLeft_4kxz5_23",j="_headerRight_4kxz5_29",w="_title_4kxz5_35",A="_nodeBadge_4kxz5_41",B="_canvas_4kxz5_51",W="_empty_4kxz5_57",P="_emptyIcon_4kxz5_67",$="_treeRoot_4kxz5_78",D="_treeChildren_4kxz5_79",L="_treeItem_4kxz5_91",E="_node_4kxz5_41",V="_nodeClickable_4kxz5_112",F="_nodeSelected_4kxz5_126",M="_depth0_4kxz5_133",U="_depth1_4kxz5_134",q="_depth2_4kxz5_135",Q="_depth3_4kxz5_136",K="_toggle_4kxz5_139",H="_togglePlaceholder_4kxz5_160",X="_chevron_4kxz5_165",G="_chevronOpen_4kxz5_171",J="_dot_4kxz5_176",Y="_dotIdle_4kxz5_183",Z="_dotWorking_4kxz5_184",ee="_pulse_4kxz5_1",re="_dotBlocked_4kxz5_185",te="_dotFailed_4kxz5_186",se="_dotCompleted_4kxz5_187",ae="_nodeMeta_4kxz5_195",ne="_nodeLabel_4kxz5_203",oe="_nodeRole_4kxz5_212",de="_nodeTask_4kxz5_220",le="_statusBadge_4kxz5_230",ce="_badge_idle_4kxz5_240",ie="_badge_working_4kxz5_241",pe="_badge_blocked_4kxz5_242",he="_badge_failed_4kxz5_243",me="_badge_completed_4kxz5_244",e={base:R,header:I,headerLeft:T,headerRight:j,title:w,nodeBadge:A,canvas:B,empty:W,emptyIcon:P,treeRoot:$,treeChildren:D,treeItem:L,node:E,nodeClickable:V,nodeSelected:F,depth0:M,depth1:U,depth2:q,depth3:Q,toggle:K,togglePlaceholder:H,chevron:X,chevronOpen:G,dot:J,dotIdle:Y,dotWorking:Z,pulse:ee,dotBlocked:re,dotFailed:te,dotCompleted:se,nodeMeta:ae,nodeLabel:ne,nodeRole:oe,nodeTask:de,statusBadge:le,badge_idle:ce,badge_working:ie,badge_blocked:pe,badge_failed:he,badge_completed:me},ue={idle:e.dotIdle,working:e.dotWorking,blocked:e.dotBlocked,failed:e.dotFailed,completed:e.dotCompleted},y={idle:"Idle",working:"Working",blocked:"Blocked",failed:"Failed",completed:"Done"};function z({node:t,depth:s,selectedNodeId:o,onNodeClick:a}){const[d,c]=S.useState(!0),b=t.children&&t.children.length>0,v=t.id===o,l=!!a,C=n=>{n.stopPropagation(),a&&a(t)},O=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),a&&a(t))};return r.jsxs("li",{className:e.treeItem,children:[r.jsxs("div",{className:`${e.node} ${e[`depth${Math.min(s,3)}`]??""} ${v?e.nodeSelected:""} ${l?e.nodeClickable:""}`,onClick:l?C:void 0,onKeyDown:l?O:void 0,role:l?"button":void 0,tabIndex:l?0:void 0,"aria-pressed":l?v:void 0,"aria-label":`${t.label}, ${y[t.status]??t.status}`,children:[b&&r.jsx("button",{className:e.toggle,onClick:n=>{n.stopPropagation(),c(!d)},"aria-label":d?`Collapse ${t.label}`:`Expand ${t.label}`,"aria-expanded":d,children:r.jsx("span",{className:`${e.chevron} ${d?e.chevronOpen:""}`,children:"▶"})}),!b&&r.jsx("span",{className:e.togglePlaceholder}),r.jsx("span",{className:`${e.dot} ${ue[t.status]??""}`,"aria-hidden":"true"}),r.jsxs("div",{className:e.nodeMeta,children:[r.jsx("span",{className:e.nodeLabel,children:t.label}),t.role&&r.jsx("span",{className:e.nodeRole,children:t.role}),t.currentTask&&r.jsx("span",{className:e.nodeTask,title:t.currentTask,children:t.currentTask})]}),r.jsx("span",{className:`${e.statusBadge} ${e[`badge_${t.status}`]??""}`,children:y[t.status]??t.status})]}),b&&d&&r.jsx("ul",{className:e.treeChildren,role:"group","aria-label":`Sub-agents of ${t.label}`,children:t.children.map(n=>r.jsx(z,{node:n,depth:s+1,selectedNodeId:o,onNodeClick:a},n.id))})]})}const f=({className:t,nodes:s=[],onNodeClick:o,selectedNodeId:a})=>{const d=N(s);return r.jsxs("div",{className:`${e.base} ${t||""}`,role:"region","aria-label":"Orchestrator agent tree",children:[r.jsxs("div",{className:e.header,children:[r.jsx("div",{className:e.headerLeft,children:r.jsx("span",{className:e.title,children:"Orchestrator View"})}),r.jsx("div",{className:e.headerRight,children:r.jsxs("span",{className:e.nodeBadge,children:[d," agents"]})})]}),r.jsx("div",{className:e.canvas,children:s.length===0?r.jsxs("div",{className:e.empty,children:[r.jsx("span",{className:e.emptyIcon,children:"⬡"}),r.jsx("p",{children:"No agents spawned yet."})]}):r.jsx("ul",{className:e.treeRoot,role:"tree","aria-label":"Agent hierarchy",children:s.map(c=>r.jsx(z,{node:c,depth:0,selectedNodeId:a,onNodeClick:o},c.id))})})]})};function N(t){return t.reduce((s,o)=>s+1+N(o.children??[]),0)}f.__docgenInfo={description:`OrchestratorView visualizes the command-and-control hierarchy of a multi-agent swarm.
Renders a collapsible recursive tree of OrchestratorNodes.`,methods:[],displayName:"OrchestratorView",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},nodes:{required:!1,tsType:{name:"Array",elements:[{name:"OrchestratorNode"}],raw:"OrchestratorNode[]"},description:"Hierarchical tree data — typically a single root orchestrator node",defaultValue:{value:"[]",computed:!1}},onNodeClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: OrchestratorNode) => void",signature:{arguments:[{type:{name:"OrchestratorNode"},name:"node"}],return:{name:"void"}}},description:"Called when the user clicks on an individual node"},selectedNodeId:{required:!1,tsType:{name:"string"},description:"The ID of the currently selected node"}}};const be={title:"AX Components v1/OrchestratorView",component:f,tags:["autodocs"]},i={args:{nodes:x()}},p={name:"State: All Idle",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"idle",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"idle"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"idle"}]}]}},h={name:"State: Blocked Branch",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"working",currentTask:"Waiting on blocked sub-agent",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"completed"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"blocked",currentTask:"Awaiting API key from environment",children:[{id:"4",label:"Validator-3",role:"Validator",status:"idle"}]}]}]}},m={name:"State: Deep 3-Level Tree",args:{nodes:x()}},u={name:"State: Empty (No Nodes)",args:{nodes:[]}},_={name:"Prototype: Live Node Selection",render:()=>{const t=x(),[s,o]=S.useState();return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",fontFamily:"sans-serif"},children:[r.jsx(f,{nodes:t,selectedNodeId:s,onNodeClick:a=>o(d=>d===a.id?void 0:a.id)}),s&&r.jsxs("div",{style:{fontSize:"12px",color:"#6b7280",padding:"8px 12px",background:"#f9fafb",borderRadius:"6px",border:"1px solid #e5e7eb"},children:["Selected node: ",r.jsx("strong",{children:s}),r.jsx("button",{onClick:()=>o(void 0),style:{marginLeft:"8px",fontSize:"11px",cursor:"pointer",padding:"2px 8px",border:"1px solid #e5e7eb",borderRadius:"4px"},children:"Clear"})]})]})}},g={name:"Basic Usage",args:{nodes:[{id:"orch-1",label:"Orchestrator",role:"Orchestrator",status:"working",currentTask:"Delegating sub-tasks across 2 branches",children:[{id:"res-1",label:"Researcher",role:"Researcher",status:"working",currentTask:"Fetching competitor pricing data"},{id:"cw-1",label:"Code Writer",role:"Code Writer",status:"idle"}]}]}},k={name:"Production: Post-Run All Completed",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"completed",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"completed"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"completed",children:[{id:"4",label:"QA-Inspector",role:"QA Inspector",status:"completed"}]}]}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    nodes: generateMockOrchestratorTree()
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: All Idle',
  args: {
    nodes: [{
      id: '1',
      label: 'Orchestrator-Prime',
      role: 'Orchestrator',
      status: 'idle',
      children: [{
        id: '2',
        label: 'Researcher-A',
        role: 'Researcher',
        status: 'idle'
      }, {
        id: '3',
        label: 'Code-Writer-1',
        role: 'Code Writer',
        status: 'idle'
      }]
    }] satisfies OrchestratorNode[]
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'State: Blocked Branch',
  args: {
    nodes: [{
      id: '1',
      label: 'Orchestrator-Prime',
      role: 'Orchestrator',
      status: 'working',
      currentTask: 'Waiting on blocked sub-agent',
      children: [{
        id: '2',
        label: 'Researcher-A',
        role: 'Researcher',
        status: 'completed'
      }, {
        id: '3',
        label: 'Code-Writer-1',
        role: 'Code Writer',
        status: 'blocked',
        currentTask: 'Awaiting API key from environment',
        children: [{
          id: '4',
          label: 'Validator-3',
          role: 'Validator',
          status: 'idle'
        }]
      }]
    }] satisfies OrchestratorNode[]
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Deep 3-Level Tree',
  args: {
    nodes: generateMockOrchestratorTree()
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty (No Nodes)',
  args: {
    nodes: []
  }
}`,...u.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Live Node Selection',
  render: () => {
    const nodes = generateMockOrchestratorTree();
    const [selectedId, setSelectedId] = useState<string | undefined>();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      fontFamily: 'sans-serif'
    }}>
        <OrchestratorView nodes={nodes} selectedNodeId={selectedId} onNodeClick={n => setSelectedId(prev => prev === n.id ? undefined : n.id)} />
        {selectedId && <div style={{
        fontSize: '12px',
        color: '#6b7280',
        padding: '8px 12px',
        background: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
            Selected node: <strong>{selectedId}</strong>
            <button onClick={() => setSelectedId(undefined)} style={{
          marginLeft: '8px',
          fontSize: '11px',
          cursor: 'pointer',
          padding: '2px 8px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px'
        }}>
              Clear
            </button>
          </div>}
      </div>;
  }
}`,..._.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    nodes: [{
      id: 'orch-1',
      label: 'Orchestrator',
      role: 'Orchestrator',
      status: 'working',
      currentTask: 'Delegating sub-tasks across 2 branches',
      children: [{
        id: 'res-1',
        label: 'Researcher',
        role: 'Researcher',
        status: 'working',
        currentTask: 'Fetching competitor pricing data'
      }, {
        id: 'cw-1',
        label: 'Code Writer',
        role: 'Code Writer',
        status: 'idle'
      }]
    }] satisfies OrchestratorNode[]
  }
}`,...g.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Production: Post-Run All Completed',
  args: {
    nodes: [{
      id: '1',
      label: 'Orchestrator-Prime',
      role: 'Orchestrator',
      status: 'completed',
      children: [{
        id: '2',
        label: 'Researcher-A',
        role: 'Researcher',
        status: 'completed'
      }, {
        id: '3',
        label: 'Code-Writer-1',
        role: 'Code Writer',
        status: 'completed',
        children: [{
          id: '4',
          label: 'QA-Inspector',
          role: 'QA Inspector',
          status: 'completed'
        }]
      }]
    }] satisfies OrchestratorNode[]
  }
}`,...k.parameters?.docs?.source}}};const xe=["Default","AllIdle","BlockedBranch","DeepTree","EmptySwarm","PrototypeWithSelection","BasicUsage","PostRunCompleted"];export{p as AllIdle,g as BasicUsage,h as BlockedBranch,m as DeepTree,i as Default,u as EmptySwarm,k as PostRunCompleted,_ as PrototypeWithSelection,xe as __namedExportsOrder,be as default};
