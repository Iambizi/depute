import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-CS1FWmYW.js";import{l as c}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const h="_base_1rqb2_3",_="_header_1rqb2_13",v="_headerLeft_1rqb2_22",S="_title_1rqb2_28",w="_criticalBadge_1rqb2_34",j="_totalBadge_1rqb2_49",C="_empty_1rqb2_59",q="_emptyIcon_1rqb2_68",N="_list_1rqb2_79",P="_item_1rqb2_87",A="_itemCritical_1rqb2_115",T="_itemWarning_1rqb2_116",D="_itemInfo_1rqb2_117",k="_typeIcon_1rqb2_119",B="_itemContent_1rqb2_125",W="_itemHeader_1rqb2_133",M="_itemTitle_1rqb2_140",O="_itemTime_1rqb2_149",E="_itemMeta_1rqb2_155",$="_agentId_1rqb2_162",R="_branchPath_1rqb2_166",L="_itemDetail_1rqb2_170",z="_dismissBtn_1rqb2_178",n={base:h,header:_,headerLeft:v,title:S,criticalBadge:w,totalBadge:j,empty:C,emptyIcon:q,list:N,item:P,itemCritical:A,itemWarning:T,itemInfo:D,typeIcon:k,itemContent:B,itemHeader:W,itemTitle:M,itemTime:O,itemMeta:E,agentId:$,branchPath:R,itemDetail:L,dismissBtn:z},V={approval:"✋",escalation:"⚠",policy_violation:"⛔",stalled:"⏳",budget_overrun:"💸",conflict:"⚡"},H={critical:n.itemCritical,warning:n.itemWarning,info:n.itemInfo};function U({item:t,onOpen:s,onDismiss:i}){return e.jsxs("div",{className:`${n.item} ${H[t.severity]??""}`,role:s?"button":void 0,tabIndex:s?0:void 0,onClick:s?()=>s(t):void 0,onKeyDown:s?a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s(t))}:void 0,"aria-label":`${t.title} from ${t.agentId}, ${t.severity}`,children:[e.jsx("span",{className:n.typeIcon,"aria-hidden":"true",children:V[t.type]??"•"}),e.jsxs("div",{className:n.itemContent,children:[e.jsxs("div",{className:n.itemHeader,children:[e.jsx("span",{className:n.itemTitle,children:t.title}),e.jsx("span",{className:n.itemTime,children:t.timestamp})]}),e.jsxs("div",{className:n.itemMeta,children:[e.jsx("span",{className:n.agentId,children:t.agentId}),t.branchPath&&e.jsxs("span",{className:n.branchPath,children:["· ",t.branchPath]})]}),t.detail&&e.jsx("p",{className:n.itemDetail,children:t.detail})]}),i&&e.jsx("button",{className:n.dismissBtn,onClick:a=>{a.stopPropagation(),i(t.id)},"aria-label":`Dismiss: ${t.title}`,children:"✕"})]})}const x=({className:t,items:s=[],onOpenItem:i,onDismissItem:a})=>{const r=s.filter(o=>o.severity==="critical").length;return e.jsxs("div",{className:`${n.base} ${t||""}`,role:"region","aria-label":`Swarm Inbox, ${s.length} items${r>0?`, ${r} critical`:""}`,children:[e.jsxs("div",{className:n.header,children:[e.jsxs("div",{className:n.headerLeft,children:[e.jsx("span",{className:n.title,children:"Swarm Inbox"}),r>0&&e.jsxs("span",{className:n.criticalBadge,children:[r," critical"]})]}),e.jsx("span",{className:n.totalBadge,children:s.length})]}),s.length===0?e.jsxs("div",{className:n.empty,children:[e.jsx("span",{className:n.emptyIcon,children:"✓"}),e.jsx("p",{children:"No items requiring attention."})]}):e.jsx("div",{className:n.list,children:s.map(o=>e.jsx(U,{item:o,onOpen:i,onDismiss:a},o.id))})]})};x.__docgenInfo={description:`SwarmInbox is the attention-triage layer for the entire swarm.
Aggregates all events that deserve human attention into a single scannable list,
eliminating the need to ping-pong between OrchestratorView, AgentRoster, and traces.`,methods:[],displayName:"SwarmInbox",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},items:{required:!1,tsType:{name:"Array",elements:[{name:"SwarmInboxItem"}],raw:"SwarmInboxItem[]"},description:"",defaultValue:{value:"[]",computed:!1}},onOpenItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: SwarmInboxItem) => void",signature:{arguments:[{type:{name:"SwarmInboxItem"},name:"item"}],return:{name:"void"}}},description:""},onDismissItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const K={title:"AX Components v1/SwarmInbox",component:x,tags:["autodocs"]},m={args:{items:c(5)}},l={name:"State: All Critical",args:{items:c(4).map(t=>({...t,severity:"critical"}))}},d={name:"State: Mixed Severities",args:{items:[{id:"i1",type:"escalation",severity:"critical",title:"Agent failure escalated for review",agentId:"Code-Writer-1",branchPath:"root → Code Writer → Validator",timestamp:"just now"},{id:"i2",type:"budget_overrun",severity:"critical",title:"Token budget exceeded",agentId:"Data-Analyst",timestamp:"1m ago",detail:"Agent consumed 142% of its allocation (28,400 / 20,000 tokens)."},{id:"i3",type:"stalled",severity:"warning",title:"Agent stalled — no progress in 5 minutes",agentId:"Researcher-A",timestamp:"3m ago"},{id:"i4",type:"approval",severity:"warning",title:"Action requires your sign-off",agentId:"Orchestrator-Prime",timestamp:"5m ago"},{id:"i5",type:"conflict",severity:"info",title:"Output conflict detected between two agents",agentId:"Synthesizer-Z",timestamp:"8m ago",detail:"Code-Writer-1 and Code-Writer-2 produced conflicting implementations for auth.ts."}]}},p={name:"State: Empty Inbox",args:{items:[]}},g={name:"State: Large Inbox (10 Items)",args:{items:c(10)}},u={name:"Prototype: Dismissable Items",render:()=>{const[t,s]=y.useState(c(6)),i=a=>s(r=>r.filter(o=>o.id!==a));return e.jsx(x,{items:t,onDismissItem:i})}},b={name:"Prototype: Open Item (Inspect Panel Simulation)",render:()=>{const[t,s]=y.useState(c(5)),[i,a]=y.useState(null);return e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx("div",{style:{flex:"1"},children:e.jsx(x,{items:t,onOpenItem:a,onDismissItem:r=>s(o=>o.filter(f=>f.id!==r))})}),i&&e.jsxs("div",{style:{flex:"1",fontFamily:"sans-serif",fontSize:"12px",padding:"12px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:[e.jsx("strong",{style:{fontSize:"13px"},children:"Inspecting Item"}),e.jsx("pre",{style:{marginTop:"8px",whiteSpace:"pre-wrap",color:"#374151"},children:JSON.stringify(i,null,2)}),e.jsx("button",{onClick:()=>a(null),style:{marginTop:"8px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px"},children:"Close"})]})]})}},I={name:"Basic Usage",args:{items:[{id:"p1",type:"approval",severity:"warning",title:"Action requires your sign-off",agentId:"Orchestrator-Prime",timestamp:"2m ago"},{id:"p2",type:"escalation",severity:"critical",title:"Agent failure escalated for review",agentId:"Code-Writer-1",branchPath:"root → Code Writer",timestamp:"just now"}]}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};const X=["Default","AllCritical","MixedSeverities","EmptyInbox","LargeInbox","PrototypeDismissable","PrototypeOpenItem","BasicUsage"];export{l as AllCritical,I as BasicUsage,m as Default,p as EmptyInbox,g as LargeInbox,d as MixedSeverities,u as PrototypeDismissable,b as PrototypeOpenItem,X as __namedExportsOrder,K as default};
