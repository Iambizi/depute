import{j as a,r as v}from"./iframe-B9939OLV.js";import{j as n}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const y="_base_11k1q_1",b="_header_11k1q_11",S="_scopeTabs_11k1q_27",k="_tab_11k1q_34",x="_active_11k1q_50",f="_list_11k1q_56",C="_empty_11k1q_65",L="_entry_11k1q_73",q="_conflict_11k1q_86",j="_entryHeader_11k1q_93",N="_keyWrapper_11k1q_99",A="_typeTag_11k1q_105",B="_fact_11k1q_114",T="_decision_11k1q_115",w="_constraint_11k1q_116",E="_artifact_11k1q_117",W="_key_11k1q_99",$="_conflictBadge_11k1q_126",M="_valueBox_11k1q_135",P="_provenance_11k1q_154",G="_provLabel_11k1q_163",R="_author_11k1q_169",F="_divider_11k1q_175",H="_source_11k1q_179",U="_timestamp_11k1q_185",e={base:y,header:b,scopeTabs:S,tab:k,active:x,list:f,empty:C,entry:L,conflict:q,entryHeader:j,keyWrapper:N,typeTag:A,fact:B,decision:T,constraint:w,artifact:E,key:W,conflictBadge:$,valueBox:M,provenance:P,provLabel:G,author:R,divider:F,source:H,timestamp:U},_=({className:r,entries:o=[],currentScope:s="global",onFilterContext:h})=>a.jsxs("div",{className:`${e.base} ${r||""}`,children:[a.jsxs("div",{className:e.header,children:[a.jsx("h3",{children:"Shared Context Ledger"}),a.jsxs("div",{className:e.scopeTabs,children:[a.jsx("button",{className:`${e.tab} ${s==="global"?e.active:""}`,onClick:()=>h?.("global"),children:"Global"}),a.jsx("button",{className:`${e.tab} ${s==="branch"?e.active:""}`,onClick:()=>h?.("branch"),children:"Branch"}),a.jsx("button",{className:`${e.tab} ${s==="agent-local"?e.active:""}`,onClick:()=>h?.("agent-local"),children:"Local"})]})]}),a.jsx("div",{className:e.list,children:o.length===0?a.jsx("div",{className:e.empty,children:"No context entries found in this scope."}):o.map(t=>a.jsxs("div",{className:`${e.entry} ${t.conflict?e.conflict:""}`,children:[a.jsxs("div",{className:e.entryHeader,children:[a.jsxs("div",{className:e.keyWrapper,children:[a.jsx("span",{className:`${e.typeTag} ${e[t.type]}`,children:t.type}),a.jsx("span",{className:e.key,children:t.key})]}),t.conflict&&a.jsx("span",{className:e.conflictBadge,children:"Conflict Detected"})]}),a.jsx("div",{className:e.valueBox,children:a.jsx("code",{children:t.value})}),a.jsxs("div",{className:e.provenance,children:[a.jsx("span",{className:e.provLabel,children:"Provenance:"}),a.jsx("span",{className:e.author,children:t.provenance.authorAgent}),t.provenance.source&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:e.divider,children:"→"}),a.jsx("span",{className:e.source,children:t.provenance.source})]}),a.jsx("span",{className:e.timestamp,children:t.provenance.timestamp})]})]},t.id))})]});_.__docgenInfo={description:"SharedContextLedger is the read-only control surface for shared memory and data synchronization across the swarm.",methods:[],displayName:"SharedContextLedger",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},entries:{required:!1,tsType:{name:"Array",elements:[{name:"ContextLedgerEntry"}],raw:"ContextLedgerEntry[]"},description:"",defaultValue:{value:"[]",computed:!1}},currentScope:{required:!1,tsType:{name:"union",raw:"'global' | 'branch' | 'agent-local'",elements:[{name:"literal",value:"'global'"},{name:"literal",value:"'branch'"},{name:"literal",value:"'agent-local'"}]},description:"",defaultValue:{value:"'global'",computed:!1}},onFilterContext:{required:!1,tsType:{name:"signature",type:"function",raw:"(scope: 'global' | 'branch' | 'agent-local') => void",signature:{arguments:[{type:{name:"union",raw:"'global' | 'branch' | 'agent-local'",elements:[{name:"literal",value:"'global'"},{name:"literal",value:"'branch'"},{name:"literal",value:"'agent-local'"}]},name:"scope"}],return:{name:"void"}}},description:""}}};const V={title:"AX Components v1/SharedContextLedger",component:_,tags:["autodocs"],argTypes:{currentScope:{control:"select",options:["global","branch","agent-local"]}}},c={args:n()},i={name:"State: Scoped to Global",args:n({currentScope:"global"})},l={name:"State: Scoped to Branch",args:n({currentScope:"branch"})},p={name:"State: Scoped to Agent-Local",args:n({currentScope:"agent-local"})},d={name:"State: With Conflicts",args:n({entries:n().entries?.map((r,o)=>o<2?{...r,conflict:!0}:r)})},m={name:"State: Empty Ledger",args:{entries:[]}},g={name:"Prototype: Scope Filter Switching",render:()=>{const[r,o]=v.useState("branch"),s=n();return a.jsx(_,{...s,currentScope:r,onFilterContext:o})}},u={name:"Basic Usage",args:{currentScope:"branch",entries:[{id:"e1",scope:"global",type:"decision",key:"primary_goal",value:"Refactor authentication layer to use JWTs",provenance:{authorAgent:"Orchestrator-Prime",timestamp:"12m ago"}},{id:"e2",scope:"branch",type:"constraint",key:"user_constraints",value:"Must stay under 8k tokens per sub-agent",provenance:{authorAgent:"Planner-Beta",timestamp:"10m ago"}},{id:"e3",scope:"branch",type:"fact",key:"active_hypothesis",value:"Errors are concentrated in the cache invalidation layer",provenance:{authorAgent:"Researcher-A",source:"Code review analysis",timestamp:"5m ago"},conflict:!0},{id:"e4",scope:"agent-local",type:"decision",key:"previously_tried",value:"Approach via regex failed — switching to AST parsing",provenance:{authorAgent:"Code-Writer-1",timestamp:"2m ago"}}]}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: generateMockContextLedger()
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'State: Scoped to Global',
  args: generateMockContextLedger({
    currentScope: 'global'
  })
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: Scoped to Branch',
  args: generateMockContextLedger({
    currentScope: 'branch'
  })
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: Scoped to Agent-Local',
  args: generateMockContextLedger({
    currentScope: 'agent-local'
  })
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'State: With Conflicts',
  args: generateMockContextLedger({
    entries: generateMockContextLedger().entries?.map((e, i) => i < 2 ? {
      ...e,
      conflict: true
    } : e)
  })
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty Ledger',
  args: {
    entries: []
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Scope Filter Switching',
  render: () => {
    const [scope, setScope] = useState<'global' | 'branch' | 'agent-local'>('branch');
    const data = generateMockContextLedger();
    return <SharedContextLedger {...data} currentScope={scope} onFilterContext={setScope} />;
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    currentScope: 'branch',
    entries: [{
      id: 'e1',
      scope: 'global',
      type: 'decision',
      key: 'primary_goal',
      value: 'Refactor authentication layer to use JWTs',
      provenance: {
        authorAgent: 'Orchestrator-Prime',
        timestamp: '12m ago'
      }
    }, {
      id: 'e2',
      scope: 'branch',
      type: 'constraint',
      key: 'user_constraints',
      value: 'Must stay under 8k tokens per sub-agent',
      provenance: {
        authorAgent: 'Planner-Beta',
        timestamp: '10m ago'
      }
    }, {
      id: 'e3',
      scope: 'branch',
      type: 'fact',
      key: 'active_hypothesis',
      value: 'Errors are concentrated in the cache invalidation layer',
      provenance: {
        authorAgent: 'Researcher-A',
        source: 'Code review analysis',
        timestamp: '5m ago'
      },
      conflict: true
    }, {
      id: 'e4',
      scope: 'agent-local',
      type: 'decision',
      key: 'previously_tried',
      value: 'Approach via regex failed — switching to AST parsing',
      provenance: {
        authorAgent: 'Code-Writer-1',
        timestamp: '2m ago'
      }
    }] satisfies ContextLedgerEntry[]
  }
}`,...u.parameters?.docs?.source}}};const z=["Default","GlobalScope","BranchScope","AgentLocalScope","WithConflicts","EmptyLedger","PrototypeScopeSwitching","BasicUsage"];export{p as AgentLocalScope,u as BasicUsage,l as BranchScope,c as Default,m as EmptyLedger,i as GlobalScope,g as PrototypeScopeSwitching,d as WithConflicts,z as __namedExportsOrder,V as default};
