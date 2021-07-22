#!/usr/bin/env node
//requiring the filesystem
let fs=require('fs');
//iifi function so that it gets exectuted every time onces the command is called
(function(){
//command line input or arguments removing the first two arguments it contains the address of the files
let cmd=process.argv.slice(2);
//array for options
let options=[];
//input files array
let files=[]
let str=``
//filling the options and files array
for(let i=0;i<cmd.length;i++){
    if(cmd[i].startsWith("-")){
        options.push(cmd[i])
    }
    else{
        files.push(cmd[i])
    }
}
// to check if the files exist or not
for(let j=0;j<files.length;j++){
    //check if file exist
    if(fs.existsSync(files[j])){
        str+=fs.readFileSync(files[j]).toString();
    }
    else{
        console.log("invalid file");
        return;
    }
}
//splitting it in array
str=str.split("\n")
//checking options
//if -s exist spaces removed
if(options.includes("-s")){
    str=removeLargeSpaces(str);
}
// if -n and -b exists
if(options.includes("-n")&& options.includes("-b")){
    //check on the basis of index
    if(options.indexOf("-n")>options.indexOf("-b")){
        //-b runs
        str=addNonEmptyNum(str)
    }
    else{
        //-n runs
        str=addAllNum(str)
    }
}
else{
    if(options.indexOf("-n")){
        str=addAllNum(str)
    }
    else if(options.indexOf("-b")){
        str=addNonEmptyNum(str);
    }
}
// converted back to string
str=str.join("\n")
console.log(str);
})();
function removeLargeSpaces(arr){
    //new array
    let y=[]
    //check flag
    let flag=false
    for(let i=0;i<arr.length;i++){
        //spaces check
        if(arr[i]==="" || arr[i]==="\r"){
            if(flag===true){
                continue
            }
            else{
                y.push(arr[i]);
                flag=true;
            }
        }
        else{
            //if text push it in the array
            y.push(arr[i]);
                flag=false;

        }
    }
    return y;
}
function addAllNum(arr){
    //adding no
    let lineNumber=1;
    for(let i=0;i<arr.length;i++){
        arr[i]=lineNumber+" "+arr[i];
        lineNumber++;
    }
    return arr;
}
function addNonEmptyNum(arr){
    let lineNumber=1;
    for(let i=0;i<arr.length;i++){
        //only non empty spaces are numbered
        if(arr[i]!=="" && arr[i]!=="\r"){
            arr[i]=lineNumber+" "+arr[i]
            lineNumber++;
        }
    }
    return arr;
}