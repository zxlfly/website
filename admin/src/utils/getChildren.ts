import { CategoryList } from "@/types"

function getChildren(root: CategoryList, arr: CategoryList[], dep: number) {
  if (!root.child.length) {
    root.disable=false
    return
  }
  root.disable=true
  root.child.forEach((item: CategoryList) => {
    item.lv = dep
    arr.push(item)
    getChildren(item, arr, dep + 1)
  })
}
export default getChildren