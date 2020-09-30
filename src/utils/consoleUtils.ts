const _DEBUG:boolean=true

export const errorConsoleIfDebug=(message:any)=>{
  if(_DEBUG){console.error(message)}
}

export const logConsoleIfDebug=(message:any)=>{
  if(_DEBUG){console.log(message)}
}