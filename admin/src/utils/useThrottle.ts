import { useCallback, useEffect, useRef } from "react";
interface CurrentRef {
  fn: Function;
  timer?: ReturnType<typeof setTimeout> | null
}
const useThrottle = (cb: Function, time: number = 500) => {
  const cur = useRef<CurrentRef>({
    fn: cb,
    timer: null,
  })
  useEffect(()=>{
    cur.current.fn=cb
  },[cb])
  return useCallback((...args: any) => {
    if (!cur.current.timer) {
      cur.current.timer = setTimeout(async () => {
        await cur.current.fn(...args)
        cur.current.timer = null
      }, time)
    }
  },[cb])
}
export default useThrottle
