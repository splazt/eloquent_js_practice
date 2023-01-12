import './scripts.js';
import {characterScript, countBy} from './05_higher_order.js';

// function dominantDirection_textbook(text) {
//     let counted = countBy(text, char => {
//       let script = characterScript(char.codePointAt(0));
//       return script ? script.direction : "none";
//     }).filter(({name}) => name != "none");

//     console.dir(counted);
//     if (counted.length == 0) return "ltr";

//     return counted.reduce((a, b) => a.count > b.count ? a : b).name;
//   }

// function dominantDirection(text) {
//     let scripts = countPropertyArr(text, char => {
//         let script = characterScript(char.codePointAt(0));
//         return script ? script.direction : 'none';
//     }, 'direction').filter(e => e.direction !== 'none');
//     //iterate over script objects, and compare;
//    return `dominant direction: ${
//     scripts.reduce((a, b) => {
//         if (a.count < b.count) return b;
//         else return a;
//     }).direction
//    }`;
//   }

// function writingDirCount(items, groupName){
//     let counts = [];
//     for (let item of items){
//         let dir = groupName(item);
//         let known = counts.findIndex(c => c.dir === dir);
//         // console.log('known: ' + known);
//         if (known === -1) counts.push({dir, count: 1});
//         else counts[known].count++;
//     }
//     return counts;
// }

function extractPropName(ch, propName){
    let script = characterScript(ch.codePointAt(0));
    return script ? script[propName] : 'none';
}
//first, a function that creates an array with counts of whatever property
function countPropertyArr(items, propertyName){
    let counts = [];
    for (let item of items){
        let prop = extractPropName(item, propertyName);
        let knownIdx = counts.findIndex(c => c[propertyName] === prop);
        if (knownIdx === -1) counts.push({[propertyName] : prop, count: 1}); //note how propertyname is bracketed to create property name from variable
        else counts[knownIdx].count++;
    }
    return counts.filter(s => s[propertyName] !== 'none');
}

//second, a function that spits out the most dominant property of a certain string
function printDominantProperty(text, propertyStr){
    let scripts = countPropertyArr(text, propertyStr);
    return `text: ${text}, dominant ${propertyStr}: ${
        scripts.reduce((a, b) => {
            return a.count < b.count ? b : a;
        })[propertyStr]}`;
}

//third, function that returns functions on counting properties
function f_countProperties (propName){
    let pName = propName;
    return function(items){
        let counts = [];
        for (let item of items){
            let prop = (()=>{
                let script = characterScript(item.codePointAt(0));
                return script ? script[pName] : 'none';
            })();
            let knownIdx = counts.findIndex(c => c[pName] === prop);
            if (knownIdx === -1) counts.push({[pName] : prop, count: 1});
            else counts[knownIdx].count++;
        }
        return counts;
    }
}

//forth, a function that prints out the dominant property
function printDominantProperty2(text, propName){
    let f = f_countProperties(propName);
    let scripts = f(text).filter(s => s[propName] !== 'none');
    return `text: ${text}, dominant ${propName}: ${
        scripts.reduce((a, b) => {
            return a.count < b.count ? b : a;
        })[propName]}`;
}

function printDominantProperty3(text, ...propNames){

    let fList = [];
    let scripts = [];
    for (let pName of propNames){
        fList.push(f_countProperties(pName));
    }

    for (let i = 0; i < fList.length; i++){
        // console.log(fList[i](text).filter(s => s[propNames[i]] != 'none'));
        scripts.push(fList[i](text).filter(s => s[propNames[i]] != 'none'));
    }

    // return scripts;
    let resultStr = `text: ${text} - `;
    for (let i = 0; i < scripts.length; i++){
        resultStr += `dominant ${propNames[i]}: ${
            scripts[i].reduce((a, b) => {
            return a.count < b.count ? b : a;
        })[propNames[i]]}` + (i !== scripts.length -1 ? ', ' : '') ;
    }

    return resultStr;
}


//compute average of properties
function printPropertyProportions(text, propName){

    let f = f_countProperties(propName);
    let scripts = f(text).filter(s => s[propName] !== 'none');

    let total = scripts.reduce((sum, {count})=> sum + count, 0);

    return text + " :::: " + scripts.map(({[propName] : pName, count}) =>{
        return `${pName}: ${(count/total*100).toFixed(2)}%`;
    }).join(', ');

}

function printPropertyProportions2(text, ...propNames){

    let fList = [];
    let scriptsList = [];
    for (let pName of propNames){
        fList.push(f_countProperties(pName));
    }

    for (let i = 0; i < fList.length; i++){
        scriptsList.push(fList[i](text).filter(s => s[propNames[i]] != 'none'));
    }
    // console.log(scriptsList.length);

    let printStr = text + " :::: ";
    let total = scriptsList[0].reduce((sum, {count})=> sum + count, 0);

    // return scriptsList.reduce((a, b) => {
    //     return a.map(({pName, count}) =>{
    //         return `${pName}: ${(count/total*100).toFixed(1)}%`;
    //     }).join(', ') + b.map(({[propNames[0]] : pName, count}) =>{
    //         return `${pName}: ${(count/total*100).toFixed(1)}%`;
    //     }).join(', ');
    //  }
    // );
    for (let i = 0; i < scriptsList.length; i++){
        if (i > 0) printStr += '; ';
        printStr += scriptsList[i].map(({[propNames[i]] : pName, count}) =>{
            return `${pName}: ${(count/total*100).toFixed(1)}%`;
        }).join(', ');
    }
    return printStr;

}

console.log(printPropertyProportions2('ㅠ미ㅓㄹ히ㅏㅓ helkjl;akjsdf', 'name', 'direction'));
console.log(printPropertyProportions2("ᠭᠠᠵᠠᠷ ᠠ 英国的狗说woof", 'name', 'year', 'direction'));
// console.log(printPropertyProportions('ㅠ미ㅓㄹ히ㅏㅓ helkjl;akjsdf', 'name'));
// console.log(printDominantProperty3("Hello 안녕하시오리까", 'name', 'direction'));
// console.log(printDominantProperty3("ᠭᠠᠵᠠᠷ ᠠ", 'name', 'year', 'direction'));
// console.log(countPropertyArr("ᠭᠠᠵᠠᠷ ᠠ", 'name'));
// console.log(printDominantProperty2("Hello 안녕하십니까?", 'name'));
// console.log(printDominantProperty3("Hey, مساء الخير", 'year'));

let countDir = f_countProperties('direction');
let countName = f_countProperties('name');
// console.log(printDominantProperty2("Hello!", 'year'));
// console.log(printDominantProperty2("Hey, مساء الخير", countDir, 'direction'));

//function that can print out many texts


//   console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
//   console.log(textScripts2('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
//   console.log(characterScript(121));

  //countby iterates over the text and for each name, it tries to find a name for it to label it, then a count for that script

//   console.log(scripts);

//   console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
  // → [{name: false, count: 2}, {name: true, count: 3}]

//   console.log(filter(SCRIPTS, script => script.living));
//console.log(SCRIPTS);

