import { message } from "antd";

async function getCategoryList(dispatch: (arg0: { type: string; cb: (res: any) => void; }) => void,setIsLoading: (arg0: boolean) => void) {
  const cb = (res: any) => {
    console.log('e', res);
    if (res !== true) {
      message.error(res);
    }
  }
  setIsLoading(true)
  dispatch({ type: 'Category/getList', cb })
  setIsLoading(false)
}
export default getCategoryList