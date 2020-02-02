# variable
```
//usage
variable(text,this)  //target the this[...]
```

$value\n a,b,c,d,
```
//comment $ head is mark and ${}={} 
$testa
a,b,c,d //$testa[0]=[a,b,c,d]

$xxxx
sword,300,this is sword. //$xxxx[0]=['sword',300,'this is sword'] //number is num
shild,130,this is shild. //$xxxx[1]=['shild',130,'this is shild']

$aaaa=xyz //$aaaa='xyz'
$singleary=0,1,2,3,4 //$singleary=[0,1,2,3,4]

$bbbb=  //$bbbb='aaa\nbbb...' multi string
aaa
bbb
ccc
ddd
eee
fff
```


```
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
  return d.trim()
 }
 function typecheck(line){
  let re_keyhead=/^!/
  ,re_single=/^!.*=.+/
  ,re_comma=/,/
  ,re_multi=/^!.*=$/
  if(re_multi.test(line)return 'multi'
  if(re_single.test(line)&&re_comma.test(line))return 'singleary'
  if(re_single.test(line)return 'single'
  if(re_keyhead.test(line))return 'ary'
  return 'value'
 }
 function entry(str,obj){
  if(!str)return console.log('param 0 is null')
  if(!obj)obj=this
  //type
  //multi,singleary,single,ary
  let key,keytype,a=__c(str).split('\n').map(__t).filter(d=>d)
  for(let line of a){
   let flg=0
   type=typecheck(line)
   ;
   if(type==='value'&&keytype==='multi') obj[key]+=line+'\n',flg=1
   if(type==='value'&&keytype==='ary') obj[key].push(line.split(',').map(__n)),flg=1
   if(flg)continue;
   if(keytype==='multi')obj[key]=obj[key].trim()  //if old keytype multi is tailcut \n
   ;
   keytype=type;
   if(keytype==='multi') key=line.replace('=',''),flg=1
   if(keytype==='ary') key=line,flg=1
   if(flg)continue;
   ;
   let b=line.split('=')
   key=b[0]
   if(keytype==='single') obj[key]=__n(line)
   if(keytype==='singleary') obj[key]=line.split(',').map(__n)
  }
 }
 root.variable=entry;
})(this);
```
