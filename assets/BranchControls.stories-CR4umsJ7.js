import{j as n,r as x}from"./iframe-D3fIoj3q.js";import"./preload-helper-PPVm8Dsz.js";const S="_base_y61s0_3",v="_base_running_y61s0_15",N="_base_paused_y61s0_16",P="_base_quarantined_y61s0_17",B="_header_y61s0_20",C="_identity_y61s0_29",q="_nameBlock_y61s0_35",T="_label_y61s0_40",R="_branchName_y61s0_48",j="_dot_y61s0_56",Q="_dotRunning_y61s0_63",k="_dotPaused_y61s0_64",$="_dotQuarantined_y61s0_65",L="_dotPulsing_y61s0_67",w="_bcPulse_y61s0_1",D="_statusBadge_y61s0_77",W="_badge_running_y61s0_86",E="_badge_paused_y61s0_87",I="_badge_quarantined_y61s0_88",U="_actions_y61s0_91",M="_btnPrimary_y61s0_98",O="_btnSecondary_y61s0_99",F="_btnWarning_y61s0_100",z="_btnDanger_y61s0_101",e={base:S,base_running:v,base_paused:N,base_quarantined:P,header:B,identity:C,nameBlock:q,label:T,branchName:R,dot:j,dotRunning:Q,dotPaused:k,dotQuarantined:$,dotPulsing:L,bcPulse:w,statusBadge:D,badge_running:W,badge_paused:E,badge_quarantined:I,actions:U,btnPrimary:M,btnSecondary:O,btnWarning:F,btnDanger:z},A={running:{label:"Running",dotClass:"dotRunning",pulsing:!0},paused:{label:"Paused",dotClass:"dotPaused",pulsing:!1},quarantined:{label:"Quarantined",dotClass:"dotQuarantined",pulsing:!1}},b=({className:s,branchName:r,status:a,onPause:_,onResume:t,onQuarantine:o,onCancel:i,onThrottle:f})=>{const y=A[a];return n.jsxs("div",{className:`${e.base} ${e[`base_${a}`]??""} ${s||""}`,role:"region","aria-label":`Branch controls for ${r}`,children:[n.jsxs("div",{className:e.header,children:[n.jsxs("div",{className:e.identity,children:[n.jsx("span",{className:`${e.dot} ${e[y.dotClass]??""} ${y.pulsing?e.dotPulsing:""}`,"aria-hidden":"true"}),n.jsxs("div",{className:e.nameBlock,children:[n.jsx("span",{className:e.label,children:"Branch"}),n.jsx("span",{className:e.branchName,children:r})]})]}),n.jsx("span",{className:`${e.statusBadge} ${e[`badge_${a}`]??""}`,children:y.label})]}),n.jsxs("div",{className:e.actions,children:[a==="running"?n.jsx("button",{className:e.btnSecondary,onClick:()=>_?.(),children:"⏸ Pause"}):n.jsx("button",{className:e.btnPrimary,onClick:()=>t?.(),children:"▶ Resume"}),a!=="quarantined"&&n.jsx("button",{className:e.btnWarning,onClick:()=>o?.(),title:"Isolate branch: halt tool calls and spawns, allow inspection",children:"🔒 Quarantine"}),f&&n.jsx("button",{className:e.btnSecondary,onClick:f,title:"Reduce token burn rate and concurrency",children:"↓ Throttle"}),n.jsx("button",{className:e.btnDanger,onClick:()=>i?.(),children:"⊘ Cancel Branch"})]})]})};b.__docgenInfo={description:`BranchControls provides scoped steering mechanisms for a specific branch of the agent tree.
Complements the global RunControls from v0 — operates at branch/sub-tree level.`,methods:[],displayName:"BranchControls",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},branchName:{required:!0,tsType:{name:"string"},description:""},status:{required:!0,tsType:{name:"union",raw:"'running' | 'paused' | 'quarantined'",elements:[{name:"literal",value:"'running'"},{name:"literal",value:"'paused'"},{name:"literal",value:"'quarantined'"}]},description:""},onPause:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onResume:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onQuarantine:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onThrottle:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const H={title:"AX Components v1/BranchControls",component:b,tags:["autodocs"],argTypes:{status:{control:"select",options:["running","paused","quarantined"]},branchName:{control:"text"}}},c={args:{branchName:"branch-auth-3a",status:"running"}},u={name:"State: Running",args:{branchName:"branch-research-7f",status:"running"}},d={name:"State: Paused",args:{branchName:"branch-auth-3a",status:"paused"}},l={name:"State: Quarantined",args:{branchName:"branch-payments-2b",status:"quarantined"}},m={name:"State: Running with Throttle Option",args:{branchName:"branch-data-9c",status:"running",onThrottle:void 0}},g={name:"Prototype: Interactive Status Transitions",render:()=>{const[s,r]=x.useState("running"),[a,_]=x.useState([]),t=o=>_(i=>[o,...i].slice(0,5));return n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[n.jsx(b,{branchName:"branch-auth-3a",status:s,onPause:()=>{r("paused"),t("⏸ Branch paused")},onResume:()=>{r("running"),t("▶ Branch resumed")},onQuarantine:()=>{r("quarantined"),t("🔒 Branch quarantined")},onThrottle:()=>t("↓ Throttle applied"),onCancel:()=>t("⊘ Branch cancelled")}),a.length>0&&n.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"11px",padding:"8px 12px",background:"#f9fafb",borderRadius:"6px",border:"1px solid #e5e7eb",color:"#374151"},children:[n.jsx("strong",{children:"Event Log"}),a.map((o,i)=>n.jsx("div",{children:o},i))]})]})}},p={name:"Basic Usage",args:{branchName:"branch-auth-refactor-3a",status:"running",onPause:void 0,onResume:void 0,onQuarantine:void 0,onCancel:void 0}},h={name:"Production: Multiple Branches Side by Side",render:()=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:["running","paused","quarantined"].map(s=>n.jsx(b,{branchName:`branch-${s}-x7`,status:s,onPause:()=>{},onResume:()=>{},onQuarantine:()=>{},onCancel:()=>{}},s))})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    branchName: 'branch-auth-3a',
    status: 'running'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Running',
  args: {
    branchName: 'branch-research-7f',
    status: 'running'
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'State: Paused',
  args: {
    branchName: 'branch-auth-3a',
    status: 'paused'
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
        addLog('🔒 Branch quarantined');
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
}`,...h.parameters?.docs?.source}}};const J=["Default","StateRunning","StatePaused","StateQuarantined","WithThrottle","PrototypeStatusCycle","BasicUsage","MultipleBranches"];export{p as BasicUsage,c as Default,h as MultipleBranches,g as PrototypeStatusCycle,d as StatePaused,l as StateQuarantined,u as StateRunning,m as WithThrottle,J as __namedExportsOrder,H as default};
