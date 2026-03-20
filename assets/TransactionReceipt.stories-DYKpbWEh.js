import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-Os096Vc4.js";import{V as k}from"./a11y-F8BY1ugJ.js";import"./preload-helper-PPVm8Dsz.js";const j="_receipt_smkzd_4",N="_statusSuccess_smkzd_13",R="_statusFailed_smkzd_14",$="_statusReverted_smkzd_15",z="_header_smkzd_21",w="_headerLeft_smkzd_30",L="_statusIcon_smkzd_36",A="_statusPending_smkzd_50",V="_title_smkzd_53",C="_txId_smkzd_60",B="_statusBadge_smkzd_66",F="_lineItems_smkzd_83",q="_lineItem_smkzd_83",H="_lineItemHighlight_smkzd_99",D="_lineLabel_smkzd_103",E="_lineValue_smkzd_108",P="_mono_smkzd_114",X="_footer_smkzd_122",Z="_hashRow_smkzd_131",W="_hashLabel_smkzd_137",M="_hashValue_smkzd_142",O="_copyBtn_smkzd_152",U="_auditBtn_smkzd_178",e={receipt:j,statusSuccess:N,statusFailed:R,statusReverted:$,header:z,headerLeft:w,statusIcon:L,statusPending:A,title:V,txId:C,statusBadge:B,lineItems:F,lineItem:q,lineItemHighlight:H,lineLabel:D,lineValue:E,mono:P,footer:X,hashRow:Z,hashLabel:W,hashValue:M,copyBtn:O,auditBtn:U},m={success:"Success",failed:"Failed",pending:"Pending",reverted:"Reverted"},Y={success:"✓",failed:"✕",pending:"◌",reverted:"↩"},p={success:e.statusSuccess,failed:e.statusFailed,pending:e.statusPending,reverted:e.statusReverted};function f({transactionId:n,title:i,status:s,timestamp:h,lineItems:T,agentId:_,hash:t,copyableHash:I=!0,onCopyHash:g,onViewAuditTrail:d,className:x}){const[v,b]=u.useState(!1),y=u.useCallback(async()=>{if(t)try{await navigator.clipboard.writeText(t),b(!0),g?.(),setTimeout(()=>b(!1),2e3)}catch{}},[t,g]),S=u.useMemo(()=>`${i}: ${m[s]}. Transaction ${n}.`,[i,s,n]);return a.jsxs("div",{className:`${e.receipt} ${p[s]} ${x??""}`,role:"region","aria-label":S,children:[a.jsxs("div",{className:e.header,children:[a.jsxs("div",{className:e.headerLeft,children:[a.jsx("span",{className:`${e.statusIcon} ${p[s]}`,"aria-hidden":"true",children:Y[s]}),a.jsxs("div",{children:[a.jsx("h3",{className:e.title,children:i}),a.jsxs("span",{className:e.txId,children:["#",n]})]})]}),a.jsx("span",{className:`${e.statusBadge} ${p[s]}`,children:m[s]})]}),a.jsxs("div",{className:e.lineItems,role:"list","aria-label":"Transaction details",children:[a.jsxs("div",{className:e.lineItem,role:"listitem",children:[a.jsx("span",{className:e.lineLabel,children:"Timestamp"}),a.jsx("span",{className:e.lineValue,children:h})]}),_&&a.jsxs("div",{className:e.lineItem,role:"listitem",children:[a.jsx("span",{className:e.lineLabel,children:"Agent"}),a.jsx("span",{className:`${e.lineValue} ${e.mono}`,children:_})]}),T.map(l=>a.jsxs("div",{className:`${e.lineItem} ${l.highlight?e.lineItemHighlight:""}`,role:"listitem",children:[a.jsx("span",{className:e.lineLabel,children:l.label}),a.jsx("span",{className:e.lineValue,children:l.value})]},l.label))]}),(t||d)&&a.jsxs("div",{className:e.footer,children:[t&&a.jsxs("div",{className:e.hashRow,children:[a.jsx("span",{className:e.hashLabel,children:"Verification"}),a.jsx("code",{className:e.hashValue,children:t.length>16?`${t.slice(0,8)}…${t.slice(-8)}`:t}),I&&a.jsx("button",{type:"button",className:e.copyBtn,onClick:y,"aria-label":v?"Hash copied":"Copy hash",children:v?"✓":"⧉"})]}),d&&a.jsx("button",{type:"button",className:e.auditBtn,onClick:d,"aria-label":"View full audit trail",children:"View Audit Trail →"})]}),a.jsx(k,{children:`Transaction receipt: ${i}. Status: ${m[s]}. ID: ${n}. Completed at ${h}.`})]})}f.__docgenInfo={description:"",methods:[],displayName:"TransactionReceipt",props:{transactionId:{required:!0,tsType:{name:"string"},description:"Transaction/action ID"},title:{required:!0,tsType:{name:"string"},description:'Title (e.g. "Transfer Complete", "Deployment Receipt")'},status:{required:!0,tsType:{name:"union",raw:"'success' | 'failed' | 'pending' | 'reverted'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'failed'"},{name:"literal",value:"'pending'"},{name:"literal",value:"'reverted'"}]},description:"Status of the transaction"},timestamp:{required:!0,tsType:{name:"string"},description:"Timestamp of completion"},lineItems:{required:!0,tsType:{name:"Array",elements:[{name:"ReceiptLineItem"}],raw:"ReceiptLineItem[]"},description:"Line items to display"},agentId:{required:!1,tsType:{name:"string"},description:"Agent that performed the action"},hash:{required:!1,tsType:{name:"string"},description:"Hash or signature for verification"},copyableHash:{required:!1,tsType:{name:"boolean"},description:"Whether to show a copy button for the hash",defaultValue:{value:"true",computed:!1}},onCopyHash:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when hash is copied"},onViewAuditTrail:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user requests full audit trail"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const ee={title:"v2 — Compliance & Forensics/TransactionReceipt",component:f,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{transactionId:"TX-98765",title:"Wire Transfer Complete",status:"success",timestamp:"2026-03-19T14:30:00Z",agentId:"payment-agent-01",hash:"0xabcdef1234567890abcdef1234567890fedcba09",lineItems:[{label:"Amount",value:"$5,000.00",highlight:!0},{label:"From",value:"Account ****4521"},{label:"To",value:"Account ****8903"},{label:"Fee",value:"$2.50"},{label:"Network",value:"SWIFT"}],onViewAuditTrail:()=>alert("Opening audit trail...")}},c={args:{transactionId:"TX-98766",title:"API Deployment",status:"failed",timestamp:"2026-03-19T15:00:00Z",lineItems:[{label:"Service",value:"api-gateway"},{label:"Version",value:"v2.1.0"},{label:"Error",value:"Health check timeout",highlight:!0}]}},o={args:{transactionId:"TX-98767",title:"Database Migration",status:"reverted",timestamp:"2026-03-19T16:00:00Z",hash:"0x1234abcd",lineItems:[{label:"Schema",value:"users_v3"},{label:"Rows Affected",value:"12,450"},{label:"Revert Reason",value:"Constraint violation detected",highlight:!0}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    transactionId: 'TX-98765',
    title: 'Wire Transfer Complete',
    status: 'success',
    timestamp: '2026-03-19T14:30:00Z',
    agentId: 'payment-agent-01',
    hash: '0xabcdef1234567890abcdef1234567890fedcba09',
    lineItems: [{
      label: 'Amount',
      value: '$5,000.00',
      highlight: true
    }, {
      label: 'From',
      value: 'Account ****4521'
    }, {
      label: 'To',
      value: 'Account ****8903'
    }, {
      label: 'Fee',
      value: '$2.50'
    }, {
      label: 'Network',
      value: 'SWIFT'
    }],
    onViewAuditTrail: () => alert('Opening audit trail...')
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    transactionId: 'TX-98766',
    title: 'API Deployment',
    status: 'failed',
    timestamp: '2026-03-19T15:00:00Z',
    lineItems: [{
      label: 'Service',
      value: 'api-gateway'
    }, {
      label: 'Version',
      value: 'v2.1.0'
    }, {
      label: 'Error',
      value: 'Health check timeout',
      highlight: true
    }]
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    transactionId: 'TX-98767',
    title: 'Database Migration',
    status: 'reverted',
    timestamp: '2026-03-19T16:00:00Z',
    hash: '0x1234abcd',
    lineItems: [{
      label: 'Schema',
      value: 'users_v3'
    }, {
      label: 'Rows Affected',
      value: '12,450'
    }, {
      label: 'Revert Reason',
      value: 'Constraint violation detected',
      highlight: true
    }]
  }
}`,...o.parameters?.docs?.source}}};const ae=["Success","Failed","Reverted"];export{c as Failed,o as Reverted,r as Success,ae as __namedExportsOrder,ee as default};
