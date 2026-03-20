import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as o}from"./iframe-Os096Vc4.js";import{g as $}from"./common-DpQzTmW8.js";import{c as j}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const A="_confidenceMeter_1gm3b_3",N="_meterContainer_1gm3b_14",E="_meterTrack_1gm3b_21",R="_meterTrackSm_1gm3b_29",B="_meterTrackMd_1gm3b_30",q="_meterTrackLg_1gm3b_31",U="_meterFill_1gm3b_33",P="_meterFillNoAnimate_1gm3b_39",W="_meterFillHigh_1gm3b_43",Q="_meterFillMedium_1gm3b_44",Z="_meterFillLow_1gm3b_45",O="_badge_1gm3b_51",X="_badgeSm_1gm3b_60",G="_badgeMd_1gm3b_65",J="_badgeLg_1gm3b_70",K="_badgeHigh_1gm3b_75",Y="_badgeMedium_1gm3b_80",ee="_badgeLow_1gm3b_85",ae="_valueLabel_1gm3b_94",se="_valueLabelSm_1gm3b_99",re="_valueLabelMd_1gm3b_100",te="_valueLabelLg_1gm3b_101",le="_levelLabel_1gm3b_103",ne="_dot_1gm3b_109",ie="_dotHigh_1gm3b_115",oe="_dotMedium_1gm3b_116",de="_dotLow_1gm3b_117",me="_reasoning_1gm3b_123",a={confidenceMeter:A,meterContainer:N,meterTrack:E,meterTrackSm:R,meterTrackMd:B,meterTrackLg:q,meterFill:U,meterFillNoAnimate:P,meterFillHigh:W,meterFillMedium:Q,meterFillLow:Z,badge:O,badgeSm:X,badgeMd:G,badgeLg:J,badgeHigh:K,badgeMedium:Y,badgeLow:ee,valueLabel:ae,valueLabelSm:se,valueLabelMd:re,valueLabelLg:te,levelLabel:le,dot:ne,dotHigh:ie,dotMedium:oe,dotLow:de,reasoning:me},S={high:"High",medium:"Medium",low:"Low"};function s({value:r=0,display:i="meter",size:t="md",showValue:m=!0,showLabel:l=!0,reasoning:u,animate:T=!0,className:V}){const n=Math.max(0,Math.min(100,r)),d=o.useMemo(()=>$(n),[n]),C=`Confidence: ${n}%, ${S[d]}`;if(i==="badge"){const F={sm:a.badgeSm,md:a.badgeMd,lg:a.badgeLg}[t],H={high:a.badgeHigh,medium:a.badgeMedium,low:a.badgeLow}[d],I={high:a.dotHigh,medium:a.dotMedium,low:a.dotLow}[d];return e.jsxs("span",{className:`${a.confidenceMeter} ${a.badge} ${F} ${H} ${V??""}`,role:"meter","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":C,children:[e.jsx("span",{className:`${a.dot} ${I}`,"aria-hidden":"true"}),m&&e.jsxs("span",{children:[n,"%"]}),l&&e.jsx("span",{className:a.levelLabel,children:S[d]})]})}const D={sm:a.meterTrackSm,md:a.meterTrackMd,lg:a.meterTrackLg}[t],k={high:a.meterFillHigh,medium:a.meterFillMedium,low:a.meterFillLow}[d],z={sm:a.valueLabelSm,md:a.valueLabelMd,lg:a.valueLabelLg}[t];return e.jsxs("div",{className:`${a.confidenceMeter} ${V??""}`,children:[e.jsxs("div",{className:a.meterContainer,role:"meter","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":C,children:[e.jsx("div",{className:`${a.meterTrack} ${D}`,children:e.jsx("div",{className:`${a.meterFill} ${k} ${T?"":a.meterFillNoAnimate}`,style:{width:`${n}%`}})}),m&&e.jsxs("span",{className:`${a.valueLabel} ${z}`,children:[n,"%"]}),l&&e.jsx("span",{className:`${a.levelLabel} ${z}`,children:S[d]})]}),u&&e.jsx("div",{className:a.reasoning,children:u})]})}s.__docgenInfo={description:"",methods:[],displayName:"ConfidenceMeter",props:{value:{required:!1,tsType:{name:"number"},description:"Confidence score from 0-100",defaultValue:{value:"0",computed:!1}},display:{required:!1,tsType:{name:"union",raw:"'meter' | 'badge'",elements:[{name:"literal",value:"'meter'"},{name:"literal",value:"'badge'"}]},description:"Display variant — meter (bar) or badge (compact inline)",defaultValue:{value:"'meter'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Size of the component",defaultValue:{value:"'md'",computed:!1}},showValue:{required:!1,tsType:{name:"boolean"},description:"Show numeric percentage",defaultValue:{value:"true",computed:!1}},showLabel:{required:!1,tsType:{name:"boolean"},description:"Show label (High/Medium/Low)",defaultValue:{value:"true",computed:!1}},reasoning:{required:!1,tsType:{name:"string"},description:"Reasoning for the confidence score"},animate:{required:!1,tsType:{name:"boolean"},description:"Whether to animate value changes",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const be={title:"AX Components/ConfidenceMeter",component:s,tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},display:{control:"select",options:["meter","badge"]},size:{control:"select",options:["sm","md","lg"]},showValue:{control:"boolean"},showLabel:{control:"boolean"},animate:{control:"boolean"}}},c={args:{value:82,display:"meter",size:"md",showValue:!0,showLabel:!0}},p={args:{value:74,display:"meter",size:"lg",showValue:!0,showLabel:!0,animate:!0,reasoning:"Score is slightly lower due to ambiguous phrasing in the third source document."}},g={name:"Level: High (≥80)",args:{value:91,display:"meter",showValue:!0,showLabel:!0}},h={name:"Level: Medium (40–79)",args:{value:63,display:"meter",showValue:!0,showLabel:!0}},b={name:"Level: Low (<40)",args:{value:22,display:"meter",showValue:!0,showLabel:!0}},v={name:"Display: Badge",render:()=>e.jsxs("div",{style:{display:"flex",gap:"0.75rem",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(s,{value:91,display:"badge",size:"sm",showLabel:!0,showValue:!0}),e.jsx(s,{value:63,display:"badge",size:"md",showLabel:!0,showValue:!0}),e.jsx(s,{value:22,display:"badge",size:"lg",showLabel:!0,showValue:!0})]})},f={name:"Display: All Sizes (Meter)",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"280px"},children:[e.jsx(s,{value:75,display:"meter",size:"sm",showLabel:!0,showValue:!0}),e.jsx(s,{value:75,display:"meter",size:"md",showLabel:!0,showValue:!0}),e.jsx(s,{value:75,display:"meter",size:"lg",showLabel:!0,showValue:!0})]})},w={name:"Quick Start: Prototype Confidence Display",render:()=>{const[r,i]=o.useState(j());return o.useEffect(()=>{const t=setInterval(()=>{i(j())},2e3);return()=>clearInterval(t)},[]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"280px"},children:[e.jsx(s,{value:r,display:"meter",size:"lg",showValue:!0,showLabel:!0,animate:!0}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.75rem",color:"#888"},children:"Updates every 2s"})]})}},y={name:"Test Different Display Configurations",render:()=>{const[r,i]=o.useState(75);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx("input",{type:"range",min:0,max:100,value:r,onChange:t=>i(Number(t.target.value)),style:{width:"280px"}}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",width:"280px"},children:[e.jsx(s,{value:r,display:"meter",size:"sm",showValue:!0,showLabel:!0,animate:!0}),e.jsx(s,{value:r,display:"meter",size:"md",showValue:!0,showLabel:!0,animate:!0}),e.jsx(s,{value:r,display:"badge",size:"md",showValue:!0,showLabel:!0})]})]})}},L={name:"Simulate Real-Time Updates — Live Score",render:()=>{const[r,i]=o.useState(50),[t,m]=o.useState(void 0);return o.useEffect(()=>{let l=50;const u=setInterval(()=>{l=Math.max(0,Math.min(100,l+(Math.random()-.5)*30)),i(Math.round(l)),m(l>=80?"All source documents are consistent and high-quality.":l>=40?"Some ambiguity detected in source material.":"Insufficient data to make a confident determination.")},1500);return()=>clearInterval(u)},[]),e.jsx("div",{style:{width:"320px",display:"flex",flexDirection:"column",gap:"0.75rem"},children:e.jsx(s,{value:r,display:"meter",size:"lg",showValue:!0,showLabel:!0,animate:!0,reasoning:t})})}},x={name:"Basic Usage",args:{value:87,display:"meter",showLabel:!0,showValue:!0}},_={name:"With Real API Data — Inline Badge",render:()=>e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"0.875rem",display:"flex",alignItems:"center",gap:"0.5rem",color:"#374151"},children:[e.jsx("span",{children:"Extracting key metrics"}),e.jsx(s,{value:84,display:"badge",size:"sm",showLabel:!0})]})},M={name:"Error Handling — Zero / Missing Score",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",width:"280px"},children:[e.jsx(s,{value:0,display:"meter",size:"md",showValue:!0,showLabel:!0}),e.jsx(s,{value:void 0,display:"meter",size:"md",showValue:!0,showLabel:!0}),e.jsx(s,{value:-10,display:"meter",size:"md",showValue:!0,showLabel:!0}),e.jsx(s,{value:150,display:"meter",size:"md",showValue:!0,showLabel:!0})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: 82,
    display: 'meter',
    size: 'md',
    showValue: true,
    showLabel: true
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 74,
    display: 'meter',
    size: 'lg',
    showValue: true,
    showLabel: true,
    animate: true,
    reasoning: 'Score is slightly lower due to ambiguous phrasing in the third source document.'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Level: High (≥80)',
  args: {
    value: 91,
    display: 'meter',
    showValue: true,
    showLabel: true
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Level: Medium (40–79)',
  args: {
    value: 63,
    display: 'meter',
    showValue: true,
    showLabel: true
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Level: Low (<40)',
  args: {
    value: 22,
    display: 'meter',
    showValue: true,
    showLabel: true
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Display: Badge',
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <ConfidenceMeter value={91} display="badge" size="sm" showLabel showValue />
      <ConfidenceMeter value={63} display="badge" size="md" showLabel showValue />
      <ConfidenceMeter value={22} display="badge" size="lg" showLabel showValue />
    </div>
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Display: All Sizes (Meter)',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '280px'
  }}>
      <ConfidenceMeter value={75} display="meter" size="sm" showLabel showValue />
      <ConfidenceMeter value={75} display="meter" size="md" showLabel showValue />
      <ConfidenceMeter value={75} display="meter" size="lg" showLabel showValue />
    </div>
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Confidence Display',
  render: () => {
    const [value, setValue] = useState(generateRandomConfidence());
    useEffect(() => {
      const interval = setInterval(() => {
        setValue(generateRandomConfidence());
      }, 2000);
      return () => clearInterval(interval);
    }, []);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '280px'
    }}>
        <ConfidenceMeter value={value} display="meter" size="lg" showValue showLabel animate />
        <span style={{
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: '#888'
      }}>
          Updates every 2s
        </span>
      </div>;
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Test Different Display Configurations',
  render: () => {
    const [value, setValue] = useState(75);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
        <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} style={{
        width: '280px'
      }} />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '280px'
      }}>
          <ConfidenceMeter value={value} display="meter" size="sm" showValue showLabel animate />
          <ConfidenceMeter value={value} display="meter" size="md" showValue showLabel animate />
          <ConfidenceMeter value={value} display="badge" size="md" showValue showLabel />
        </div>
      </div>;
  }
}`,...y.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Live Score',
  render: () => {
    const [score, setScore] = useState(50);
    const [reasoning, setReasoning] = useState<string | undefined>(undefined);
    useEffect(() => {
      let current = 50;
      const interval = setInterval(() => {
        // Drift score ±15 per tick, clamped 0–100
        current = Math.max(0, Math.min(100, current + (Math.random() - 0.5) * 30));
        setScore(Math.round(current));
        setReasoning(current >= 80 ? 'All source documents are consistent and high-quality.' : current >= 40 ? 'Some ambiguity detected in source material.' : 'Insufficient data to make a confident determination.');
      }, 1500);
      return () => clearInterval(interval);
    }, []);
    return <div style={{
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
        <ConfidenceMeter value={score} display="meter" size="lg" showValue showLabel animate reasoning={reasoning} />
      </div>;
  }
}`,...L.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    value: 87,
    display: 'meter',
    showLabel: true,
    showValue: true
  }
}`,...x.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data — Inline Badge',
  render: () => <div style={{
    fontFamily: 'sans-serif',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#374151'
  }}>
      <span>Extracting key metrics</span>
      <ConfidenceMeter value={84} display="badge" size="sm" showLabel />
    </div>
}`,..._.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — Zero / Missing Score',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '280px'
  }}>
      <ConfidenceMeter value={0} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={undefined} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={-10} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={150} display="meter" size="md" showValue showLabel />
    </div>
}`,...M.parameters?.docs?.source}}};const ve=["Default","AllFeatures","HighConfidence","MediumConfidence","LowConfidence","BadgeDisplay","AllSizes","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{p as AllFeatures,f as AllSizes,v as BadgeDisplay,x as BasicUsage,c as Default,M as ErrorHandling,g as HighConfidence,b as LowConfidence,h as MediumConfidence,w as PrototypeQuickStart,L as SimulateRealTimeUpdates,y as TestVariations,_ as WithRealAPIData,ve as __namedExportsOrder,be as default};
