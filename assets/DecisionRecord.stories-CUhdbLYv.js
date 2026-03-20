import{j as e}from"./jsx-runtime-u17CrQMm.js";const u="_container_c6764_1",g="_header_c6764_10",h="_title_c6764_19",v="_badge_c6764_28",x="_approved_c6764_40",_="_rejected_c6764_46",y="_modified_c6764_52",j="_body_c6764_58",f="_section_c6764_65",D="_label_c6764_71",b="_value_c6764_79",N="_valueMono_c6764_85",S="_grid_c6764_96",k="_reasoning_c6764_102",n={container:u,header:g,title:h,badge:v,approved:x,rejected:_,modified:y,body:j,section:f,label:D,value:b,valueMono:N,grid:S,reasoning:k};function l({decision:c,approver:a,agentContext:o,humanReasoning:d,className:m=""}){const p=typeof a.timestamp=="string"?new Date(a.timestamp).toLocaleString():a.timestamp.toLocaleString();return e.jsxs("div",{className:`${n.container} ${m}`,"data-testid":"ax-decision-record",children:[e.jsxs("div",{className:n.header,children:[e.jsxs("div",{className:n.title,children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"}),e.jsx("path",{d:"m9 12 2 2 4-4"})]}),"Decision Record"]}),e.jsx("div",{className:`${n.badge} ${n[c]}`,children:c})]}),e.jsxs("div",{className:n.body,children:[e.jsxs("div",{className:n.grid,children:[e.jsxs("div",{className:n.section,children:[e.jsx("span",{className:n.label,children:"Approver"}),e.jsxs("span",{className:n.value,children:[a.name," ",a.role&&e.jsxs("span",{style:{color:"var(--ax-text-tertiary)"},children:["(",a.role,")"]})]})]}),e.jsxs("div",{className:n.section,children:[e.jsx("span",{className:n.label,children:"Timestamp"}),e.jsx("span",{className:n.valueMono,children:p})]})]}),e.jsxs("div",{className:n.section,children:[e.jsx("span",{className:n.label,children:"Agent Intent"}),e.jsx("span",{className:n.value,children:o.intent})]}),o.policyInvoked&&e.jsxs("div",{className:n.section,children:[e.jsx("span",{className:n.label,children:"Policy Invoked"}),e.jsx("span",{className:n.valueMono,children:o.policyInvoked})]}),d&&e.jsxs("div",{className:n.section,children:[e.jsx("span",{className:n.label,children:"Stated Reasoning"}),e.jsx("div",{className:n.reasoning,children:d})]})]})]})}l.__docgenInfo={description:"",methods:[],displayName:"DecisionRecord",props:{decision:{required:!0,tsType:{name:"union",raw:"'approved' | 'rejected' | 'modified'",elements:[{name:"literal",value:"'approved'"},{name:"literal",value:"'rejected'"},{name:"literal",value:"'modified'"}]},description:"The final human decision"},approver:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  name: string;
  role?: string;
  timestamp: Date | string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"role",value:{name:"string",required:!1}},{key:"timestamp",value:{name:"union",raw:"Date | string",elements:[{name:"Date"},{name:"string"}],required:!0}}]}},description:"The human who made the decision"},agentContext:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  intent: string;
  policyInvoked?: string;
}`,signature:{properties:[{key:"intent",value:{name:"string",required:!0}},{key:"policyInvoked",value:{name:"string",required:!1}}]}},description:"The agent context at the time of the decision"},humanReasoning:{required:!1,tsType:{name:"string"},description:"Optional human reasoning for the decision"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}}}};const R={title:"ax-components-v2/DecisionRecord",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{decision:{control:"radio",options:["approved","rejected","modified"]}}},t={args:{decision:"approved",approver:{name:"Sarah Connor",role:"SecOps Lead",timestamp:new Date},agentContext:{intent:"Execute `DROP TABLE dummy_data` in production database",policyInvoked:"DB-RESTRICT-01"},humanReasoning:"Confirmed via Slack that this is scheduled maintenance."}},s={args:{decision:"rejected",approver:{name:"Michael Burn",timestamp:new Date},agentContext:{intent:"Transfer 50,000 USDC to 0x123...abc"},humanReasoning:"Address is not whitelisted. Halting execution."}},i={args:{decision:"modified",approver:{name:"Alex Developer",role:"Staff Engineer",timestamp:new Date},agentContext:{intent:"Push 15 commits directly to `main` branch",policyInvoked:"GIT-FLOW-02"},humanReasoning:"Bypass denied. Diverted commits to a new PR branch instead."}},r={args:{decision:"approved",approver:{name:"System Auto-Approver",timestamp:new Date},agentContext:{intent:"Generate weekly team summary report"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    decision: 'approved',
    approver: {
      name: 'Sarah Connor',
      role: 'SecOps Lead',
      timestamp: new Date()
    },
    agentContext: {
      intent: 'Execute \`DROP TABLE dummy_data\` in production database',
      policyInvoked: 'DB-RESTRICT-01'
    },
    humanReasoning: 'Confirmed via Slack that this is scheduled maintenance.'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    decision: 'rejected',
    approver: {
      name: 'Michael Burn',
      timestamp: new Date()
    },
    agentContext: {
      intent: 'Transfer 50,000 USDC to 0x123...abc'
    },
    humanReasoning: 'Address is not whitelisted. Halting execution.'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    decision: 'modified',
    approver: {
      name: 'Alex Developer',
      role: 'Staff Engineer',
      timestamp: new Date()
    },
    agentContext: {
      intent: 'Push 15 commits directly to \`main\` branch',
      policyInvoked: 'GIT-FLOW-02'
    },
    humanReasoning: 'Bypass denied. Diverted commits to a new PR branch instead.'
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    decision: 'approved',
    approver: {
      name: 'System Auto-Approver',
      timestamp: new Date()
    },
    agentContext: {
      intent: 'Generate weekly team summary report'
    }
  }
}`,...r.parameters?.docs?.source}}};const T=["Default","Rejected","Modified","MinimalContext"];export{t as Default,r as MinimalContext,i as Modified,s as Rejected,T as __namedExportsOrder,R as default};
