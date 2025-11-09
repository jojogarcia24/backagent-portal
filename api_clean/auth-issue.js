const allowed=(process.env.CORS_ORIGIN||'').split(',').map(s=>s.trim()).filter(Boolean);
const cors=o=>({
  'Access-Control-Allow-Origin': allowed.includes(o)?o:(allowed[0]||'*'),
  'Access-Control-Allow-Methods':'POST,OPTIONS',
  'Access-Control-Allow-Headers':'content-type,authorization',
  'Access-Control-Max-Age':'86400',
});
exports.handler=async(event)=>{
  const headers=cors(event.headers.origin||'');
  if(event.httpMethod==='OPTIONS')return{statusCode:204,headers};
  if(event.httpMethod!=='POST')return{statusCode:405,headers,body:'Method Not Allowed'};
  return{statusCode:200,headers,body:JSON.stringify({token:'dev-token'})};
};
