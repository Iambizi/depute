import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as p}from"./iframe-DLl0a6ph.js";import{V as D}from"./a11y-CKuWmtce.js";import"./preload-helper-PPVm8Dsz.js";const I="_stateDiff_l4f1o_4",R="_header_l4f1o_16",L="_headerToggle_l4f1o_25",E="_collapseIcon_l4f1o_42",B="_title_l4f1o_49",H="_changeBadge_l4f1o_55",M="_meta_l4f1o_68",q="_metaItem_l4f1o_74",P="_description_l4f1o_84",F="_body_l4f1o_96",G="_group_l4f1o_100",V="_groupLabel_l4f1o_106",O="_entry_l4f1o_119",z="_entrySymbol_l4f1o_132",Z="_entryPath_l4f1o_140",W="_entryValues_l4f1o_148",k="_arrow_l4f1o_156",J="_changeAdded_l4f1o_165",Y="_changeRemoved_l4f1o_166",K="_changeModified_l4f1o_167",Q="_changeUnchanged_l4f1o_168",X="_valueBefore_l4f1o_170",ee="_valueAfter_l4f1o_176",ae="_valueUnchanged_l4f1o_181",n={stateDiff:I,header:R,headerToggle:L,collapseIcon:E,title:B,changeBadge:H,meta:M,metaItem:q,description:P,body:F,group:G,groupLabel:V,entry:O,entrySymbol:z,entryPath:Z,entryValues:W,arrow:k,changeAdded:J,changeRemoved:Y,changeModified:K,changeUnchanged:Q,valueBefore:X,valueAfter:ee,valueUnchanged:ae},ne={added:"Added",removed:"Removed",modified:"Modified",unchanged:"Unchanged"},te={added:"+",removed:"−",modified:"~",unchanged:" "},re={added:n.changeAdded,removed:n.changeRemoved,modified:n.changeModified,unchanged:n.changeUnchanged};function r(e){return e==null?"—":typeof e=="boolean"?e?"true":"false":String(e)}function w(e){if(e.label)return e.label;const t=e.path.split(".");return t[t.length-1]}function se(e,t){return t?e.filter(o=>o.type!=="unchanged"):e}function oe(e){return e.filter(t=>t.type!=="unchanged").length}function de({entry:e}){return a.jsxs("div",{className:`${n.entry} ${re[e.type]}`,role:"row",children:[a.jsx("span",{className:n.entrySymbol,"aria-hidden":"true",children:te[e.type]}),a.jsx("span",{className:n.entryPath,children:w(e)}),a.jsx("span",{className:n.entryValues,children:e.type==="added"?a.jsx("span",{className:n.valueAfter,children:r(e.after)}):e.type==="removed"?a.jsx("span",{className:n.valueBefore,children:r(e.before)}):e.type==="modified"?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:n.valueBefore,children:r(e.before)}),a.jsx("span",{className:n.arrow,"aria-hidden":"true",children:"→"}),a.jsx("span",{className:n.valueAfter,children:r(e.after)})]}):a.jsx("span",{className:n.valueUnchanged,children:r(e.before)})}),a.jsx(D,{children:`${w(e)}: ${ne[e.type]}${e.type==="modified"?` from ${r(e.before)} to ${r(e.after)}`:e.type==="added"?` value ${r(e.after)}`:e.type==="removed"?` value ${r(e.before)}`:""}`})]})}function C({title:e,description:t,entries:o,groups:l,hideUnchanged:T=!1,defaultCollapsed:U=!1,changeCount:_,timestamp:v,sourceId:S,className:N}){const[d,$]=p.useState(U),x=p.useMemo(()=>l&&l.length>0?l:o&&o.length>0?[{label:"",entries:o}]:[],[l,o]),i=p.useMemo(()=>_??x.reduce((s,c)=>s+oe(c.entries),0),[x,_]),j=p.useMemo(()=>`${e}: ${i} field${i!==1?"s":""} changed`,[e,i]);return a.jsxs("div",{className:`${n.stateDiff} ${N??""}`,role:"region","aria-label":j,children:[a.jsxs("div",{className:n.header,children:[a.jsxs("button",{type:"button",className:n.headerToggle,onClick:()=>$(s=>!s),"aria-expanded":!d,"aria-label":d?`Expand ${e}`:`Collapse ${e}`,children:[a.jsx("span",{className:n.collapseIcon,"aria-hidden":"true",children:d?"▸":"▾"}),a.jsx("span",{className:n.title,children:e})]}),a.jsxs("span",{className:n.changeBadge,children:[i," change",i!==1?"s":""]}),(v||S)&&a.jsxs("span",{className:n.meta,children:[v&&a.jsx("span",{className:n.metaItem,children:v}),S&&a.jsxs("span",{className:n.metaItem,children:["#",S]})]})]}),t&&!d&&a.jsx("p",{className:n.description,children:t}),!d&&a.jsx("div",{className:n.body,role:"table","aria-label":"State changes",children:x.map(s=>{const c=se(s.entries,T);return c.length===0?null:a.jsxs("div",{className:n.group,children:[s.label&&a.jsx("div",{className:n.groupLabel,role:"rowgroup",children:s.label}),c.map(A=>a.jsx(de,{entry:A},A.path))]},s.label||"default")})})]})}C.__docgenInfo={description:"",methods:[],displayName:"StateDiff",props:{title:{required:!0,tsType:{name:"string"},description:'Title of the diff (e.g. "Database Mutation", "Ledger Update")'},description:{required:!1,tsType:{name:"string"},description:"Optional description of the mutation context"},entries:{required:!1,tsType:{name:"Array",elements:[{name:"DiffEntry"}],raw:"DiffEntry[]"},description:"Flat list of diff entries (used if groups is not provided)"},groups:{required:!1,tsType:{name:"Array",elements:[{name:"DiffGroup"}],raw:"DiffGroup[]"},description:"Grouped diff entries (takes precedence over entries)"},hideUnchanged:{required:!1,tsType:{name:"boolean"},description:"Whether to show only changed entries (hide 'unchanged')",defaultValue:{value:"false",computed:!1}},defaultCollapsed:{required:!1,tsType:{name:"boolean"},description:"Whether entries start collapsed (default: false)",defaultValue:{value:"false",computed:!1}},changeCount:{required:!1,tsType:{name:"number"},description:"Total number of fields affected (badge display)"},timestamp:{required:!1,tsType:{name:"string"},description:"Timestamp of the mutation"},sourceId:{required:!1,tsType:{name:"string"},description:"ID of the tool call or step that triggered this mutation"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const fe={title:"v2 — Compliance & Forensics/StateDiff",component:C,parameters:{layout:"padded",docs:{description:{component:"Structured before/after view of state mutations. Shows exactly what an agent changed in a database, ledger, or infrastructure — not natural language summaries, but field-level proof."}}},tags:["autodocs"],argTypes:{hideUnchanged:{control:"boolean"},defaultCollapsed:{control:"boolean"}}},f={args:{title:"User Record Update",description:"Agent modified 3 fields in the user profile database",entries:[{path:"user.email",type:"modified",before:"alice@old.com",after:"alice@new.com"},{path:"user.name",type:"unchanged",before:"Alice Johnson"},{path:"user.role",type:"added",after:"admin"},{path:"user.legacy_id",type:"removed",before:"USR-12345"}],timestamp:"2026-03-19T12:00:00Z",sourceId:"tool-42"}},u={args:{title:"Ledger Update",description:"Agent processed a payment across two accounts",groups:[{label:"Sender Account",entries:[{path:"sender.balance",type:"modified",before:5e3,after:4500},{path:"sender.last_tx",type:"modified",before:"2026-03-18",after:"2026-03-19"}]},{label:"Receiver Account",entries:[{path:"receiver.balance",type:"modified",before:1200,after:1700},{path:"receiver.last_tx",type:"modified",before:"2026-03-15",after:"2026-03-19"}]}],timestamp:"2026-03-19T14:30:00Z"}},m={name:"Hide Unchanged Fields",args:{title:"Config Update",entries:[{path:"config.timeout",type:"modified",before:30,after:60},{path:"config.retries",type:"unchanged",before:3},{path:"config.region",type:"unchanged",before:"us-east-1"},{path:"config.debug",type:"added",after:!0}],hideUnchanged:!0}},h={args:{title:"Infrastructure Mutation",entries:[{path:"instance.type",type:"modified",before:"t3.micro",after:"t3.large"},{path:"instance.count",type:"modified",before:2,after:5}],defaultCollapsed:!0}},g={name:"💰 Fintech: Ledger Delta",args:{title:"Transaction Ledger",description:"Agent executed a wire transfer of $500",groups:[{label:"Source Account (****4521)",entries:[{path:"balance.available",type:"modified",label:"Available Balance",before:"$12,450.00",after:"$11,950.00"},{path:"balance.pending",type:"unchanged",label:"Pending",before:"$0.00"},{path:"tx.count",type:"modified",label:"Transaction Count",before:47,after:48}]},{label:"Destination Account (****8903)",entries:[{path:"balance.available",type:"modified",label:"Available Balance",before:"$3,200.00",after:"$3,700.00"}]}],timestamp:"2026-03-19T14:32:11Z",sourceId:"wire-transfer-891"}},b={name:"🔧 DevOps: Terraform Plan",args:{title:"Infrastructure Changes",description:"Agent applied Terraform plan — 3 resources modified, 1 added",groups:[{label:"aws_instance.api_server",entries:[{path:"instance_type",type:"modified",before:"t3.medium",after:"t3.xlarge"},{path:"ebs_size_gb",type:"modified",before:50,after:100}]},{label:"aws_rds.primary",entries:[{path:"engine_version",type:"modified",before:"15.2",after:"16.1"},{path:"multi_az",type:"unchanged",before:!0}]},{label:"aws_cloudwatch.alarm (NEW)",entries:[{path:"metric",type:"added",after:"CPUUtilization"},{path:"threshold",type:"added",after:"80%"},{path:"action",type:"added",after:"SNS:arn:...ops-alerts"}]}],changeCount:6}},y={name:"👥 HR: Candidate Record",args:{title:"Candidate Status Update",entries:[{path:"status",type:"modified",label:"Status",before:"Screening",after:"Interview Scheduled"},{path:"interviewer",type:"added",label:"Assigned Interviewer",after:"Sarah Chen"},{path:"interview_date",type:"added",label:"Interview Date",after:"2026-03-25"},{path:"resume_score",type:"unchanged",label:"Resume Score",before:"87/100"}]}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'User Record Update',
    description: 'Agent modified 3 fields in the user profile database',
    entries: [{
      path: 'user.email',
      type: 'modified',
      before: 'alice@old.com',
      after: 'alice@new.com'
    }, {
      path: 'user.name',
      type: 'unchanged',
      before: 'Alice Johnson'
    }, {
      path: 'user.role',
      type: 'added',
      after: 'admin'
    }, {
      path: 'user.legacy_id',
      type: 'removed',
      before: 'USR-12345'
    }],
    timestamp: '2026-03-19T12:00:00Z',
    sourceId: 'tool-42'
  }
}`,...f.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Ledger Update',
    description: 'Agent processed a payment across two accounts',
    groups: [{
      label: 'Sender Account',
      entries: [{
        path: 'sender.balance',
        type: 'modified',
        before: 5000,
        after: 4500
      }, {
        path: 'sender.last_tx',
        type: 'modified',
        before: '2026-03-18',
        after: '2026-03-19'
      }]
    }, {
      label: 'Receiver Account',
      entries: [{
        path: 'receiver.balance',
        type: 'modified',
        before: 1200,
        after: 1700
      }, {
        path: 'receiver.last_tx',
        type: 'modified',
        before: '2026-03-15',
        after: '2026-03-19'
      }]
    }],
    timestamp: '2026-03-19T14:30:00Z'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Hide Unchanged Fields',
  args: {
    title: 'Config Update',
    entries: [{
      path: 'config.timeout',
      type: 'modified',
      before: 30,
      after: 60
    }, {
      path: 'config.retries',
      type: 'unchanged',
      before: 3
    }, {
      path: 'config.region',
      type: 'unchanged',
      before: 'us-east-1'
    }, {
      path: 'config.debug',
      type: 'added',
      after: true
    }],
    hideUnchanged: true
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Infrastructure Mutation',
    entries: [{
      path: 'instance.type',
      type: 'modified',
      before: 't3.micro',
      after: 't3.large'
    }, {
      path: 'instance.count',
      type: 'modified',
      before: 2,
      after: 5
    }],
    defaultCollapsed: true
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: '💰 Fintech: Ledger Delta',
  args: {
    title: 'Transaction Ledger',
    description: 'Agent executed a wire transfer of $500',
    groups: [{
      label: 'Source Account (****4521)',
      entries: [{
        path: 'balance.available',
        type: 'modified',
        label: 'Available Balance',
        before: '$12,450.00',
        after: '$11,950.00'
      }, {
        path: 'balance.pending',
        type: 'unchanged',
        label: 'Pending',
        before: '$0.00'
      }, {
        path: 'tx.count',
        type: 'modified',
        label: 'Transaction Count',
        before: 47,
        after: 48
      }]
    }, {
      label: 'Destination Account (****8903)',
      entries: [{
        path: 'balance.available',
        type: 'modified',
        label: 'Available Balance',
        before: '$3,200.00',
        after: '$3,700.00'
      }]
    }],
    timestamp: '2026-03-19T14:32:11Z',
    sourceId: 'wire-transfer-891'
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: '🔧 DevOps: Terraform Plan',
  args: {
    title: 'Infrastructure Changes',
    description: 'Agent applied Terraform plan — 3 resources modified, 1 added',
    groups: [{
      label: 'aws_instance.api_server',
      entries: [{
        path: 'instance_type',
        type: 'modified',
        before: 't3.medium',
        after: 't3.xlarge'
      }, {
        path: 'ebs_size_gb',
        type: 'modified',
        before: 50,
        after: 100
      }]
    }, {
      label: 'aws_rds.primary',
      entries: [{
        path: 'engine_version',
        type: 'modified',
        before: '15.2',
        after: '16.1'
      }, {
        path: 'multi_az',
        type: 'unchanged',
        before: true
      }]
    }, {
      label: 'aws_cloudwatch.alarm (NEW)',
      entries: [{
        path: 'metric',
        type: 'added',
        after: 'CPUUtilization'
      }, {
        path: 'threshold',
        type: 'added',
        after: '80%'
      }, {
        path: 'action',
        type: 'added',
        after: 'SNS:arn:...ops-alerts'
      }]
    }],
    changeCount: 6
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: '👥 HR: Candidate Record',
  args: {
    title: 'Candidate Status Update',
    entries: [{
      path: 'status',
      type: 'modified',
      label: 'Status',
      before: 'Screening',
      after: 'Interview Scheduled'
    }, {
      path: 'interviewer',
      type: 'added',
      label: 'Assigned Interviewer',
      after: 'Sarah Chen'
    }, {
      path: 'interview_date',
      type: 'added',
      label: 'Interview Date',
      after: '2026-03-25'
    }, {
      path: 'resume_score',
      type: 'unchanged',
      label: 'Resume Score',
      before: '87/100'
    }]
  }
}`,...y.parameters?.docs?.source}}};const ue=["Default","Grouped","HideUnchanged","StartCollapsed","FintechLedger","DevOpsTerraform","HRCandidate"];export{f as Default,b as DevOpsTerraform,g as FintechLedger,u as Grouped,y as HRCandidate,m as HideUnchanged,h as StartCollapsed,ue as __namedExportsOrder,fe as default};
