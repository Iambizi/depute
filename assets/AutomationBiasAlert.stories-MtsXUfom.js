import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-Os096Vc4.js";import{A as j}from"./ApprovalGate-p7KbdLD8.js";import{a as w}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";import"./common-DpQzTmW8.js";import"./a11y-F8BY1ugJ.js";const S="_automationBiasAlert_iol4v_1",R="_overlay_iol4v_6",D="_card_iol4v_23",B="_icon_iol4v_35",M="_title_iol4v_47",q="_description_iol4v_54",I="_actions_iol4v_61",L="_btn_iol4v_67",E="_btnPrimary_iol4v_80",P="_btnDisabled_iol4v_105",a={automationBiasAlert:S,overlay:R,card:D,icon:B,title:M,description:q,actions:I,btn:L,btnPrimary:E,btnDisabled:P};function b({actionName:c="this action",onAcknowledge:p,children:u,isActive:s=!1,className:n}){const[o,d]=t.useState(3),[r,i]=t.useState(!1);s&&!r?(d(3),i(!0)):!s&&r&&i(!1);const l=o>0;t.useEffect(()=>{if(s&&o>0){const v=setInterval(()=>{d(g=>Math.max(0,g-1))},1e3);return()=>clearInterval(v)}},[s,o]);const y=()=>{l||p?.()};return e.jsxs("div",{className:`${a.automationBiasAlert} ${n??""}`,children:[u,s&&e.jsx("div",{className:a.overlay,role:"alert","aria-live":"assertive",children:e.jsxs("div",{className:a.card,children:[e.jsx("div",{className:a.icon,children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})}),e.jsx("h3",{className:a.title,children:"Deliberate Review Required"}),e.jsxs("p",{className:a.description,children:["You've approved several actions in rapid succession. Please take a moment to carefully review ",c," before proceeding."]}),e.jsx("div",{className:a.actions,children:e.jsx("button",{className:`${a.btn} ${a.btnPrimary} ${l?a.btnDisabled:""}`,onClick:y,disabled:l,type:"button",children:l?`Review details (${o}s)...`:"I have reviewed the details"})})]})})]})}b.__docgenInfo={description:`AutomationBiasAlert — A friction-based barrier to counteract over-trust.

It intercepts user actions when behavioral patterns suggest "automation bias" 
(too fast, too many consecutive approvals, etc.)`,methods:[],displayName:"AutomationBiasAlert",props:{thresholds:{required:!1,tsType:{name:"AutomationBiasThresholds"},description:"The thresholds that trigger the alert"},sessionId:{required:!1,tsType:{name:"string"},description:"Unique identifier for the agent/session to track history"},actionName:{required:!1,tsType:{name:"string"},description:"Current pending action name/description",defaultValue:{value:"'this action'",computed:!1}},onAcknowledge:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the alert is triggered and user acknowledges"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Children (usually the ApprovalGate or the content being monitored)"},isActive:{required:!1,tsType:{name:"boolean"},description:"Whether the alert is active (intercepting)",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const $={consecutiveApprovals:5,minApprovalTimeMs:1500,approvalRateCeiling:.9};function F(c={}){const[p,u]=t.useState([]),[s,n]=t.useState(!1),[o,d]=t.useState(()=>Date.now()),r=t.useMemo(()=>({...$,...c}),[c]),i=t.useCallback(()=>{d(Date.now())},[]),l=t.useCallback(v=>{const g=Date.now(),x=g-o,k={timestamp:g,action:v,durationMs:x};return u(N=>{const m=[...N,k].slice(-20);let h=!1;const _=m.slice(-r.consecutiveApprovals);return _.length>=r.consecutiveApprovals&&_.every(T=>T.action==="approved")&&(h=!0),v==="approved"&&x<r.minApprovalTimeMs&&(h=!0),m.length>=10&&m.filter(C=>C.action==="approved").length/m.length>r.approvalRateCeiling&&(h=!0),h&&n(!0),m}),Date.now()-o},[r,o]),y=t.useCallback(()=>{n(!1),i()},[i]);return{isAlertTriggered:s,recordAction:l,dismissAlert:y,resetTimer:i,history:p}}const Y={title:"AX Components/AutomationBiasAlert",component:b,tags:["autodocs"]},A={render:()=>{const{isAlertTriggered:c,recordAction:p,dismissAlert:u}=F({consecutiveApprovals:3,minApprovalTimeMs:2e3}),[s,n]=t.useState("pending"),[o,d]=t.useState(0),r=()=>{p("approved"),n("approved"),d(l=>l+1)},i=()=>{n("pending")};return e.jsxs("div",{style:{padding:"2rem",maxWidth:"600px"},children:[e.jsxs("div",{style:{marginBottom:"1rem",fontFamily:"sans-serif"},children:[e.jsx("strong",{children:"Approvals this session:"})," ",o," ",e.jsx("br",{}),e.jsx("small",{children:"Trigger: 3 consecutive approvals OR approval under 2s"})]}),e.jsx(b,{isActive:c,onAcknowledge:u,actionName:"the deployment of the production database migration",children:e.jsx(j,{...w({status:s,title:"Database Migration"}),onApprove:r,onReject:()=>n("rejected")})}),s!=="pending"&&e.jsx("button",{onClick:i,style:{marginTop:"1rem",padding:"0.5rem 1rem",cursor:"pointer"},children:"Next Action"})]})}},f={args:{isActive:!0,actionName:"the dangerous action",children:e.jsx(j,{...w({status:"pending",title:"Dangerous Action"})})}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      isAlertTriggered,
      recordAction,
      dismissAlert
    } = useAutomationBias({
      consecutiveApprovals: 3,
      minApprovalTimeMs: 2000
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const [approvalCount, setApprovalCount] = useState(0);
    const handleApprove = () => {
      recordAction('approved');
      setStatus('approved');
      setApprovalCount(prev => prev + 1);
    };
    const handleReset = () => {
      setStatus('pending');
    };
    return <div style={{
      padding: '2rem',
      maxWidth: '600px'
    }}>
        <div style={{
        marginBottom: '1rem',
        fontFamily: 'sans-serif'
      }}>
          <strong>Approvals this session:</strong> {approvalCount} <br />
          <small>Trigger: 3 consecutive approvals OR approval under 2s</small>
        </div>

        <AutomationBiasAlert isActive={isAlertTriggered} onAcknowledge={dismissAlert} actionName="the deployment of the production database migration">
          <ApprovalGate {...generateMockApproval({
          status,
          title: 'Database Migration'
        })} onApprove={handleApprove} onReject={() => setStatus('rejected')} />
        </AutomationBiasAlert>

        {status !== 'pending' && <button onClick={handleReset} style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        cursor: 'pointer'
      }}>
            Next Action
          </button>}
      </div>;
  }
}`,...A.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    isActive: true,
    actionName: 'the dangerous action',
    children: <ApprovalGate {...generateMockApproval({
      status: 'pending',
      title: 'Dangerous Action'
    })} />
  }
}`,...f.parameters?.docs?.source}}};const J=["Default","ForcedTrigger"];export{A as Default,f as ForcedTrigger,J as __namedExportsOrder,Y as default};
