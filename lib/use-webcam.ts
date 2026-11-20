'use client';
import {useState,useRef,useCallback,useEffect} from 'react';
export function useWebcam(){
 const videoRef=useRef<HTMLVideoElement>(null),canvasRef=useRef<HTMLCanvasElement>(null),streamRef=useRef<MediaStream|null>(null),generation=useRef(0);
 const [webcamActive,setWebcamActive]=useState(false),[facingMode,setFacingMode]=useState<'user'|'environment'>('environment'),[cameraError,setCameraError]=useState('');
 const stopWebcam=useCallback(()=>{generation.current++;streamRef.current?.getTracks().forEach(t=>t.stop());streamRef.current=null;if(videoRef.current)videoRef.current.srcObject=null;setWebcamActive(false);},[]);
 const startWebcam=useCallback(async(mode?:'user'|'environment')=>{
  const request=++generation.current;setCameraError('');streamRef.current?.getTracks().forEach(t=>t.stop());setWebcamActive(false);
  try{
   if(!navigator.mediaDevices?.getUserMedia)throw new Error('Camera unavailable');
   let stream:MediaStream;
   try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:mode||facingMode}});}catch(e){if((e as DOMException).name!=='OverconstrainedError'&&(e as DOMException).name!=='NotFoundError')throw e;stream=await navigator.mediaDevices.getUserMedia({video:true});}
   if(request!==generation.current){stream.getTracks().forEach(t=>t.stop());return false;}
   streamRef.current=stream;
   if(!videoRef.current){stream.getTracks().forEach(t=>t.stop());return false;}
   videoRef.current.srcObject=stream;await videoRef.current.play();setWebcamActive(true);return true;
  }catch{streamRef.current?.getTracks().forEach(t=>t.stop());streamRef.current=null;setCameraError('Camera access is unavailable. Check browser permission and connect a camera, then try again.');return false;}
 },[facingMode]);
 const switchCamera=useCallback(async()=>{const next=facingMode==='user'?'environment':'user';setFacingMode(next);if(webcamActive)await startWebcam(next);},[facingMode,webcamActive,startWebcam]);
 useEffect(()=>()=>{generation.current++;streamRef.current?.getTracks().forEach(t=>t.stop());},[]);
 const captureFrame=useCallback(()=>{const v=videoRef.current,c=canvasRef.current;if(!v||!c||v.readyState<2)return null;const ctx=c.getContext('2d');if(!ctx)return null;c.width=640;c.height=480;ctx.drawImage(v,0,0,640,480);return c.toDataURL('image/jpeg',.5);},[]);
 return{videoRef,canvasRef,webcamActive,startWebcam,stopWebcam,switchCamera,captureFrame,facingMode,cameraError};
}
