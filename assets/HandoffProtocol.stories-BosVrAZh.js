import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as T}from"./iframe-C-UiW1EA.js";import{f as p}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const A="_base_s9909_3",N="_header_s9909_15",j="_route_s9909_24",R="_agent_s9909_30",C="_arrow_s9909_41",w="_badge_s9909_47",P="_section_s9909_59",q="_sectionTitle_s9909_68",H="_goalText_s9909_77",S="_summaryText_s9909_78",k="_nextRequestText_s9909_79",L="_payloadList_s9909_92",O="_payloadRow_s9909_99",W="_payloadLabel_s9909_109",M="_payloadValue_s9909_117",B="_actions_s9909_126",D="_btnAccept_s9909_135",F="_btnIntercept_s9909_136",V="_btnCancel_s9909_137",n={base:A,header:N,route:j,agent:R,arrow:C,badge:w,section:P,sectionTitle:q,goalText:H,summaryText:S,nextRequestText:k,payloadList:L,payloadRow:O,payloadLabel:W,payloadValue:M,actions:B,btnAccept:D,btnIntercept:F,btnCancel:V},u=({className:a,sourceAgent:t,destinationAgent:s,goal:b,summary:_,payload:m=[],nextRequest:g,canIntercept:v=!0,onAccept:h,onIntercept:f,onCancel:x})=>e.jsxs("div",{className:`${n.base} ${a||""}`,role:"dialog","aria-modal":"false","aria-label":`Handoff from ${t} to ${s}`,children:[e.jsxs("div",{className:n.header,children:[e.jsxs("div",{className:n.route,children:[e.jsx("span",{className:n.agent,children:t}),e.jsx("span",{className:n.arrow,"aria-hidden":"true",children:"→"}),e.jsx("span",{className:n.agent,children:s})]}),e.jsx("span",{className:n.badge,children:"Context Packet"})]}),e.jsxs("section",{className:n.section,children:[e.jsx("h4",{className:n.sectionTitle,children:"Goal"}),e.jsx("p",{className:n.goalText,children:b})]}),e.jsxs("section",{className:n.section,children:[e.jsx("h4",{className:n.sectionTitle,children:"What happened"}),e.jsx("p",{className:n.summaryText,children:_})]}),m.length>0&&e.jsxs("section",{className:n.section,children:[e.jsx("h4",{className:n.sectionTitle,children:"Context Payload"}),e.jsx("dl",{className:n.payloadList,children:m.map((y,I)=>e.jsxs("div",{className:n.payloadRow,children:[e.jsx("dt",{className:n.payloadLabel,children:y.label}),e.jsx("dd",{className:n.payloadValue,children:y.value})]},I))})]}),g&&e.jsxs("section",{className:n.section,children:[e.jsx("h4",{className:n.sectionTitle,children:"What I need from you"}),e.jsx("p",{className:n.nextRequestText,children:g})]}),e.jsxs("div",{className:n.actions,children:[h&&e.jsx("button",{className:n.btnAccept,onClick:h,children:"Accept Handoff"}),v&&f&&e.jsx("button",{className:n.btnIntercept,onClick:f,children:"Intercept & Override"}),x&&e.jsx("button",{className:n.btnCancel,onClick:x,children:"Cancel"})]})]});u.__docgenInfo={description:`HandoffProtocol is a "comprehension UI" — not a gate, but a structured viewer
for understanding context being transferred between agents or to a human.
The human reads, understands, and optionally intercepts if something seems wrong.`,methods:[],displayName:"HandoffProtocol",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},sourceAgent:{required:!0,tsType:{name:"string"},description:"Agent sending the context"},destinationAgent:{required:!0,tsType:{name:"string"},description:"Agent or human receiving the context"},goal:{required:!0,tsType:{name:"string"},description:"The high-level goal/intent being transferred"},summary:{required:!0,tsType:{name:"string"},description:"A readable summary of what has been accomplished so far"},payload:{required:!1,tsType:{name:"Array",elements:[{name:"HandoffPayloadItem"}],raw:"HandoffPayloadItem[]"},description:"The structured context payload being handed off",defaultValue:{value:"[]",computed:!1}},nextRequest:{required:!1,tsType:{name:"string"},description:"What is needed from the receiving agent/human"},canIntercept:{required:!1,tsType:{name:"boolean"},description:"If true, the human can intercept before the handoff proceeds",defaultValue:{value:"true",computed:!1}},onAccept:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the user approves the handoff"},onIntercept:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the user intercepts and overrides"},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the user cancels the handoff"}}};const G={title:"AX Components v1/HandoffProtocol",component:u,tags:["autodocs"],argTypes:{canIntercept:{control:"boolean"}}},r={args:{...p(),onAccept:void 0,onIntercept:void 0,onCancel:void 0}},o={name:"State: With All Actions",args:p({canIntercept:!0})},c={name:"State: No Intercept Option",args:{...p({canIntercept:!1})}},i={name:"State: Minimal (No Payload / No NextRequest)",args:{sourceAgent:"Researcher-A",destinationAgent:"Code-Writer-1",goal:"Implement the caching layer",summary:"Research complete. Findings documented.",canIntercept:!0}},d={name:"Prototype: Interactive Accept / Intercept / Cancel",render:()=>{const[a,t]=T.useState(null),s=p();return a?e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Outcome: ",e.jsx("strong",{children:a}),e.jsx("button",{onClick:()=>t(null),style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Reset"})]}):e.jsx(u,{...s,onAccept:()=>t("Handoff accepted"),onIntercept:()=>t("Intercepted — user is overriding"),onCancel:()=>t("Handoff cancelled")})}},l={name:"Basic Usage",args:{sourceAgent:"Researcher-A",destinationAgent:"Code-Writer-1",goal:"Implement caching layer for the auth service",summary:"Completed research. Found 3 redundant DB queries in session validation. Drafted caching strategy using Redis TTL. Plan has been approved.",payload:[{label:"Approved Plan",value:"plan-7f3a2b"},{label:"Approach",value:"Cache at API gateway using Redis with 15m TTL"},{label:"Token Budget Left",value:"12,400 tokens"}],nextRequest:"Implement the Redis integration and write unit tests for the updated middleware.",canIntercept:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockHandoff(),
    onAccept: undefined,
    onIntercept: undefined,
    onCancel: undefined
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'State: With All Actions',
  args: generateMockHandoff({
    canIntercept: true
  }) as object
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'State: No Intercept Option',
  args: {
    ...(generateMockHandoff({
      canIntercept: false
    }) as object)
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'State: Minimal (No Payload / No NextRequest)',
  args: {
    sourceAgent: 'Researcher-A',
    destinationAgent: 'Code-Writer-1',
    goal: 'Implement the caching layer',
    summary: 'Research complete. Findings documented.',
    canIntercept: true
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Interactive Accept / Intercept / Cancel',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockHandoff();
    if (outcome) {
      return <div style={{
        fontFamily: 'sans-serif',
        fontSize: '13px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{
          marginLeft: '12px',
          cursor: 'pointer',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
            ↺ Reset
          </button>
        </div>;
    }
    return <HandoffProtocol {...data} onAccept={() => setOutcome('Handoff accepted')} onIntercept={() => setOutcome('Intercepted — user is overriding')} onCancel={() => setOutcome('Handoff cancelled')} />;
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    sourceAgent: 'Researcher-A',
    destinationAgent: 'Code-Writer-1',
    goal: 'Implement caching layer for the auth service',
    summary: 'Completed research. Found 3 redundant DB queries in session validation. Drafted caching strategy using Redis TTL. Plan has been approved.',
    payload: [{
      label: 'Approved Plan',
      value: 'plan-7f3a2b'
    }, {
      label: 'Approach',
      value: 'Cache at API gateway using Redis with 15m TTL'
    }, {
      label: 'Token Budget Left',
      value: '12,400 tokens'
    }],
    nextRequest: 'Implement the Redis integration and write unit tests for the updated middleware.',
    canIntercept: true
  }
}`,...l.parameters?.docs?.source}}};const X=["Default","WithActions","NoIntercept","MinimalPayload","PrototypeInteractive","BasicUsage"];export{l as BasicUsage,r as Default,i as MinimalPayload,c as NoIntercept,d as PrototypeInteractive,o as WithActions,X as __namedExportsOrder,G as default};
