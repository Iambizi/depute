import{r as d,j as e}from"./iframe-B9939OLV.js";import{b as i}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const D="_artifactCard_ke5bq_3",I="_header_ke5bq_16",M="_typeIcon_ke5bq_24",N="_headerContent_ke5bq_36",O="_title_ke5bq_41",q="_typeBadge_ke5bq_49",B="_previewContainer_ke5bq_62",W="_preview_ke5bq_62",H="_previewFade_ke5bq_77",V="_showMore_ke5bq_87",Q="_metadata_ke5bq_116",U="_metadataTable_ke5bq_121",$="_exportActions_ke5bq_147",J="_exportLabel_ke5bq_155",X="_exportBtn_ke5bq_161",z="_provenance_ke5bq_192",r={artifactCard:D,header:I,typeIcon:M,headerContent:N,title:O,typeBadge:q,previewContainer:B,preview:W,previewFade:H,showMore:V,metadata:Q,metadataTable:U,exportActions:$,exportLabel:J,exportBtn:X,provenance:z},T={markdown:"📝",json:"{ }",csv:"📊",code:"< >",other:"📄"},C={markdown:"MD",json:"JSON",csv:"CSV",pr:"PR"};function m({artifact:t,exportFormats:a,onExport:c,showPreview:p=!0,maxPreviewHeight:s="12rem",className:b}){const[n,l]=d.useState(!1),E=()=>l(o=>!o),A=t.metadata&&Object.keys(t.metadata).length>0,P=t.sourceStepId||t.toolCallIds&&t.toolCallIds.length>0;return e.jsxs("article",{className:`${r.artifactCard} ${b??""}`,"aria-label":`Artifact: ${t.title}`,children:[e.jsxs("div",{className:r.header,children:[e.jsx("span",{className:r.typeIcon,"aria-hidden":"true",children:T[t.type]??T.other}),e.jsxs("div",{className:r.headerContent,children:[e.jsx("h3",{className:r.title,children:t.title}),e.jsx("span",{className:r.typeBadge,children:t.type})]})]}),p&&t.content&&e.jsxs("div",{className:r.previewContainer,children:[e.jsx("div",{className:r.preview,style:{maxHeight:n?"none":s,overflow:n?"visible":"hidden"},children:t.content}),!n&&e.jsx("div",{className:r.previewFade}),e.jsx("button",{className:r.showMore,onClick:E,"aria-expanded":n,type:"button",children:n?"Show less":"Show more"})]}),A&&e.jsx("div",{className:r.metadata,children:e.jsx("table",{className:r.metadataTable,children:e.jsx("tbody",{children:Object.entries(t.metadata).map(([o,R])=>e.jsxs("tr",{children:[e.jsx("td",{children:o}),e.jsx("td",{children:R})]},o))})})}),a&&a.length>0&&e.jsxs("div",{className:r.exportActions,children:[e.jsx("span",{className:r.exportLabel,children:"Export:"}),a.map(o=>e.jsx("button",{className:r.exportBtn,onClick:()=>c?.(o),"aria-label":`Export as ${C[o]}`,type:"button",children:C[o]},o))]}),P&&e.jsxs("div",{className:r.provenance,children:[t.sourceStepId&&e.jsxs("span",{children:["Step: ",t.sourceStepId]}),t.toolCallIds&&t.toolCallIds.length>0&&e.jsxs("span",{children:["Tools: ",t.toolCallIds.join(", ")]})]})]})}m.__docgenInfo={description:"",methods:[],displayName:"ArtifactCard",props:{artifact:{required:!0,tsType:{name:"Artifact"},description:"The artifact to display"},exportFormats:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"'markdown' | 'json' | 'csv' | 'pr'",elements:[{name:"literal",value:"'markdown'"},{name:"literal",value:"'json'"},{name:"literal",value:"'csv'"},{name:"literal",value:"'pr'"}]}],raw:"ExportFormat[]"},description:"Available export formats"},onExport:{required:!1,tsType:{name:"signature",type:"function",raw:"(format: ExportFormat) => void",signature:{arguments:[{type:{name:"union",raw:"'markdown' | 'json' | 'csv' | 'pr'",elements:[{name:"literal",value:"'markdown'"},{name:"literal",value:"'json'"},{name:"literal",value:"'csv'"},{name:"literal",value:"'pr'"}]},name:"format"}],return:{name:"void"}}},description:"Called when an export button is clicked"},showPreview:{required:!1,tsType:{name:"boolean"},description:"Whether to show a content preview",defaultValue:{value:"true",computed:!1}},maxPreviewHeight:{required:!1,tsType:{name:"string"},description:"Maximum preview height before truncation",defaultValue:{value:"'12rem'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const K={title:"AX Components/ArtifactCard",component:m,tags:["autodocs"],argTypes:{showPreview:{control:"boolean"},maxPreviewHeight:{control:"text"}}},u=["markdown","json","csv","pr"],x={args:{artifact:i({type:"markdown"}),exportFormats:u,showPreview:!0}},f={args:{artifact:i({type:"markdown",title:"Q4 Analysis Report"}),exportFormats:u,showPreview:!0,maxPreviewHeight:"10rem",onExport:t=>alert(`Exporting as ${t}`)}},y={name:"Type: Markdown",args:{artifact:i({type:"markdown"}),exportFormats:["markdown","pr"],showPreview:!0}},w={name:"Type: JSON",args:{artifact:i({type:"json"}),exportFormats:["json"],showPreview:!0}},h={name:"Type: CSV",args:{artifact:i({type:"csv"}),exportFormats:["csv"],showPreview:!0}},g={name:"Type: Code",args:{artifact:i({type:"code"}),exportFormats:["markdown","json"],showPreview:!0}},v={name:"Quick Start: Prototype Artifact Display",render:()=>{const t=i({type:"markdown",title:"Analysis Report"}),[a,c]=d.useState(null);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx(m,{artifact:t,exportFormats:u,showPreview:!0,onExport:p=>c(p)}),a&&e.jsxs("span",{style:{fontFamily:"sans-serif",fontSize:"0.75rem",color:"#6b7280"},children:["✓ Exported as ",a]})]})}},S={name:"Test Different Artifact Types",render:()=>{const t=["markdown","json","csv","code"],[a,c]=d.useState("markdown"),p=i({type:a});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",fontFamily:"sans-serif",fontSize:"0.75rem"},children:t.map(s=>e.jsx("button",{onClick:()=>c(s),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:a===s?"#1d4ed8":"#fff",color:a===s?"#fff":"#333",cursor:"pointer"},children:s},s))}),e.jsx(m,{artifact:p,exportFormats:u,showPreview:!0})]})}},k={name:"Simulate Real-Time Updates — Export States",render:()=>{const t=i({type:"markdown",title:"Run Summary"}),[a,c]=d.useState(null),[p,s]=d.useState([]),b=n=>{c(n),setTimeout(()=>{c(null),s(l=>[...l,n])},1500)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx(m,{artifact:t,exportFormats:u,showPreview:!0,onExport:b}),e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"0.75rem",color:"#6b7280",display:"flex",flexDirection:"column",gap:"0.25rem"},children:[a&&e.jsxs("span",{children:["⏳ Exporting as ",a,"..."]}),p.map((n,l)=>e.jsxs("span",{children:["✓ Exported as ",n]},l))]})]})}},_={name:"Basic Usage",args:{artifact:{id:"art-001",title:"Customer Churn Analysis",type:"markdown",content:`# Customer Churn Analysis

The model identified 3 primary churn indicators across Q4 data.`,timestamp:new Date().toISOString()},showPreview:!0,exportFormats:["markdown","json"]}},j={name:"With Real API Data — Full Provenance",args:{artifact:{id:"art-002",title:"Refund Processing Summary",type:"json",content:JSON.stringify({processed:142,successful:139,failed:3,total_amount:"$12,847.50"},null,2),timestamp:new Date().toISOString(),metadata:{"Run ID":"run-88a1b",Duration:"4.2s",Model:"gemini-2.0-flash"},sourceStepId:"step-4",toolCallIds:["call-api-001","call-api-002"]},exportFormats:["json","csv"],showPreview:!0}},F={name:"Error Handling — No Content / No Exports",args:{artifact:{id:"art-err",title:"Failed Report",type:"other",content:"",timestamp:new Date().toISOString()},showPreview:!0,exportFormats:[]}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    artifact: generateMockArtifact({
      type: 'markdown'
    }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    artifact: generateMockArtifact({
      type: 'markdown',
      title: 'Q4 Analysis Report'
    }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true,
    maxPreviewHeight: '10rem',
    onExport: fmt => alert(\`Exporting as \${fmt}\`)
  }
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Type: Markdown',
  args: {
    artifact: generateMockArtifact({
      type: 'markdown'
    }),
    exportFormats: ['markdown', 'pr'],
    showPreview: true
  }
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Type: JSON',
  args: {
    artifact: generateMockArtifact({
      type: 'json'
    }),
    exportFormats: ['json'],
    showPreview: true
  }
}`,...w.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Type: CSV',
  args: {
    artifact: generateMockArtifact({
      type: 'csv'
    }),
    exportFormats: ['csv'],
    showPreview: true
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Type: Code',
  args: {
    artifact: generateMockArtifact({
      type: 'code'
    }),
    exportFormats: ['markdown', 'json'],
    showPreview: true
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Artifact Display',
  render: () => {
    const artifact = generateMockArtifact({
      type: 'markdown',
      title: 'Analysis Report'
    });
    const [exported, setExported] = useState<string | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview onExport={fmt => setExported(fmt)} />
        {exported && <span style={{
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
            ✓ Exported as {exported}
          </span>}
      </div>;
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Test Different Artifact Types',
  render: () => {
    const types = ['markdown', 'json', 'csv', 'code'] as const;
    const [current, setCurrent] = useState<typeof types[number]>('markdown');
    const artifact = generateMockArtifact({
      type: current
    });
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem'
      }}>
          {types.map(t => <button key={t} onClick={() => setCurrent(t)} style={{
          padding: '0.25rem 0.625rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: current === t ? '#1d4ed8' : '#fff',
          color: current === t ? '#fff' : '#333',
          cursor: 'pointer'
        }}>
              {t}
            </button>)}
        </div>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Export States',
  render: () => {
    const artifact = generateMockArtifact({
      type: 'markdown',
      title: 'Run Summary'
    });
    const [exportingFmt, setExportingFmt] = useState<ExportFormat | null>(null);
    const [done, setDone] = useState<ExportFormat[]>([]);
    const handleExport = (fmt: ExportFormat) => {
      setExportingFmt(fmt);
      setTimeout(() => {
        setExportingFmt(null);
        setDone(prev => [...prev, fmt]);
      }, 1500);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview onExport={handleExport} />
        <div style={{
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        color: '#6b7280',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
          {exportingFmt && <span>⏳ Exporting as {exportingFmt}...</span>}
          {done.map((f, i) => <span key={i}>✓ Exported as {f}</span>)}
        </div>
      </div>;
  }
}`,...k.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    artifact: {
      id: 'art-001',
      title: 'Customer Churn Analysis',
      type: 'markdown',
      content: '# Customer Churn Analysis\\n\\nThe model identified 3 primary churn indicators across Q4 data.',
      timestamp: new Date().toISOString()
    },
    showPreview: true,
    exportFormats: ['markdown', 'json']
  }
}`,..._.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data — Full Provenance',
  args: {
    artifact: {
      id: 'art-002',
      title: 'Refund Processing Summary',
      type: 'json',
      content: JSON.stringify({
        processed: 142,
        successful: 139,
        failed: 3,
        total_amount: '$12,847.50'
      }, null, 2),
      timestamp: new Date().toISOString(),
      metadata: {
        'Run ID': 'run-88a1b',
        'Duration': '4.2s',
        'Model': 'gemini-2.0-flash'
      },
      sourceStepId: 'step-4',
      toolCallIds: ['call-api-001', 'call-api-002']
    },
    exportFormats: ['json', 'csv'],
    showPreview: true
  }
}`,...j.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — No Content / No Exports',
  args: {
    artifact: {
      id: 'art-err',
      title: 'Failed Report',
      type: 'other',
      content: '',
      timestamp: new Date().toISOString()
    },
    showPreview: true,
    exportFormats: []
  }
}`,...F.parameters?.docs?.source}}};const Z=["Default","AllFeatures","TypeMarkdown","TypeJSON","TypeCSV","TypeCode","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{f as AllFeatures,_ as BasicUsage,x as Default,F as ErrorHandling,v as PrototypeQuickStart,k as SimulateRealTimeUpdates,S as TestVariations,h as TypeCSV,g as TypeCode,w as TypeJSON,y as TypeMarkdown,j as WithRealAPIData,Z as __namedExportsOrder,K as default};
