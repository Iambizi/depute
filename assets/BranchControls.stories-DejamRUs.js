import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as f}from"./iframe-BRop0YAY.js";import"./preload-helper-PPVm8Dsz.js";const v="_base_1kxd3_3",S="_base_running_1kxd3_15",k="_base_paused_1kxd3_16",N="_base_quarantined_1kxd3_17",B="_header_1kxd3_20",P="_identity_1kxd3_29",C="_nameBlock_1kxd3_35",j="_label_1kxd3_40",q="_branchName_1kxd3_48",T="_dot_1kxd3_56",R="_dotRunning_1kxd3_63",Q="_dotPaused_1kxd3_64",L="_dotQuarantined_1kxd3_65",w="_dotPulsing_1kxd3_67",$="_bcPulse_1kxd3_1",D="_statusBadge_1kxd3_77",W="_badge_running_1kxd3_86",I="_badge_paused_1kxd3_87",E="_badge_quarantined_1kxd3_88",M="_actions_1kxd3_91",U="_btnPrimary_1kxd3_98",O="_btnSecondary_1kxd3_99",F="_btnWarning_1kxd3_100",z="_btnDanger_1kxd3_101",e={base:v,base_running:S,base_paused:k,base_quarantined:N,header:B,identity:P,nameBlock:C,label:j,branchName:q,dot:T,dotRunning:R,dotPaused:Q,dotQuarantined:L,dotPulsing:w,bcPulse:$,statusBadge:D,badge_running:W,badge_paused:I,badge_quarantined:E,actions:M,btnPrimary:U,btnSecondary:O,btnWarning:F,btnDanger:z},A={running:{label:"Running",dotClass:"dotRunning",pulsing:!0},paused:{label:"Paused",dotClass:"dotPaused",pulsing:!1},quarantined:{label:"Quarantined",dotClass:"dotQuarantined",pulsing:!1}},b=({className:t,branchName:r,status:a,onPause:_,onResume:s,onQuarantine:o,onCancel:i,onThrottle:y})=>{const x=A[a];return n.jsxs("div",{className:`${e.base} ${e[`base_${a}`]??""} ${t||""}`,role:"region","aria-label":`Branch controls for ${r}`,children:[n.jsxs("div",{className:e.header,children:[n.jsxs("div",{className:e.identity,children:[n.jsx("span",{className:`${e.dot} ${e[x.dotClass]??""} ${x.pulsing?e.dotPulsing:""}`,"aria-hidden":"true"}),n.jsxs("div",{className:e.nameBlock,children:[n.jsx("span",{className:e.label,children:"Branch"}),n.jsx("span",{className:e.branchName,children:r})]})]}),n.jsx("span",{className:`${e.statusBadge} ${e[`badge_${a}`]??""}`,children:x.label})]}),n.jsxs("div",{className:e.actions,children:[a==="running"?n.jsx("button",{className:e.btnSecondary,onClick:()=>_?.(),children:"⏸ Pause"}):n.jsx("button",{className:e.btnPrimary,onClick:()=>s?.(),children:"▶ Resume"}),a!=="quarantined"&&n.jsxs("button",{className:e.btnWarning,onClick:()=>o?.(),title:"Isolate branch: halt tool calls and spawns, allow inspection",style:{display:"inline-flex",alignItems:"center",gap:"6px"},children:[n.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),n.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),"Quarantine"]}),y&&n.jsx("button",{className:e.btnSecondary,onClick:y,title:"Reduce token burn rate and concurrency",children:"↓ Throttle"}),n.jsx("button",{className:e.btnDanger,onClick:()=>i?.(),children:"⊘ Cancel Branch"})]})]})};b.__docgenInfo={description:`BranchControls provides scoped steering mechanisms for a specific branch of the agent tree.
Complements the global RunControls from v0 — operates at branch/sub-tree level.`,methods:[],displayName:"BranchControls",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},branchName:{required:!0,tsType:{name:"string"},description:""},status:{required:!0,tsType:{name:"union",raw:"'running' | 'paused' | 'quarantined'",elements:[{name:"literal",value:"'running'"},{name:"literal",value:"'paused'"},{name:"literal",value:"'quarantined'"}]},description:""},onPause:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onResume:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onQuarantine:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onThrottle:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const H={title:"AX Components v1/BranchControls",component:b,tags:["autodocs"],argTypes:{status:{control:"select",options:["running","paused","quarantined"]},branchName:{control:"text"}}},d={args:{branchName:"branch-auth-3a",status:"running"}},c={name:"State: Running",args:{branchName:"branch-research-7f",status:"running"}},u={name:"State: Paused",args:{branchName:"branch-auth-3a",status:"paused"}},l={name:"State: Quarantined",args:{branchName:"branch-payments-2b",status:"quarantined"}},m={name:"State: Running with Throttle Option",args:{branchName:"branch-data-9c",status:"running",onThrottle:void 0}},g={name:"Prototype: Interactive Status Transitions",render:()=>{const[t,r]=f.useState("running"),[a,_]=f.useState([]),s=o=>_(i=>[o,...i].slice(0,5));return n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[n.jsx(b,{branchName:"branch-auth-3a",status:t,onPause:()=>{r("paused"),s("⏸ Branch paused")},onResume:()=>{r("running"),s("▶ Branch resumed")},onQuarantine:()=>{r("quarantined"),s("Quarantined: Branch isolated")},onThrottle:()=>s("↓ Throttle applied"),onCancel:()=>s("⊘ Branch cancelled")}),a.length>0&&n.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"11px",padding:"8px 12px",background:"#f9fafb",borderRadius:"6px",border:"1px solid #e5e7eb",color:"#374151"},children:[n.jsx("strong",{children:"Event Log"}),a.map((o,i)=>n.jsx("div",{children:o},i))]})]})}},p={name:"Basic Usage",args:{branchName:"branch-auth-refactor-3a",status:"running",onPause:void 0,onResume:void 0,onQuarantine:void 0,onCancel:void 0}},h={name:"Production: Multiple Branches Side by Side",render:()=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:["running","paused","quarantined"].map(t=>n.jsx(b,{branchName:`branch-${t}-x7`,status:t,onPause:()=>{},onResume:()=>{},onQuarantine:()=>{},onCancel:()=>{}},t))})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    branchName: 'branch-auth-3a',
    status: 'running'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'State: Running',
  args: {
    branchName: 'branch-research-7f',
    status: 'running'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Paused',
  args: {
    branchName: 'branch-auth-3a',
    status: 'paused'
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: Quarantined',
  args: {
    branchName: 'branch-payments-2b',
    status: 'quarantined'
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Running with Throttle Option',
  args: {
    branchName: 'branch-data-9c',
    status: 'running',
    onThrottle: undefined
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Interactive Status Transitions',
  render: () => {
    const [status, setStatus] = useState<'running' | 'paused' | 'quarantined'>('running');
    const [log, setLog] = useState<string[]>([]);
    const addLog = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 5));
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
        <BranchControls branchName="branch-auth-3a" status={status} onPause={() => {
        setStatus('paused');
        addLog('⏸ Branch paused');
      }} onResume={() => {
        setStatus('running');
        addLog('▶ Branch resumed');
      }} onQuarantine={() => {
        setStatus('quarantined');
        addLog('Quarantined: Branch isolated');
      }} onThrottle={() => addLog('↓ Throttle applied')} onCancel={() => addLog('⊘ Branch cancelled')} />
        {log.length > 0 && <div style={{
        fontFamily: 'sans-serif',
        fontSize: '11px',
        padding: '8px 12px',
        background: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        color: '#374151'
      }}>
            <strong>Event Log</strong>
            {log.map((l, i) => <div key={i}>{l}</div>)}
          </div>}
      </div>;
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    branchName: 'branch-auth-refactor-3a',
    status: 'running',
    onPause: undefined,
    onResume: undefined,
    onQuarantine: undefined,
    onCancel: undefined
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Production: Multiple Branches Side by Side',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }}>
      {(['running', 'paused', 'quarantined'] as const).map(s => <BranchControls key={s} branchName={\`branch-\${s}-x7\`} status={s} onPause={() => {}} onResume={() => {}} onQuarantine={() => {}} onCancel={() => {}} />)}
    </div>
}`,...h.parameters?.docs?.source}}};const J=["Default","StateRunning","StatePaused","StateQuarantined","WithThrottle","PrototypeStatusCycle","BasicUsage","MultipleBranches"];export{p as BasicUsage,d as Default,h as MultipleBranches,g as PrototypeStatusCycle,u as StatePaused,l as StateQuarantined,c as StateRunning,m as WithThrottle,J as __namedExportsOrder,H as default};
