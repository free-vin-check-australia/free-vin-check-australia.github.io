(function(){
'use strict';
var TRANS={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9};
var WEIGHTS=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];
var YEAR_CODES='ABCDEFGHJKLMNPRSTVWXY123456789';
var THIS_YEAR=new Date().getFullYear();
var API='https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/';

var COUNTRIES=[['AA','AH','South Africa'],['JA','JZ','Japan'],['KA','KE','Sri Lanka'],['KL','KR','South Korea'],['LA','LZ','China'],
['MA','ME','India'],['MF','MK','Indonesia'],['ML','MR','Thailand'],['NL','NR','Turkey'],['PA','PE','Philippines'],['PL','PR','Malaysia'],['RF','RK','Taiwan'],['RL','RZ','Vietnam'],
['SA','SM','United Kingdom'],['SN','ST','Germany'],['SU','SZ','Poland'],['TA','TH','Switzerland'],['TJ','TP','Czechia'],['TR','TV','Hungary'],
['VA','VE','Austria'],['VF','VR','France'],['VS','VW','Spain'],['WA','W9','Germany'],['XL','XR','Netherlands'],['XS','XW','Russia'],
['YA','YE','Belgium'],['YF','YK','Finland'],['YS','YW','Sweden'],['ZA','ZR','Italy'],
['8A','8E','Argentina'],['8F','8K','Chile'],['9A','9E','Brazil'],['9F','9J','Colombia'],['93','99','Brazil']];
var FIRST={'1':'United States','4':'United States','5':'United States','2':'Canada','3':'Mexico','6':'Australia','7':'New Zealand',J:'Japan',K:'South Korea',L:'China',W:'Germany',Z:'Italy'};
function ck(c){return /\d/.test(c)?100+parseInt(c,10):c.charCodeAt(0)}
function country(v){
  if(!v) return '';
  if(v.length>1){var t=v.slice(0,2);
    for(var i=0;i<COUNTRIES.length;i++){var c=COUNTRIES[i];
      if(t[0]===c[0][0]&&ck(t[1])>=ck(c[0][1])&&ck(t[1])<=ck(c[1][1])) return c[2];}}
  return FIRST[v[0]]||'';
}
var WMI={'6G1':'Holden (Australia)','6G2':'Pontiac (Australia)','6H8':'Holden (Australia)','6FP':'Ford (Australia)','6F4':'Nissan (Australia)','6T1':'Toyota (Australia)','6MM':'Mitsubishi (Australia)',
'JTD':'Toyota','JTE':'Toyota','JTM':'Toyota','JTN':'Toyota','JTH':'Lexus','JTJ':'Lexus','JT2':'Toyota','JT3':'Toyota','JN1':'Nissan','JN8':'Nissan','JM1':'Mazda','JM3':'Mazda','JMZ':'Mazda','JF1':'Subaru','JF2':'Subaru','JS3':'Suzuki','JSA':'Suzuki','JS1':'Suzuki (motorcycle)','JH4':'Acura','JHM':'Honda','JHL':'Honda','JMB':'Mitsubishi','JMY':'Mitsubishi','JA3':'Mitsubishi','JAA':'Isuzu','JAL':'Isuzu','JKA':'Kawasaki','JYA':'Yamaha',
'KMH':'Hyundai','KMF':'Hyundai','KNA':'Kia','KND':'Kia','KNM':'Kia','KPT':'SsangYong','KL1':'Daewoo / Holden Korea',
'LFV':'FAW-Volkswagen','LSV':'SAIC-Volkswagen','LVS':'Ford (China)','LRW':'Tesla (China)','LGB':'Dongfeng','LB3':'Geely','LSG':'Chevrolet (China)','LVV':'Chery','LGX':'BYD','LC0':'BYD','LPS':'Polestar','LGW':'Great Wall','LMG':'GAC','LNB':'BAIC',
'MR0':'Toyota (Thailand)','MMM':'Chevrolet (Thailand)','MNB':'Ford (Thailand)','MPA':'Isuzu (Thailand)','MMB':'Mitsubishi (Thailand)','MA1':'Mahindra','MAT':'Tata','MHF':'Toyota (Indonesia)',
'WVW':'Volkswagen','WVG':'Volkswagen','WV1':'Volkswagen commercial','WV2':'Volkswagen commercial','WAU':'Audi','WBA':'BMW','WBS':'BMW M','WBY':'BMW','WDB':'Mercedes-Benz','WDC':'Mercedes-Benz','WDD':'Mercedes-Benz','W1K':'Mercedes-Benz','W1V':'Mercedes-Benz vans','WP0':'Porsche','WF0':'Ford (Germany)','W0L':'Opel / Vauxhall','WMW':'MINI',
'VF1':'Renault','VF3':'Peugeot','VF7':'Citroen','VSS':'SEAT','TMB':'Skoda','YV1':'Volvo','YV4':'Volvo','YS3':'Saab','ZFA':'Fiat','ZAR':'Alfa Romeo','ZFF':'Ferrari','ZHW':'Lamborghini','ZAM':'Maserati',
'SAJ':'Jaguar','SAL':'Land Rover','SCC':'Lotus','SCF':'Aston Martin','SBM':'McLaren','SAT':'Triumph',
'1FA':'Ford','1FT':'Ford truck','1FM':'Ford SUV','1G1':'Chevrolet','1GC':'Chevrolet truck','1GT':'GMC truck','1GY':'Cadillac','1C4':'Chrysler / Jeep / Ram','1C3':'Chrysler','1J4':'Jeep','1N4':'Nissan (USA)','1HG':'Honda (USA)','1HD':'Harley-Davidson','1LN':'Lincoln',
'2HG':'Honda (Canada)','2T1':'Toyota (Canada)','3VW':'Volkswagen (Mexico)','3N1':'Nissan (Mexico)','4T1':'Toyota (USA)','5YJ':'Tesla','7SA':'Tesla','5UX':'BMW (USA)','5J6':'Honda (USA)','5FN':'Honda (USA)','5NP':'Hyundai (USA)','5XY':'Kia (USA)',
'9BW':'Volkswagen (Brazil)','9BG':'Chevrolet (Brazil)'};
function maker(v){return (v.length>=3&&WMI[v.slice(0,3)])||(v.length>=2&&WMI[v.slice(0,2)])||''}
function checkDigit(v){
  if(v.length!==17) return null;
  var sum=0;
  for(var i=0;i<17;i++){var c=v[i],n=/\d/.test(c)?+c:TRANS[c];if(n===undefined) return null;sum+=n*WEIGHTS[i];}
  var r=sum%11;return r===10?'X':String(r);
}
function years(code){var i=YEAR_CODES.indexOf(code);return i<0?[]:[1980+i,2010+i]}
function likely(ys){return ys[1]<=THIS_YEAR+1?ys[1]:ys[0]}
function parse(raw){
  // Ignore normal visual separators, but do not silently erase other invalid symbols.
  var v=String(raw==null?'':raw).toUpperCase().replace(/[\s-]/g,''),b=[],invalid=[];
  for(var i=0;i<v.length;i++){
    if(/[IOQ]/.test(v[i])&&b.indexOf(v[i])<0) b.push(v[i]);
    else if(!/[A-HJ-NPR-Z0-9]/.test(v[i])&&invalid.indexOf(v[i])<0) invalid.push(v[i]);
  }
  return {v:v,banned:b,invalid:invalid};
}
var FIELDS=[['Make','Make','Vehicle details'],['Model','Model','Vehicle details'],['ModelYear','Model year','Vehicle details'],['ManufacturerName','Manufacturer','Vehicle details'],['VehicleType','Vehicle type','Vehicle details'],['BodyClass','Body class','Vehicle details'],['Series','Series','Vehicle details'],['Trim','Trim','Vehicle details'],
['EngineModel','Engine model','Engine and drivetrain'],['EngineCylinders','Cylinders','Engine and drivetrain'],['DisplacementL','Displacement (L)','Engine and drivetrain'],['FuelTypePrimary','Primary fuel','Engine and drivetrain'],['DriveType','Drive type','Engine and drivetrain'],['TransmissionStyle','Transmission','Engine and drivetrain'],
['PlantCountry','Plant country','Manufacturing'],['PlantCity','Plant city','Manufacturing'],['PlantState','Plant state','Manufacturing']];
function useful(x){var t=String(x==null?'':x).trim();return !!t&&!/^(not applicable|not available|0|0\.0|unknown)$/i.test(t)}
function pickFields(data){return FIELDS.filter(function(f){return useful(data[f[0]])}).map(function(f){return {label:f[1],group:f[2],value:String(data[f[0]]).trim()}})}
if(typeof document==='undefined'){ if(typeof module!=='undefined') module.exports={parse:parse,checkDigit:checkDigit,years:years,likely:likely,country:country,maker:maker,pickFields:pickFields}; return; }

var $=function(id){return document.getElementById(id)};
var input=$('vin'); if(!input) return;
var cellsEl=$('cells'),results=$('results'),pill=$('pill'),statusText=$('statusText'),nextVin=$('nextVin'),copied=$('copied'),count=$('count'),btn=$('decodeBtn');
var dec=$('decode'),dTitle=$('decodeTitle'),dMsg=$('decodeMsg'),dGrid=$('decodeGrid'),dSrc=$('decodeSrc');
var cls=function(i){return i<3?'w':i<8?'v':i===8?'c':i===9?'y':i===10?'p':'s'};
var cells=[];
for(var i=0;i<17;i++){var d=document.createElement('div');d.className='cell '+cls(i);cellsEl.appendChild(d);cells.push(d);}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function item(t,v,n,c){return '<div class="item" style="--c:'+c+'"><h3>'+esc(t)+'</h3><div class="v">'+esc(v)+'</div>'+(n?'<p>'+esc(n)+'</p>':'')+'</div>'}
function status(c,l,t){pill.className='pill '+c;pill.textContent=l;statusText.textContent=t}
var lastDecoded='';
var activeController=null;
var requestSeq=0;

function render(){
  var p=parse(input.value),v=p.v;
  count.textContent=v.length+' / 17';
  for(var i=0;i<17;i++){var ch=v[i]||'';cells[i].textContent=ch;cells[i].classList.toggle('on',!!ch);cells[i].classList.toggle('bad',/[IOQ]/.test(ch));}
  nextVin.textContent=v||'-';
  if(v!==lastDecoded){dec.hidden=true}
  var numLast=v.length===17&&/\d{3}$/.test(v);
  if(!v){status('idle','Ready','Enter a VIN to see the result.');results.innerHTML='';return;}
  if(p.invalid.length) status('bad','Invalid characters','Remove or correct these characters: '+p.invalid.join(', ')+'. Only letters A–Z and numbers 0–9 are allowed, apart from spaces or hyphens.');
  else if(p.banned.length) status('bad','Invalid letters','VINs never contain I, O or Q. Found: '+p.banned.join(', ')+'. Check for a misread 1 or 0.');
  else if(v.length<17) status('warn',v.length+' of 17','Keep typing. Vehicles supplied to the Australian market from 1 January 1989 generally require a 17-character VIN.');
  else if(v.length>17) status('bad','Too long',v.length+' characters entered. Remove '+(v.length-17)+'.');
  else if(!numLast) status('warn','Check last 3','17 characters and no banned letters, but Australian Government guidance says the last three characters must be numbers. Compare with the vehicle and its papers.');
  else status('good','Format OK','17 characters, no banned letters, and the last three are numbers. This confirms the format, not the vehicle’s history.');
  var h='',ct=country(v),mk=maker(v);
  if(ct) h+=item('Country of manufacture',ct,'Read from the first character'+(v.length>1?'s':'')+'.','var(--s-wmi)');
  if(v.length>=3) h+=item('Maker code (WMI)',v.slice(0,3),mk||'Not in this tool’s short list of makers.','var(--s-wmi)');
  if(v.length>=10){
    var ys=years(v[9]);
    if(ys.length){var l=likely(ys);h+=item('Model year code',v[9]+' = '+l+' or '+(l===ys[1]?ys[0]:ys[1]),'The code repeats every 30 years, so '+l+' is the likelier for a car on the road today. Some makers don’t use this position for the year.','var(--s-year)');}
    else h+=item('Model year code',v[9],'Not a valid year code. U, Z and 0 are never used.','var(--bad)');
  }
  if(v.length>=11) h+=item('Plant code',v[10],'Assembly plant. The meaning depends on the maker.','var(--s-plant)');
  if(v.length===17){
    h+=item('Serial number',v.slice(11),'Production sequence at that plant.','var(--s-serial)');
    var cd=checkDigit(v);
    if(cd===null) h+=item('Check digit','n/a','Can’t be calculated because of invalid characters.','var(--s-chk)');
    else if(cd===v[8]) h+=item('Check digit (ISO 3779)','Valid ('+cd+')','Character 9 matches the calculated value.','var(--good)');
    else h+=item('Check digit (ISO 3779)','Calculated '+cd+', VIN has '+v[8],'Only North American VINs must pass. Many Australian, Japanese and European VINs don’t, so a mismatch alone is not a red flag.','var(--warn)');
  }
  results.innerHTML=h;
}

function showDecode(title,msg,src){dec.hidden=false;dTitle.textContent=title;dMsg.textContent=msg;dSrc.textContent=src||'';}
function decode(v){
  if(activeController){try{activeController.abort()}catch(e){}}
  var seq=++requestSeq;
  var ctl=typeof AbortController!=='undefined'?new AbortController():null;
  activeController=ctl;
  lastDecoded=v;dGrid.innerHTML='';
  showDecode('Looking up vehicle details','Requesting details from the NHTSA vPIC database. This can take a few seconds.','Source: NHTSA vPIC public API (United States).');
  btn.disabled=true;var old='Check & Decode VIN';btn.textContent='Decoding...';
  var to=setTimeout(function(){if(ctl)ctl.abort()},15000);
  fetch(API+encodeURIComponent(v)+'?format=json',{headers:{Accept:'application/json'},signal:ctl?ctl.signal:undefined,cache:'no-store'})
  .then(function(r){if(!r.ok) throw new Error('http');return r.json()})
  .then(function(j){
    if(seq!==requestSeq||parse(input.value).v!==v) return;
    var data=j&&j.Results&&j.Results[0]; if(!data) throw new Error('shape');
    var f=pickFields(data);
    if(!f.length){showDecode('No vehicle details returned','The VIN passed the format check, but NHTSA vPIC holds no useful record for it. It is a United States catalogue, so Australian-market models, older vehicles and some imports often return nothing. This does not mean the VIN is invalid. The maker and year codes above still apply.','Source: NHTSA vPIC public API. No PPSR or history search was performed.');return}
    var g='',cur='';
    f.forEach(function(x){if(x.group!==cur){cur=x.group;g+='<div class="dlabel">'+esc(cur)+'</div>'}g+='<div class="ditem"><span>'+esc(x.label)+'</span><strong>'+esc(x.value)+'</strong></div>'});
    dGrid.innerHTML=g;
    showDecode('Vehicle details','Details returned by the NHTSA vPIC database. Confirm them against the vehicle, its compliance plate and its papers.','Source: NHTSA vPIC public API. This is not a PPSR or vehicle history search.');
  })
  .catch(function(e){
    if(seq!==requestSeq) return;
    var slow=e&&e.name==='AbortError';
    showDecode('Decode unavailable',slow?'The vehicle data service took too long to respond. The format check above still works. Please try again later.':'The vehicle data service could not be reached. The format check above still works. Check your connection and try again later.','No PPSR or history search was performed.');
  })
  .then(function(){
    clearTimeout(to);
    if(seq===requestSeq){
      activeController=null;
      btn.disabled=false;
      btn.textContent=old;
    }
  });
}

input.addEventListener('input',function(){
  if(activeController){
    requestSeq++;
    try{activeController.abort()}catch(e){}
    activeController=null;
    btn.disabled=false;
    btn.textContent='Check & Decode VIN';
  }
  render();
});
$('clear').addEventListener('click',function(){input.value='';lastDecoded='';render();input.focus()});
$('example').addEventListener('click',function(){input.value='1HGCM82633A004352';render()});
$('paste').addEventListener('click',function(){
  try{
    if(!navigator.clipboard||!navigator.clipboard.readText){status('warn','Paste manually','Clipboard access is not available here. Paste into the box with Ctrl+V or long-press.');input.focus();return}
    navigator.clipboard.readText().then(function(t){input.value=parse(t).v;render();input.focus()},function(){status('warn','Paste manually','Clipboard permission was not granted. Paste into the box instead.');input.focus()});
  }catch(e){input.focus()}
});
$('form').addEventListener('submit',function(e){
  e.preventDefault();
  var p=parse(input.value);input.value=p.v;render();
  if(p.v.length!==17||p.banned.length||p.invalid.length){showDecode('Fix the VIN first','A decode needs a 17-character VIN containing only letters A–Z and numbers 0–9, with no I, O or Q. Check the status above.','No external request was made.');dGrid.innerHTML='';lastDecoded=p.v;return}
  decode(p.v);
});
$('copy').addEventListener('click',function(){
  var v=parse(input.value).v;
  if(!v){copied.textContent='Enter a VIN first.';return}
  var ok=function(){copied.textContent='Copied';setTimeout(function(){copied.textContent=''},2000)};
  try{navigator.clipboard.writeText(v).then(ok,function(){copied.textContent='Select the VIN and copy it.'})}catch(e){copied.textContent='Select the VIN and copy it.'}
});
render();
})();
