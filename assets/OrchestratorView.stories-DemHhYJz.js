import{j as r}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-Bgbjxzh1.js";import{h as k}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const R="_base_qq4nc_3",I="_header_qq4nc_14",T="_headerLeft_qq4nc_23",j="_headerRight_qq4nc_29",w="_title_qq4nc_35",A="_nodeBadge_qq4nc_41",B="_canvas_qq4nc_51",W="_empty_qq4nc_57",P="_emptyIcon_qq4nc_67",$="_treeRoot_qq4nc_78",D="_treeChildren_qq4nc_79",L="_treeItem_qq4nc_91",E="_node_qq4nc_41",V="_nodeClickable_qq4nc_112",F="_nodeSelected_qq4nc_126",M="_depth0_qq4nc_133",U="_depth1_qq4nc_134",z="_depth2_qq4nc_135",Q="_depth3_qq4nc_136",K="_toggle_qq4nc_139",H="_togglePlaceholder_qq4nc_160",X="_chevron_qq4nc_165",G="_chevronOpen_qq4nc_171",J="_dot_qq4nc_176",Y="_dotIdle_qq4nc_183",Z="_dotWorking_qq4nc_184",ee="_pulse_qq4nc_1",re="_dotBlocked_qq4nc_185",te="_dotFailed_qq4nc_186",ne="_dotCompleted_qq4nc_187",se="_nodeMeta_qq4nc_195",ae="_nodeLabel_qq4nc_203",oe="_nodeRole_qq4nc_212",de="_nodeTask_qq4nc_220",ce="_statusBadge_qq4nc_230",le="_badge_idle_qq4nc_240",ie="_badge_working_qq4nc_241",pe="_badge_blocked_qq4nc_242",he="_badge_failed_qq4nc_243",me="_badge_completed_qq4nc_244",e={base:R,header:I,headerLeft:T,headerRight:j,title:w,nodeBadge:A,canvas:B,empty:W,emptyIcon:P,treeRoot:$,treeChildren:D,treeItem:L,node:E,nodeClickable:V,nodeSelected:F,depth0:M,depth1:U,depth2:z,depth3:Q,toggle:K,togglePlaceholder:H,chevron:X,chevronOpen:G,dot:J,dotIdle:Y,dotWorking:Z,pulse:ee,dotBlocked:re,dotFailed:te,dotCompleted:ne,nodeMeta:se,nodeLabel:ae,nodeRole:oe,nodeTask:de,statusBadge:ce,badge_idle:le,badge_working:ie,badge_blocked:pe,badge_failed:he,badge_completed:me},ue={idle:e.dotIdle,working:e.dotWorking,blocked:e.dotBlocked,failed:e.dotFailed,completed:e.dotCompleted},v={idle:"Idle",working:"Working",blocked:"Blocked",failed:"Failed",completed:"Done"};function S({node:t,depth:n,selectedNodeId:o,onNodeClick:s}){const[d,l]=y.useState(!0),q=t.children&&t.children.length>0,f=t.id===o,c=!!s,C=a=>{a.stopPropagation(),s&&s(t)},O=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s&&s(t))};return r.jsxs("li",{className:e.treeItem,children:[r.jsxs("div",{className:`${e.node} ${e[`depth${Math.min(n,3)}`]??""} ${f?e.nodeSelected:""} ${c?e.nodeClickable:""}`,onClick:c?C:void 0,onKeyDown:c?O:void 0,role:c?"button":void 0,tabIndex:c?0:void 0,"aria-pressed":c?f:void 0,"aria-label":`${t.label}, ${v[t.status]??t.status}`,children:[q&&r.jsx("button",{className:e.toggle,onClick:a=>{a.stopPropagation(),l(!d)},"aria-label":d?`Collapse ${t.label}`:`Expand ${t.label}`,"aria-expanded":d,children:r.jsx("span",{className:`${e.chevron} ${d?e.chevronOpen:""}`,children:"▶"})}),!q&&r.jsx("span",{className:e.togglePlaceholder}),r.jsx("span",{className:`${e.dot} ${ue[t.status]??""}`,"aria-hidden":"true"}),r.jsxs("div",{className:e.nodeMeta,children:[r.jsx("span",{className:e.nodeLabel,children:t.label}),t.role&&r.jsx("span",{className:e.nodeRole,children:t.role}),t.currentTask&&r.jsx("span",{className:e.nodeTask,title:t.currentTask,children:t.currentTask})]}),r.jsx("span",{className:`${e.statusBadge} ${e[`badge_${t.status}`]??""}`,children:v[t.status]??t.status})]}),q&&d&&r.jsx("ul",{className:e.treeChildren,role:"group","aria-label":`Sub-agents of ${t.label}`,children:t.children.map(a=>r.jsx(S,{node:a,depth:n+1,selectedNodeId:o,onNodeClick:s},a.id))})]})}const x=({className:t,nodes:n=[],onNodeClick:o,selectedNodeId:s})=>{const d=N(n);return r.jsxs("div",{className:`${e.base} ${t||""}`,role:"region","aria-label":"Orchestrator agent tree",children:[r.jsxs("div",{className:e.header,children:[r.jsx("div",{className:e.headerLeft,children:r.jsx("span",{className:e.title,children:"Orchestrator View"})}),r.jsx("div",{className:e.headerRight,children:r.jsxs("span",{className:e.nodeBadge,children:[d," agents"]})})]}),r.jsx("div",{className:e.canvas,children:n.length===0?r.jsxs("div",{className:e.empty,children:[r.jsx("span",{className:e.emptyIcon,children:"⬡"}),r.jsx("p",{children:"No agents spawned yet."})]}):r.jsx("ul",{className:e.treeRoot,role:"tree","aria-label":"Agent hierarchy",children:n.map(l=>r.jsx(S,{node:l,depth:0,selectedNodeId:s,onNodeClick:o},l.id))})})]})};function N(t){return t.reduce((n,o)=>n+1+N(o.children??[]),0)}x.__docgenInfo={description:`OrchestratorView visualizes the command-and-control hierarchy of a multi-agent swarm.
Renders a collapsible recursive tree of OrchestratorNodes.`,methods:[],displayName:"OrchestratorView",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},nodes:{required:!1,tsType:{name:"Array",elements:[{name:"OrchestratorNode"}],raw:"OrchestratorNode[]"},description:"Hierarchical tree data — typically a single root orchestrator node",defaultValue:{value:"[]",computed:!1}},onNodeClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(node: OrchestratorNode) => void",signature:{arguments:[{type:{name:"OrchestratorNode"},name:"node"}],return:{name:"void"}}},description:"Called when the user clicks on an individual node"},selectedNodeId:{required:!1,tsType:{name:"string"},description:"The ID of the currently selected node"}}};const ke={title:"AX Components v1/OrchestratorView",component:x,tags:["autodocs"]},i={args:{nodes:k()}},p={name:"State: All Idle",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"idle",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"idle"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"idle"}]}]}},h={name:"State: Blocked Branch",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"working",currentTask:"Waiting on blocked sub-agent",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"completed"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"blocked",currentTask:"Awaiting API key from environment",children:[{id:"4",label:"Validator-3",role:"Validator",status:"idle"}]}]}]}},m={name:"State: Deep 3-Level Tree",args:{nodes:k()}},u={name:"State: Empty (No Nodes)",args:{nodes:[]}},_={name:"Prototype: Live Node Selection",render:()=>{const t=k(),[n,o]=y.useState();return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",fontFamily:"sans-serif"},children:[r.jsx(x,{nodes:t,selectedNodeId:n,onNodeClick:s=>o(d=>d===s.id?void 0:s.id)}),n&&r.jsxs("div",{style:{fontSize:"12px",color:"#6b7280",padding:"8px 12px",background:"#f9fafb",borderRadius:"6px",border:"1px solid #e5e7eb"},children:["Selected node: ",r.jsx("strong",{children:n}),r.jsx("button",{onClick:()=>o(void 0),style:{marginLeft:"8px",fontSize:"11px",cursor:"pointer",padding:"2px 8px",border:"1px solid #e5e7eb",borderRadius:"4px"},children:"Clear"})]})]})}},g={name:"Basic Usage",args:{nodes:[{id:"orch-1",label:"Orchestrator",role:"Orchestrator",status:"working",currentTask:"Delegating sub-tasks across 2 branches",children:[{id:"res-1",label:"Researcher",role:"Researcher",status:"working",currentTask:"Fetching competitor pricing data"},{id:"cw-1",label:"Code Writer",role:"Code Writer",status:"idle"}]}]}},b={name:"Production: Post-Run All Completed",args:{nodes:[{id:"1",label:"Orchestrator-Prime",role:"Orchestrator",status:"completed",children:[{id:"2",label:"Researcher-A",role:"Researcher",status:"completed"},{id:"3",label:"Code-Writer-1",role:"Code Writer",status:"completed",children:[{id:"4",label:"QA-Inspector",role:"QA Inspector",status:"completed"}]}]}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const xe=["Default","AllIdle","BlockedBranch","DeepTree","EmptySwarm","PrototypeWithSelection","BasicUsage","PostRunCompleted"];export{p as AllIdle,g as BasicUsage,h as BlockedBranch,m as DeepTree,i as Default,u as EmptySwarm,b as PostRunCompleted,_ as PrototypeWithSelection,xe as __namedExportsOrder,ke as default};
