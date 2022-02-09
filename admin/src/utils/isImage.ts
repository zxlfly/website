async function isGif(file:File) {
  let ret = await blobToString(file.slice(0, 6));
  return ret == "47 49 46 38 39 61" || ret == "47 49 46 38 37 61"
}
async function isPng(file:File) {
  const ret = await blobToString(file.slice(0, 8));
  return ret == "89 50 4E 47 0D 0A 1A 0A"
}
async function isJpg(file:File) {
  const start = await blobToString(file.slice(0, 2));
  const tail = await blobToString(file.slice(-2, file.size));
  return start == "FF D8" && tail == "FF D9"
}
async function blobToString(blob: Blob) {
  return new Promise((resolve) => {
    const reader:FileReader = new FileReader();
    reader.onload = function (this: FileReader, ev: ProgressEvent<FileReader>) {
      let list:string = reader.result as string ??'啥也不是'
      const ret = list.split("").map((v) =>v.charCodeAt(0)).map((v) => {
        let x = v.toString(16).toUpperCase()
        if(x.length==1){
          x = "0"+x
        }
        return x
      }).join(" ")
      resolve(ret);
      
    };
    reader.readAsBinaryString(blob);
  });
}
async function isImage(file:File) {
  return (
    (await isGif(file)) ||
    (await isPng(file)) ||
    (await isJpg(file))
  );
}
export default isImage