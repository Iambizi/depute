import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as A}from"./iframe-DLl0a6ph.js";import{g as c}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const y="_base_15ci4_3",w="_header_15ci4_15",x="_title_15ci4_26",f="_summary_15ci4_32",S="_pill_15ci4_38",v="_pillWorking_15ci4_47",N="_pillBlocked_15ci4_48",b="_pillFailed_15ci4_49",j="_pillIdle_15ci4_50",R="_pillCompleted_15ci4_51",T="_empty_15ci4_54",C="_tableWrapper_15ci4_62",I="_table_15ci4_62",W="_headRow_15ci4_74",$="_headCell_15ci4_78",E="_row_15ci4_106",F="_rowClickable_15ci4_116",M="_rowSelected_15ci4_129",U="_cellStatus_15ci4_134",P="_cellName_15ci4_139",B="_cellTask_15ci4_144",D="_cellMeta_15ci4_149",L="_dot_15ci4_156",O="_dotIdle_15ci4_163",V="_dotWorking_15ci4_164",q="_dotBlocked_15ci4_165",Q="_dotFailed_15ci4_166",z="_dotCompleted_15ci4_167",K="_dotPulsing_15ci4_169",X="_agentName_15ci4_179",G="_agentRole_15ci4_185",H="_taskText_15ci4_195",J="_taskEmpty_15ci4_205",Y="_metaEmpty_15ci4_206",Z="_metaValue_15ci4_210",e={base:y,header:w,title:x,summary:f,pill:S,pillWorking:v,pillBlocked:N,pillFailed:b,pillIdle:j,pillCompleted:R,empty:T,tableWrapper:C,table:I,headRow:W,headCell:$,row:E,rowClickable:F,rowSelected:M,cellStatus:U,cellName:P,cellTask:B,cellMeta:D,dot:L,dotIdle:O,dotWorking:V,dotBlocked:q,dotFailed:Q,dotCompleted:z,dotPulsing:K,agentName:X,agentRole:G,taskText:H,taskEmpty:J,metaEmpty:Y,metaValue:Z},ee={idle:e.dotIdle,working:e.dotWorking,blocked:e.dotBlocked,failed:e.dotFailed,completed:e.dotCompleted},te={idle:"Idle",working:"Working",blocked:"Blocked",failed:"Failed",completed:"Done"};function se({agent:s,isSelected:n,onSelect:o}){const l=!!o,r=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),o?.(s))};return t.jsxs("tr",{className:`${e.row} ${n?e.rowSelected:""} ${l?e.rowClickable:""}`,onClick:l?()=>o?.(s):void 0,onKeyDown:l?r:void 0,role:l?"button":"row",tabIndex:l?0:void 0,"aria-selected":l?n:void 0,"aria-label":`${s.name}, ${s.role}, ${te[s.status]??s.status}`,children:[t.jsx("td",{className:e.cellStatus,children:t.jsx("span",{className:`${e.dot} ${ee[s.status]??""} ${s.status==="working"?e.dotPulsing:""}`,"aria-hidden":"true"})}),t.jsxs("td",{className:e.cellName,children:[t.jsx("span",{className:e.agentName,children:s.name}),t.jsx("span",{className:e.agentRole,children:s.role})]}),t.jsx("td",{className:e.cellTask,children:s.currentTask?t.jsx("span",{className:e.taskText,title:s.currentTask,children:s.currentTask}):t.jsx("span",{className:e.taskEmpty,children:"—"})}),t.jsx("td",{className:e.cellMeta,children:s.tokensUsed!=null?t.jsx("span",{className:e.metaValue,children:s.tokensUsed.toLocaleString()}):t.jsx("span",{className:e.metaEmpty,children:"—"})}),t.jsx("td",{className:e.cellMeta,children:t.jsx("span",{className:e.metaValue,children:s.lastActive??"—"})})]})}const h=({className:s,agents:n=[],onAgentSelect:o,selectedAgentId:l})=>{const r={idle:n.filter(a=>a.status==="idle").length,working:n.filter(a=>a.status==="working").length,blocked:n.filter(a=>a.status==="blocked").length,failed:n.filter(a=>a.status==="failed").length,completed:n.filter(a=>a.status==="completed").length};return t.jsxs("div",{className:`${e.base} ${s||""}`,role:"region","aria-label":"Agent Roster",children:[t.jsxs("div",{className:e.header,children:[t.jsx("span",{className:e.title,children:"Agent Roster"}),t.jsxs("div",{className:e.summary,children:[r.working>0&&t.jsxs("span",{className:`${e.pill} ${e.pillWorking}`,children:[r.working," working"]}),r.blocked>0&&t.jsxs("span",{className:`${e.pill} ${e.pillBlocked}`,children:[r.blocked," blocked"]}),r.failed>0&&t.jsxs("span",{className:`${e.pill} ${e.pillFailed}`,children:[r.failed," failed"]}),r.idle>0&&t.jsxs("span",{className:`${e.pill} ${e.pillIdle}`,children:[r.idle," idle"]}),r.completed>0&&t.jsxs("span",{className:`${e.pill} ${e.pillCompleted}`,children:[r.completed," done"]})]})]}),n.length===0?t.jsx("div",{className:e.empty,children:"No agents in roster."}):t.jsx("div",{className:e.tableWrapper,children:t.jsxs("table",{className:e.table,role:"grid","aria-label":"Agent list",children:[t.jsx("thead",{children:t.jsxs("tr",{className:e.headRow,children:[t.jsx("th",{className:e.headCell,scope:"col","aria-label":"Status"}),t.jsx("th",{className:e.headCell,scope:"col",children:"Agent"}),t.jsx("th",{className:e.headCell,scope:"col",children:"Current Task"}),t.jsx("th",{className:e.headCell,scope:"col",children:"Tokens"}),t.jsx("th",{className:e.headCell,scope:"col",children:"Last Active"})]})}),t.jsx("tbody",{children:n.map(a=>t.jsx(se,{agent:a,isSelected:a.id===l,onSelect:o},a.id))})]})})]})};h.__docgenInfo={description:`AgentRoster renders a dense table view for scanning status across many concurrent workers.
Designed for flat swarms (Figure 7) where you need operational overview rather than hierarchy.`,methods:[],displayName:"AgentRoster",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},agents:{required:!1,tsType:{name:"Array",elements:[{name:"AgentRosterItem"}],raw:"AgentRosterItem[]"},description:"List of agents in the swarm",defaultValue:{value:"[]",computed:!1}},onAgentSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(agent: AgentRosterItem) => void",signature:{arguments:[{type:{name:"AgentRosterItem"},name:"agent"}],return:{name:"void"}}},description:"Callback when an agent row is clicked/selected"},selectedAgentId:{required:!1,tsType:{name:"string"},description:"The currently selected agent's ID"}}};const oe={title:"AX Components v1/AgentRoster",component:h,tags:["autodocs"]},i={args:{agents:c(6)}},d={name:"State: All Working",args:{agents:c(5).map(s=>({...s,status:"working",currentTask:"Processing assigned sub-task"}))}},m={name:"State: One Agent Failed",args:{agents:c(4).map((s,n)=>n===2?{...s,status:"failed",currentTask:"Crashed: timeout on tool call"}:s)}},p={name:"State: Large Swarm (12 Agents)",args:{agents:c(12)}},g={name:"State: Post-Run All Completed",args:{agents:c(5).map(s=>({...s,status:"completed",currentTask:void 0}))}},u={name:"State: Empty Roster",args:{agents:[]}},_={name:"Prototype: Simulated Live Status Updates",render:()=>{const[s,n]=A.useState(c(6)),o=["working","idle","blocked","completed"];return A.useEffect(()=>{const l=setInterval(()=>{n(r=>r.map(a=>Math.random()>.6?{...a,status:o[Math.floor(Math.random()*o.length)]}:a))},1800);return()=>clearInterval(l)},[]),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[t.jsx("p",{style:{fontFamily:"sans-serif",fontSize:"12px",color:"#6b7280",margin:0},children:"Agent statuses cycle every ~1.8s to simulate live swarm activity."}),t.jsx(h,{agents:s})]})}},k={name:"Basic Usage",args:{agents:[{id:"a1",name:"Orchestrator-Prime",role:"Orchestrator",status:"working",currentTask:"Delegating tasks across branches",tokensUsed:4200,lastActive:"2m ago"},{id:"a2",name:"Researcher-A",role:"Researcher",status:"working",currentTask:"Fetching API documentation",tokensUsed:8100,lastActive:"just now"},{id:"a3",name:"Code-Writer-1",role:"Code Writer",status:"idle",tokensUsed:1200,lastActive:"5m ago"},{id:"a4",name:"QA-Inspector",role:"QA Inspector",status:"completed",tokensUsed:6300,lastActive:"1m ago"}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    agents: generateMockAgentRoster(6)
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'State: All Working',
  args: {
    agents: generateMockAgentRoster(5).map(a => ({
      ...a,
      status: 'working' as AgentStatus,
      currentTask: 'Processing assigned sub-task'
    }))
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: One Agent Failed',
  args: {
    agents: generateMockAgentRoster(4).map((a, i) => i === 2 ? {
      ...a,
      status: 'failed' as AgentStatus,
      currentTask: 'Crashed: timeout on tool call'
    } : a)
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: Large Swarm (12 Agents)',
  args: {
    agents: generateMockAgentRoster(12)
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Post-Run All Completed',
  args: {
    agents: generateMockAgentRoster(5).map(a => ({
      ...a,
      status: 'completed' as AgentStatus,
      currentTask: undefined
    }))
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty Roster',
  args: {
    agents: []
  }
}`,...u.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Simulated Live Status Updates',
  render: () => {
    const [agents, setAgents] = useState<AgentRosterItem[]>(generateMockAgentRoster(6));
    const statuses: AgentStatus[] = ['working', 'idle', 'blocked', 'completed'];
    useEffect(() => {
      const interval = setInterval(() => {
        setAgents(prev => prev.map(a => Math.random() > 0.6 ? {
          ...a,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        } : a));
      }, 1800);
      return () => clearInterval(interval);
    }, []);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
        <p style={{
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#6b7280',
        margin: 0
      }}>
          Agent statuses cycle every ~1.8s to simulate live swarm activity.
        </p>
        <AgentRoster agents={agents} />
      </div>;
  }
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    agents: [{
      id: 'a1',
      name: 'Orchestrator-Prime',
      role: 'Orchestrator',
      status: 'working',
      currentTask: 'Delegating tasks across branches',
      tokensUsed: 4200,
      lastActive: '2m ago'
    }, {
      id: 'a2',
      name: 'Researcher-A',
      role: 'Researcher',
      status: 'working',
      currentTask: 'Fetching API documentation',
      tokensUsed: 8100,
      lastActive: 'just now'
    }, {
      id: 'a3',
      name: 'Code-Writer-1',
      role: 'Code Writer',
      status: 'idle',
      tokensUsed: 1200,
      lastActive: '5m ago'
    }, {
      id: 'a4',
      name: 'QA-Inspector',
      role: 'QA Inspector',
      status: 'completed',
      tokensUsed: 6300,
      lastActive: '1m ago'
    }] satisfies AgentRosterItem[]
  }
}`,...k.parameters?.docs?.source}}};const ce=["Default","AllWorking","WithFailure","LargeSwarm","AllCompleted","EmptyRoster","SimulateLiveStatuses","BasicUsage"];export{g as AllCompleted,d as AllWorking,k as BasicUsage,i as Default,u as EmptyRoster,p as LargeSwarm,_ as SimulateLiveStatuses,m as WithFailure,ce as __namedExportsOrder,oe as default};
