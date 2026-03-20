import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-Os096Vc4.js";import{V}from"./a11y-F8BY1ugJ.js";import"./preload-helper-PPVm8Dsz.js";const D="_bindingApproval_n0aal_4",W="_statusReviewing_n0aal_13",H="_statusSigning_n0aal_14",M="_statusSigned_n0aal_18",O="_statusRejected_n0aal_19",U="_statusExpired_n0aal_20",P="_header_n0aal_35",X="_headerLeft_n0aal_44",F="_statusIcon_n0aal_50",G="_title_n0aal_67",J="_statusBadge_n0aal_74",K="_timer_n0aal_90",Q="_description_n0aal_101",Y="_impactBox_n0aal_113",Z="_impactLabel_n0aal_124",ee="_impactText_n0aal_132",te="_termsSection_n0aal_142",ne="_termsLabel_n0aal_146",ae="_termsList_n0aal_154",ie="_termRow_n0aal_160",se="_termCheckbox_n0aal_176",re="_termText_n0aal_181",oe="_signerRow_n0aal_190",ce="_signerLabel_n0aal_198",de="_signerValue_n0aal_202",le="_actions_n0aal_212",me="_signBtn_n0aal_220",ge="_rejectBtn_n0aal_248",e={bindingApproval:D,statusReviewing:W,statusSigning:H,statusSigned:M,statusRejected:O,statusExpired:U,header:P,headerLeft:X,statusIcon:F,title:G,statusBadge:J,timer:K,description:Q,impactBox:Y,impactLabel:Z,impactText:ee,termsSection:te,termsLabel:ne,termsList:ae,termRow:ie,termCheckbox:se,termText:re,signerRow:oe,signerLabel:ce,signerValue:de,actions:le,signBtn:me,rejectBtn:ge},T={reviewing:"Under Review",signing:"Signing…",signed:"Signed",rejected:"Rejected",expired:"Expired"},f={reviewing:e.statusReviewing,signing:e.statusSigning,signed:e.statusSigned,rejected:e.statusRejected,expired:e.statusExpired};function j({title:h,description:A,status:R="reviewing",terms:i=[],requireAllTerms:C=!0,isSigning:k=!1,signerIdentity:_,impactStatement:x,timeoutSeconds:r,onSign:I,onReject:E,onTimeout:w,className:N}){const[c,B]=s.useState(()=>new Set(i.filter(a=>a.acknowledged).map(a=>a.id))),[S,v]=s.useState(r??0),o=s.useRef(null),n=k?"signing":R,L=s.useMemo(()=>i.length===0?!0:i.every(a=>c.has(a.id)),[i,c]),$=n==="reviewing"&&(!C||L);s.useEffect(()=>{if(!(!r||n!=="reviewing"))return v(r),o.current=setInterval(()=>{v(a=>a<=1?(o.current&&clearInterval(o.current),w?.(),0):a-1)},1e3),()=>{o.current&&clearInterval(o.current)}},[r,n,w]);const q=s.useCallback(a=>{B(z=>{const d=new Set(z);return d.has(a)?d.delete(a):d.add(a),d})},[]),b=s.useMemo(()=>`Binding approval: ${h}. Status: ${T[n]}.`,[h,n]),y=n==="signed"||n==="rejected"||n==="expired";return t.jsxs("div",{className:`${e.bindingApproval} ${f[n]} ${N??""}`,role:"alertdialog","aria-label":b,children:[t.jsxs("div",{className:e.header,children:[t.jsxs("div",{className:e.headerLeft,children:[t.jsx("span",{className:`${e.statusIcon} ${f[n]}`,"aria-hidden":"true",children:n==="signing"?"🔐":n==="signed"?"✓":n==="rejected"?"✕":"⚠"}),t.jsxs("div",{children:[t.jsx("h3",{className:e.title,children:h}),t.jsx("span",{className:`${e.statusBadge} ${f[n]}`,children:T[n]})]})]}),r!=null&&n==="reviewing"&&t.jsxs("span",{className:e.timer,children:[Math.floor(S/60),":",String(S%60).padStart(2,"0")]})]}),t.jsx("p",{className:e.description,children:A}),x&&t.jsxs("div",{className:e.impactBox,role:"alert",children:[t.jsx("span",{className:e.impactLabel,children:"Impact"}),t.jsx("span",{className:e.impactText,children:x})]}),i.length>0&&!y&&t.jsxs("div",{className:e.termsSection,children:[t.jsxs("span",{className:e.termsLabel,children:["Terms (",c.size,"/",i.length," acknowledged)"]}),t.jsx("div",{className:e.termsList,role:"group","aria-label":"Binding terms",children:i.map(a=>t.jsxs("label",{className:e.termRow,children:[t.jsx("input",{type:"checkbox",checked:c.has(a.id),onChange:()=>q(a.id),className:e.termCheckbox,"aria-label":`Acknowledge: ${a.text}`}),t.jsx("span",{className:e.termText,children:a.text})]},a.id))})]}),_&&t.jsxs("div",{className:e.signerRow,children:[t.jsx("span",{className:e.signerLabel,children:"Signing as"}),t.jsx("span",{className:e.signerValue,children:_})]}),!y&&t.jsxs("div",{className:e.actions,children:[t.jsx("button",{type:"button",className:e.signBtn,onClick:I,disabled:!$,"aria-label":"Sign and approve",children:n==="signing"?"Signing…":"Sign & Approve"}),t.jsx("button",{type:"button",className:e.rejectBtn,onClick:()=>E?.(),disabled:n==="signing","aria-label":"Reject",children:"Reject"})]}),t.jsx(V,{children:b})]})}j.__docgenInfo={description:"",methods:[],displayName:"BindingApproval",props:{title:{required:!0,tsType:{name:"string"},description:'Title of the binding action (e.g. "Wire Transfer Authorization")'},description:{required:!0,tsType:{name:"string"},description:"Detailed description of the binding action"},status:{required:!1,tsType:{name:"union",raw:"'reviewing' | 'signing' | 'signed' | 'rejected' | 'expired'",elements:[{name:"literal",value:"'reviewing'"},{name:"literal",value:"'signing'"},{name:"literal",value:"'signed'"},{name:"literal",value:"'rejected'"},{name:"literal",value:"'expired'"}]},description:"Current status",defaultValue:{value:"'reviewing'",computed:!1}},terms:{required:!1,tsType:{name:"Array",elements:[{name:"BindingTerm"}],raw:"BindingTerm[]"},description:"Terms that must be acknowledged before signing",defaultValue:{value:"[]",computed:!1}},requireAllTerms:{required:!1,tsType:{name:"boolean"},description:"Require all terms to be acknowledged before enabling sign button",defaultValue:{value:"true",computed:!1}},isSigning:{required:!1,tsType:{name:"boolean"},description:"Whether the signing process is active (visual indicator)",defaultValue:{value:"false",computed:!1}},signerIdentity:{required:!1,tsType:{name:"string"},description:"Signer identity (e.g. email, wallet address)"},impactStatement:{required:!1,tsType:{name:"string"},description:'Estimated impact description (e.g. "$5,000 will be transferred")'},timeoutSeconds:{required:!1,tsType:{name:"number"},description:"Timeout in seconds for the signing window"},onSign:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user approves / signs"},onReject:{required:!1,tsType:{name:"signature",type:"function",raw:"(reason?: string) => void",signature:{arguments:[{type:{name:"string"},name:"reason"}],return:{name:"void"}}},description:"Called when user rejects"},onTimeout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when timeout expires"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const _e={title:"v2 — Compliance & Forensics/BindingApproval",component:j,parameters:{layout:"padded"},tags:["autodocs"]},l={args:{title:"Wire Transfer Authorization",description:"Agent requests authorization to execute a $5,000 wire transfer from Account ****4521 to Account ****8903.",impactStatement:"$5,000.00 will be transferred immediately. This action is irreversible.",signerIdentity:"alice@company.com",terms:[{id:"t1",text:"I authorize the transfer of $5,000.00 to Account ****8903",acknowledged:!1},{id:"t2",text:"I understand this action is irreversible once confirmed",acknowledged:!1},{id:"t3",text:"I confirm the recipient account details are correct",acknowledged:!1}],onSign:()=>alert("Signed!"),onReject:()=>alert("Rejected")}},m={name:"isSigning State",args:{title:"Contract Execution",description:"Cryptographic signature in progress...",isSigning:!0,signerIdentity:"0x1a2b...9c0d"}},g={args:{title:"Purchase Order Approved",description:"Agent completed purchase order for 500 units of Component-X.",status:"signed",signerIdentity:"procurement@company.com"}},u={name:"With Timeout",args:{title:"High-Value Transfer",description:"Approval window expires in 5 minutes.",timeoutSeconds:300,impactStatement:"$50,000 will be authorized for automated trading.",onSign:()=>alert("Signed!"),onReject:()=>alert("Rejected"),onTimeout:()=>alert("Approval window expired")}},p={name:"🪙 Crypto: Smart Contract",args:{title:"Smart Contract Deployment",description:"Agent will deploy a new ERC-20 token contract to Ethereum mainnet.",impactStatement:"Estimated gas: 0.15 ETH (~$450). Contract is immutable once deployed.",signerIdentity:"0xAb5801a7...1f27EaD9083C756Cc2",terms:[{id:"t1",text:"I have reviewed the contract source code",acknowledged:!1},{id:"t2",text:"I authorize the gas expenditure of up to 0.2 ETH",acknowledged:!1},{id:"t3",text:"I understand the contract cannot be modified after deployment",acknowledged:!1}],onSign:()=>alert("Deploying..."),onReject:()=>alert("Deployment cancelled")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Wire Transfer Authorization',
    description: 'Agent requests authorization to execute a $5,000 wire transfer from Account ****4521 to Account ****8903.',
    impactStatement: '$5,000.00 will be transferred immediately. This action is irreversible.',
    signerIdentity: 'alice@company.com',
    terms: [{
      id: 't1',
      text: 'I authorize the transfer of $5,000.00 to Account ****8903',
      acknowledged: false
    }, {
      id: 't2',
      text: 'I understand this action is irreversible once confirmed',
      acknowledged: false
    }, {
      id: 't3',
      text: 'I confirm the recipient account details are correct',
      acknowledged: false
    }],
    onSign: () => alert('Signed!'),
    onReject: () => alert('Rejected')
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'isSigning State',
  args: {
    title: 'Contract Execution',
    description: 'Cryptographic signature in progress...',
    isSigning: true,
    signerIdentity: '0x1a2b...9c0d'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Purchase Order Approved',
    description: 'Agent completed purchase order for 500 units of Component-X.',
    status: 'signed',
    signerIdentity: 'procurement@company.com'
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'With Timeout',
  args: {
    title: 'High-Value Transfer',
    description: 'Approval window expires in 5 minutes.',
    timeoutSeconds: 300,
    impactStatement: '$50,000 will be authorized for automated trading.',
    onSign: () => alert('Signed!'),
    onReject: () => alert('Rejected'),
    onTimeout: () => alert('Approval window expired')
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: '🪙 Crypto: Smart Contract',
  args: {
    title: 'Smart Contract Deployment',
    description: 'Agent will deploy a new ERC-20 token contract to Ethereum mainnet.',
    impactStatement: 'Estimated gas: 0.15 ETH (~$450). Contract is immutable once deployed.',
    signerIdentity: '0xAb5801a7...1f27EaD9083C756Cc2',
    terms: [{
      id: 't1',
      text: 'I have reviewed the contract source code',
      acknowledged: false
    }, {
      id: 't2',
      text: 'I authorize the gas expenditure of up to 0.2 ETH',
      acknowledged: false
    }, {
      id: 't3',
      text: 'I understand the contract cannot be modified after deployment',
      acknowledged: false
    }],
    onSign: () => alert('Deploying...'),
    onReject: () => alert('Deployment cancelled')
  }
}`,...p.parameters?.docs?.source}}};const xe=["Default","Signing","Signed","WithTimeout","CryptoTransaction"];export{p as CryptoTransaction,l as Default,g as Signed,m as Signing,u as WithTimeout,xe as __namedExportsOrder,_e as default};
