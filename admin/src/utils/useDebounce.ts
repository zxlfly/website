import { useEffect, useRef } from "react";
interface CurrentRef {
  fn: Function;
  timer?: ReturnType<typeof setTimeout> | null
}
const useDebounce = (cb: Function, time: number = 500) => {
  const cur = useRef<CurrentRef>({
    fn: cb,
    timer: null,
  })
  useEffect(() => {
    cur.current.fn = cb
  }, [cb])
  return (...args: any) => {
    if (cur.current.timer) {
      clearTimeout(cur.current.timer)
    }
    cur.current.timer = setTimeout(async () => {
      await cur.current.fn(...args)
    }, time)
  }
}
export default useDebounce
