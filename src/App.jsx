import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length,setLength]=useState(8);
  const [numberAllow,setNumber]=useState(false);
  const[charAllow,setCharacter]=useState(false);
  const [pass,setPass]=useState("");

  const passRef=useRef(null)

  const copyPassClipboard=useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(length)
    window.navigator.clipboard.writeText(pass)
  },[pass])

  const passGenerator= useCallback(()=>{
    let passw=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!@#$%^&*(){}_-+=[]~`"

    }

    for(let i=1;i<=length;i++){
      let char= Math.floor(Math.random()*str.length + 1)
      passw += str.charAt(char)
    }
    setPass(passw)

  },[length,numberAllow,charAllow,setPass])

 useEffect(()=>{
  passGenerator()
 },[length,numberAllow,charAllow,passGenerator])

  return (
    <div>
      <h1 className='text-4xl text-center text-white mt-40'>Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type='text' 
        className="rounded-lg outline-none w-full py-2 px-3 " 
        value={pass} 
        placeholder='Password' 
        readOnly 
        ref={passRef}></input>

        <button 
        onClick={copyPassClipboard}
        
        className=" text-white px-3 py-1 rounded-lg outline-none bg-blue-800 shrink-0 hover:bg-blue-900" >copy</button>

      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' 
          min={6} 
          max={100} 
          value={length} 
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllow}
          id="numberinput"
          className='cursor-pointer'
          onChange={()=>{setNumber((prev)=>!prev);}}
         /> <label>Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecked={charAllow}
          id="charinput"
          className='cursor-pointer'
          onChange={()=>{setCharacter((prev)=>!prev)}}
          /><label>Character</label>
        </div>
      </div>
      </div>
    </div>
    
  )
}

export default App
