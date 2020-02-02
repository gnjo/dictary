;(function(root){
const arrayChunk = ([...array], size = 1) => {
  return array.reduce((acc, value, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
}

function sel6(ary,_n,head,_cur){
 let n=_n%ary.length
 ,cur=_cur||'＊'
 ,a=arrayChunk(ary,6)
 ,pmax=a.length
 ,pnow=Math.floor(n/6)
 ,b=a[pnow]
 ,m=n%6
 ,mes1=`${head} [${pnow+1}/${pmax}]`+'\n'
 ,mes2=b.map((d,i)=>(m===i)?cur+d:'　'+d).join('\n')
 ;
 return mes1+mes2
 /*
let test=`
choice0
choice1
choice2
choice3
choice4
choice5
choice0a
choice1a
choice2a
choice3a
choice4a
choice5a
choice0b
choice1b
choice2b
choice3b
choice4b
choice5b
`.trim().split('\n') 
let n=0;
setInterval(()=>{
 fn.q('pre').textContent=sel6(test,n,'aaaaa')  //cur =*
 n++;
},500) 
 */
}

 root.sel6=sel6
}(this));

;(function(root){
 let num=/^([-+]?(?:\d*[\.]\d+|\d+))$/,headzero=/^0[0-9]/ //bugfix
 ,isstring=function(value){return toString.call(value) === '[object String]'}
 function __n(obj){
  //numable
  if(!isstring(obj))return obj;
  ///^0[0-9]/.test('001') //string like a color code
  if(headzero.test(obj))return obj; //string ex.color code
  if(num.test(obj))return parseFloat(obj);//right number
  return obj;//string
 }
 ;
 let c=/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
 function __c(d){
  //comment trim
  return d.replace(c,'')
 } 
 ;
 function __t(d){
  return isstring(d)?d.trim():d
 }
 function typecheck(line){
  let re_keyhead=/^\$/
  ,re_single=/^\$.*=.+/
  ,re_comma=/,/
  ,re_multi=/^\$.*=$/
  if(re_multi.test(line))return 'multi'
  if(re_single.test(line)&&re_comma.test(line))return 'singleary'
  if(re_single.test(line))return 'single'
  if(re_keyhead.test(line))return 'ary'
  return 'value'
 }
 function entry(str,o){
  if(!str)return console.log('param 0 is null')
  let obj=o||this
  //type
  //multi,singleary,single,ary
  let key,type,keytype,a=__c(str).split('\n').map(__t).filter(d=>d)
  for(let line of a){
   let flg=0
   type=typecheck(line)
   ;//console.log(type,line)
   if(type==='value'&&keytype==='multi') obj[key]+=line+'\n',flg=1
   if(type==='value'&&keytype==='ary') obj[key].push(line.split(',').map(__n)),flg=1
   if(flg)continue
   ;
   if(keytype==='multi')obj[key]=__t(obj[key])  //if old keytype multi is tailcut \n
   ;
   keytype=type;
   if(keytype==='multi') key=line.replace('=',''),obj[key]=[],flg=1
   if(keytype==='ary') key=line,obj[key]=[],flg=1
   if(flg)continue
   ;
   let b=line.split('=')
   key=b[0],line=b[1]
   if(keytype==='single') obj[key]=__n(line)
   if(keytype==='singleary') obj[key]=line.split(',').map(__n)   
  }
  //special end linebreak
  obj[key]=__t(obj[key])
  //
 }
 root.variable=entry;
})(this);
