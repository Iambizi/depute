import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-DLl0a6ph.js";import{l as c}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const f="_base_b9hsq_3",_="_header_b9hsq_13",v="_headerLeft_b9hsq_22",S="_title_b9hsq_28",w="_criticalBadge_b9hsq_34",j="_totalBadge_b9hsq_49",C="_empty_b9hsq_59",q="_emptyIcon_b9hsq_68",k="_list_b9hsq_79",A="_item_b9hsq_87",N="_itemCritical_b9hsq_115",P="_itemWarning_b9hsq_116",D="_itemInfo_b9hsq_117",T="_typeIcon_b9hsq_119",B="_itemContent_b9hsq_125",W="_itemHeader_b9hsq_133",M="_itemTitle_b9hsq_140",L="_itemTime_b9hsq_149",O="_itemMeta_b9hsq_155",$="_agentId_b9hsq_162",E="_branchPath_b9hsq_166",R="_itemDetail_b9hsq_170",z="_dismissBtn_b9hsq_178",n={base:f,header:_,headerLeft:v,title:S,criticalBadge:w,totalBadge:j,empty:C,emptyIcon:q,list:k,item:A,itemCritical:N,itemWarning:P,itemInfo:D,typeIcon:T,itemContent:B,itemHeader:W,itemTitle:M,itemTime:L,itemMeta:O,agentId:$,branchPath:E,itemDetail:R,dismissBtn:z},V={critical:n.itemCritical,warning:n.itemWarning,info:n.itemInfo};function H({item:t,onOpen:s,onDismiss:a}){return e.jsxs("div",{className:`${n.item} ${V[t.severity]??""}`,role:s?"button":void 0,tabIndex:s?0:void 0,onClick:s?()=>s(t):void 0,onKeyDown:s?i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(t))}:void 0,"aria-label":`${t.title} from ${t.agentId}, ${t.severity}`,children:[e.jsx("span",{className:n.typeIcon,"aria-hidden":"true",children:t.icon??"•"}),e.jsxs("div",{className:n.itemContent,children:[e.jsxs("div",{className:n.itemHeader,children:[e.jsx("span",{className:n.itemTitle,children:t.title}),e.jsx("span",{className:n.itemTime,children:t.timestamp})]}),e.jsxs("div",{className:n.itemMeta,children:[e.jsx("span",{className:n.agentId,children:t.agentId}),t.branchPath&&e.jsxs("span",{className:n.branchPath,children:["· ",t.branchPath]})]}),t.detail&&e.jsx("p",{className:n.itemDetail,children:t.detail})]}),a&&e.jsx("button",{className:n.dismissBtn,onClick:i=>{i.stopPropagation(),a(t.id)},"aria-label":`Dismiss: ${t.title}`,children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}const b=({className:t,items:s=[],onOpenItem:a,onDismissItem:i})=>{const r=s.filter(o=>o.severity==="critical").length;return e.jsxs("div",{className:`${n.base} ${t||""}`,role:"region","aria-label":`Swarm Inbox, ${s.length} items${r>0?`, ${r} critical`:""}`,children:[e.jsxs("div",{className:n.header,children:[e.jsxs("div",{className:n.headerLeft,children:[e.jsx("span",{className:n.title,children:"Swarm Inbox"}),r>0&&e.jsxs("span",{className:n.criticalBadge,children:[r," critical"]})]}),e.jsx("span",{className:n.totalBadge,children:s.length})]}),s.length===0?e.jsxs("div",{className:n.empty,children:[e.jsx("span",{className:n.emptyIcon,children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})}),e.jsx("p",{children:"No items requiring attention."})]}):e.jsx("div",{className:n.list,children:s.map(o=>e.jsx(H,{item:o,onOpen:a,onDismiss:i},o.id))})]})};b.__docgenInfo={description:`SwarmInbox is the attention-triage layer for the entire swarm.
Aggregates all events that deserve human attention into a single scannable list,
eliminating the need to ping-pong between OrchestratorView, AgentRoster, and traces.`,methods:[],displayName:"SwarmInbox",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},items:{required:!1,tsType:{name:"Array",elements:[{name:"SwarmInboxItem"}],raw:"SwarmInboxItem[]"},description:"",defaultValue:{value:"[]",computed:!1}},onOpenItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: SwarmInboxItem) => void",signature:{arguments:[{type:{name:"SwarmInboxItem"},name:"item"}],return:{name:"void"}}},description:""},onDismissItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const K={title:"AX Components v1/SwarmInbox",component:b,tags:["autodocs"]},m={args:{items:c(5)}},l={name:"State: All Critical",args:{items:c(4).map(t=>({...t,severity:"critical"}))}},d={name:"State: Mixed Severities",args:{items:[{id:"i1",type:"escalation",severity:"critical",title:"Agent failure escalated for review",agentId:"Code-Writer-1",branchPath:"root → Code Writer → Validator",timestamp:"just now"},{id:"i2",type:"budget_overrun",severity:"critical",title:"Token budget exceeded",agentId:"Data-Analyst",timestamp:"1m ago",detail:"Agent consumed 142% of its allocation (28,400 / 20,000 tokens)."},{id:"i3",type:"stalled",severity:"warning",title:"Agent stalled — no progress in 5 minutes",agentId:"Researcher-A",timestamp:"3m ago"},{id:"i4",type:"approval",severity:"warning",title:"Action requires your sign-off",agentId:"Orchestrator-Prime",timestamp:"5m ago"},{id:"i5",type:"conflict",severity:"info",title:"Output conflict detected between two agents",agentId:"Synthesizer-Z",timestamp:"8m ago",detail:"Code-Writer-1 and Code-Writer-2 produced conflicting implementations for auth.ts."}]}},p={name:"State: Empty Inbox",args:{items:[]}},g={name:"State: Large Inbox (10 Items)",args:{items:c(10)}},u={name:"Prototype: Dismissable Items",render:()=>{const[t,s]=y.useState(c(6)),a=i=>s(r=>r.filter(o=>o.id!==i));return e.jsx(b,{items:t,onDismissItem:a})}},x={name:"Prototype: Open Item (Inspect Panel Simulation)",render:()=>{const[t,s]=y.useState(c(5)),[a,i]=y.useState(null);return e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx("div",{style:{flex:"1"},children:e.jsx(b,{items:t,onOpenItem:i,onDismissItem:r=>s(o=>o.filter(I=>I.id!==r))})}),a&&e.jsxs("div",{style:{flex:"1",fontFamily:"sans-serif",fontSize:"12px",padding:"12px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:[e.jsx("strong",{style:{fontSize:"13px"},children:"Inspecting Item"}),e.jsx("pre",{style:{marginTop:"8px",whiteSpace:"pre-wrap",color:"#374151"},children:JSON.stringify(a,null,2)}),e.jsx("button",{onClick:()=>i(null),style:{marginTop:"8px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px"},children:"Close"})]})]})}},h={name:"Basic Usage",args:{items:[{id:"p1",type:"approval",severity:"warning",title:"Action requires your sign-off",agentId:"Orchestrator-Prime",timestamp:"2m ago"},{id:"p2",type:"escalation",severity:"critical",title:"Agent failure escalated for review",agentId:"Code-Writer-1",branchPath:"root → Code Writer",timestamp:"just now"}]}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: generateMockSwarmInbox(5)
  }
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: All Critical',
  args: {
    items: generateMockSwarmInbox(4).map(i => ({
      ...i,
      severity: 'critical' as const
    }))
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'State: Mixed Severities',
  args: {
    items: [{
      id: 'i1',
      type: 'escalation',
      severity: 'critical',
      title: 'Agent failure escalated for review',
      agentId: 'Code-Writer-1',
      branchPath: 'root → Code Writer → Validator',
      timestamp: 'just now'
    }, {
      id: 'i2',
      type: 'budget_overrun',
      severity: 'critical',
      title: 'Token budget exceeded',
      agentId: 'Data-Analyst',
      timestamp: '1m ago',
      detail: 'Agent consumed 142% of its allocation (28,400 / 20,000 tokens).'
    }, {
      id: 'i3',
      type: 'stalled',
      severity: 'warning',
      title: 'Agent stalled — no progress in 5 minutes',
      agentId: 'Researcher-A',
      timestamp: '3m ago'
    }, {
      id: 'i4',
      type: 'approval',
      severity: 'warning',
      title: 'Action requires your sign-off',
      agentId: 'Orchestrator-Prime',
      timestamp: '5m ago'
    }, {
      id: 'i5',
      type: 'conflict',
      severity: 'info',
      title: 'Output conflict detected between two agents',
      agentId: 'Synthesizer-Z',
      timestamp: '8m ago',
      detail: 'Code-Writer-1 and Code-Writer-2 produced conflicting implementations for auth.ts.'
    }] satisfies SwarmInboxItem[]
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty Inbox',
  args: {
    items: []
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Large Inbox (10 Items)',
  args: {
    items: generateMockSwarmInbox(10)
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Dismissable Items',
  render: () => {
    const [items, setItems] = useState<SwarmInboxItem[]>(generateMockSwarmInbox(6));
    const dismiss = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    return <SwarmInbox items={items} onDismissItem={dismiss} />;
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Open Item (Inspect Panel Simulation)',
  render: () => {
    const [items, setItems] = useState<SwarmInboxItem[]>(generateMockSwarmInbox(5));
    const [selected, setSelected] = useState<SwarmInboxItem | null>(null);
    return <div style={{
      display: 'flex',
      gap: '16px'
    }}>
        <div style={{
        flex: '1'
      }}>
          <SwarmInbox items={items} onOpenItem={setSelected} onDismissItem={id => setItems(p => p.filter(i => i.id !== id))} />
        </div>
        {selected && <div style={{
        flex: '1',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        padding: '12px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
            <strong style={{
          fontSize: '13px'
        }}>Inspecting Item</strong>
            <pre style={{
          marginTop: '8px',
          whiteSpace: 'pre-wrap',
          color: '#374151'
        }}>{JSON.stringify(selected, null, 2)}</pre>
            <button onClick={() => setSelected(null)} style={{
          marginTop: '8px',
          cursor: 'pointer',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px'
        }}>Close</button>
          </div>}
      </div>;
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    items: [{
      id: 'p1',
      type: 'approval',
      severity: 'warning',
      title: 'Action requires your sign-off',
      agentId: 'Orchestrator-Prime',
      timestamp: '2m ago'
    }, {
      id: 'p2',
      type: 'escalation',
      severity: 'critical',
      title: 'Agent failure escalated for review',
      agentId: 'Code-Writer-1',
      branchPath: 'root → Code Writer',
      timestamp: 'just now'
    }] satisfies SwarmInboxItem[]
  }
}`,...h.parameters?.docs?.source}}};const X=["Default","AllCritical","MixedSeverities","EmptyInbox","LargeInbox","PrototypeDismissable","PrototypeOpenItem","BasicUsage"];export{l as AllCritical,h as BasicUsage,m as Default,p as EmptyInbox,g as LargeInbox,d as MixedSeverities,u as PrototypeDismissable,x as PrototypeOpenItem,X as __namedExportsOrder,K as default};
