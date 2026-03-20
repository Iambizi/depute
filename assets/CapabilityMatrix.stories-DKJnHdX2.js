import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-Os096Vc4.js";import{V as C}from"./a11y-F8BY1ugJ.js";import"./preload-helper-PPVm8Dsz.js";const D="_capabilityMatrix_1x9n2_4",B="_header_1x9n2_16",j="_headerLeft_1x9n2_26",v="_title_1x9n2_32",I="_agentId_1x9n2_39",T="_summaryBadges_1x9n2_49",A="_summaryBadge_1x9n2_49",S="_description_1x9n2_66",M="_body_1x9n2_78",$="_group_1x9n2_82",L="_groupLabel_1x9n2_88",k="_row_1x9n2_101",F="_rowDenied_1x9n2_120",R="_permBadge_1x9n2_132",E="_permFull_1x9n2_148",O="_permRead_1x9n2_153",W="_permWrite_1x9n2_158",q="_permNone_1x9n2_163",P="_permConditional_1x9n2_168",V="_capName_1x9n2_177",G="_capDesc_1x9n2_185",U="_capCondition_1x9n2_190",e={capabilityMatrix:D,header:B,headerLeft:j,title:v,agentId:I,summaryBadges:T,summaryBadge:A,description:S,body:M,group:$,groupLabel:L,row:k,rowDenied:F,permBadge:R,permFull:E,permRead:O,permWrite:W,permNone:q,permConditional:P,capName:V,capDesc:G,capCondition:U},H={full:"Full Access",read:"Read Only",write:"Write Only",none:"Denied",conditional:"Conditional"},K={full:"✓",read:"◐",write:"◑",none:"✕",conditional:"◎"},x={full:e.permFull,read:e.permRead,write:e.permWrite,none:e.permNone,conditional:e.permConditional};function Y(a){const i=new Map;for(const r of a){const s=r.category??"General",o=i.get(s)??[];o.push(r),i.set(s,o)}return i}function h({capability:a,highlightDenied:i,onClick:r}){const s=a.permission==="none",o=`${e.row} ${x[a.permission]} ${s&&i?e.rowDenied:""}`;return n.jsxs("div",{className:o,role:"row",onClick:r?()=>r(a):void 0,onKeyDown:r?d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),r(a))}:void 0,tabIndex:r?0:void 0,style:r?{cursor:"pointer"}:void 0,children:[n.jsxs("span",{className:`${e.permBadge} ${x[a.permission]}`,children:[n.jsx("span",{"aria-hidden":"true",children:K[a.permission]}),n.jsx(C,{children:H[a.permission]})]}),n.jsx("span",{className:e.capName,children:a.name}),a.description&&n.jsx("span",{className:e.capDesc,children:a.description}),a.permission==="conditional"&&a.condition&&n.jsxs("span",{className:e.capCondition,children:["if ",a.condition]})]})}function b({title:a,description:i,capabilities:r,agentId:s,groupByCategory:o=!0,highlightDenied:d=!0,onCapabilityClick:f,className:w}){const _=y.useMemo(()=>o?Y(r):null,[r,o]),c=y.useMemo(()=>{const t=r.filter(l=>l.permission!=="none").length,g=r.filter(l=>l.permission==="none").length;return{allowed:t,denied:g,total:r.length}},[r]),N=y.useMemo(()=>`${a}: ${c.allowed} allowed, ${c.denied} denied out of ${c.total} capabilities`,[a,c]);return n.jsxs("div",{className:`${e.capabilityMatrix} ${w??""}`,role:"region","aria-label":N,children:[n.jsxs("div",{className:e.header,children:[n.jsxs("div",{className:e.headerLeft,children:[n.jsx("h3",{className:e.title,children:a}),s&&n.jsx("span",{className:e.agentId,children:s})]}),n.jsxs("div",{className:e.summaryBadges,children:[n.jsxs("span",{className:`${e.summaryBadge} ${e.permFull}`,children:[c.allowed," allowed"]}),n.jsxs("span",{className:`${e.summaryBadge} ${e.permNone}`,children:[c.denied," denied"]})]})]}),i&&n.jsx("p",{className:e.description,children:i}),n.jsx("div",{className:e.body,role:"table","aria-label":"Capability permissions",children:_?Array.from(_.entries()).map(([t,g])=>n.jsxs("div",{className:e.group,children:[n.jsx("div",{className:e.groupLabel,role:"rowgroup",children:t}),g.map(l=>n.jsx(h,{capability:l,highlightDenied:d,onClick:f},l.name))]},t)):r.map(t=>n.jsx(h,{capability:t,highlightDenied:d,onClick:f},t.name))})]})}b.__docgenInfo={description:"",methods:[],displayName:"CapabilityMatrix",props:{title:{required:!0,tsType:{name:"string"},description:'Title (e.g. "Agent Permissions", "Tool Access Matrix")'},description:{required:!1,tsType:{name:"string"},description:"Description of the capability scope"},capabilities:{required:!0,tsType:{name:"Array",elements:[{name:"Capability"}],raw:"Capability[]"},description:"List of capabilities"},agentId:{required:!1,tsType:{name:"string"},description:'Agent identity label (e.g. "research-agent-01")'},groupByCategory:{required:!1,tsType:{name:"boolean"},description:"Whether to group capabilities by category (default: true)",defaultValue:{value:"true",computed:!1}},highlightDenied:{required:!1,tsType:{name:"boolean"},description:"Whether to highlight denied capabilities (default: true)",defaultValue:{value:"true",computed:!1}},onCapabilityClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(capability: Capability) => void",signature:{arguments:[{type:{name:"Capability"},name:"capability"}],return:{name:"void"}}},description:"Called when user clicks on a capability for details"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const Z={title:"v2 — Compliance & Forensics/CapabilityMatrix",component:b,parameters:{layout:"padded"},tags:["autodocs"]},p={args:{title:"Agent Permissions",agentId:"research-agent-01",description:"Active session permissions for the current workflow",capabilities:[{name:"database.users",description:"User records",permission:"read",category:"Data"},{name:"database.orders",description:"Order records",permission:"full",category:"Data"},{name:"database.logs",description:"Audit logs",permission:"write",category:"Data"},{name:"email.send",description:"Send emails",permission:"none",category:"Communications"},{name:"email.draft",description:"Draft emails",permission:"write",category:"Communications"},{name:"deploy.staging",description:"Deploy to staging",permission:"conditional",condition:"approved by lead",category:"Infrastructure"},{name:"deploy.production",description:"Deploy to prod",permission:"none",category:"Infrastructure"}]}},m={name:"💰 Fintech: Trading Bot",args:{title:"Trading Bot Capabilities",agentId:"trading-bot-alpha",capabilities:[{name:"market.read",description:"Read market data",permission:"full",category:"Market"},{name:"order.place",description:"Place orders",permission:"conditional",condition:"under $10k",category:"Trading"},{name:"order.cancel",description:"Cancel orders",permission:"full",category:"Trading"},{name:"funds.withdraw",description:"Withdraw funds",permission:"none",category:"Banking"},{name:"funds.transfer",description:"Internal transfers",permission:"none",category:"Banking"}]}},u={name:"Flat (No Groups)",args:{title:"Tool Access",groupByCategory:!1,capabilities:[{name:"file.read",permission:"full"},{name:"file.write",permission:"write"},{name:"file.delete",permission:"none"},{name:"shell.execute",permission:"conditional",condition:"sandboxed"}]}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Agent Permissions',
    agentId: 'research-agent-01',
    description: 'Active session permissions for the current workflow',
    capabilities: [{
      name: 'database.users',
      description: 'User records',
      permission: 'read',
      category: 'Data'
    }, {
      name: 'database.orders',
      description: 'Order records',
      permission: 'full',
      category: 'Data'
    }, {
      name: 'database.logs',
      description: 'Audit logs',
      permission: 'write',
      category: 'Data'
    }, {
      name: 'email.send',
      description: 'Send emails',
      permission: 'none',
      category: 'Communications'
    }, {
      name: 'email.draft',
      description: 'Draft emails',
      permission: 'write',
      category: 'Communications'
    }, {
      name: 'deploy.staging',
      description: 'Deploy to staging',
      permission: 'conditional',
      condition: 'approved by lead',
      category: 'Infrastructure'
    }, {
      name: 'deploy.production',
      description: 'Deploy to prod',
      permission: 'none',
      category: 'Infrastructure'
    }]
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: '💰 Fintech: Trading Bot',
  args: {
    title: 'Trading Bot Capabilities',
    agentId: 'trading-bot-alpha',
    capabilities: [{
      name: 'market.read',
      description: 'Read market data',
      permission: 'full',
      category: 'Market'
    }, {
      name: 'order.place',
      description: 'Place orders',
      permission: 'conditional',
      condition: 'under $10k',
      category: 'Trading'
    }, {
      name: 'order.cancel',
      description: 'Cancel orders',
      permission: 'full',
      category: 'Trading'
    }, {
      name: 'funds.withdraw',
      description: 'Withdraw funds',
      permission: 'none',
      category: 'Banking'
    }, {
      name: 'funds.transfer',
      description: 'Internal transfers',
      permission: 'none',
      category: 'Banking'
    }]
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Flat (No Groups)',
  args: {
    title: 'Tool Access',
    groupByCategory: false,
    capabilities: [{
      name: 'file.read',
      permission: 'full'
    }, {
      name: 'file.write',
      permission: 'write'
    }, {
      name: 'file.delete',
      permission: 'none'
    }, {
      name: 'shell.execute',
      permission: 'conditional',
      condition: 'sandboxed'
    }]
  }
}`,...u.parameters?.docs?.source}}};const ee=["Default","FintechAgent","FlatList"];export{p as Default,m as FintechAgent,u as FlatList,ee as __namedExportsOrder,Z as default};
