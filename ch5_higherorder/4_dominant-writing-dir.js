import './scripts.js';
import {characterScript, countBy} from './05_higher_order.js';

function dominantDirection_textbook(text) {
    let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    console.dir(counted);
    if (counted.length == 0) return "ltr";

    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
  }

function dominantDirection(text) {
    let scripts = countPropertyArr(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : 'none';
    }, 'direction').filter(e => e.direction !== 'none');

    // console.log(scripts);
    //iterate over script objects, and compare;
   return `dominant direction: ${
    scripts.reduce((a, b) => {
        if (a.count < b.count) return b;
        else return a;
    }).direction
   }`;
  }

function writingDirCount(items, groupName){
    let counts = [];
    for (let item of items){
        let dir = groupName(item);
        let known = counts.findIndex(c => c.dir === dir);
        // console.log('known: ' + known);
        if (known === -1) counts.push({dir, count: 1});
        else counts[known].count++;
    }
    return counts;
}

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
            if (a.count < b.count) return b;
            else return a;
        })[propertyStr]}`;
}



//third, function that creates functions on counting properties
function f_countProperties (propName){
    let propertyName = propName;
    return function(items){
        let counts = [];
        for (let item of items){
            let prop = (()=>{
                let script = characterScript(item.codePointAt(0));
                return script ? script[propName] : 'none';
            })();
            let knownIdx = counts.findIndex(c => c[propName] === prop);
            if (knownIdx === -1) counts.push({[propName] : prop, count: 1});
            else counts[knownIdx].count++;
        }
        return counts;
    }
}

//forth, a function that prints out the dominant property
function printDominantProperty2(text, f, propName){
    let scripts = f(text).filter(s => s[propName] !== 'none');
    return `text: ${text}, dominant ${propName}: ${
        scripts.reduce((a, b) => {
            return a.count < b.count ? b : a;
        })[propName]}`;
}

console.log(countPropertyArr("ᠭᠠᠵᠠᠷ ᠠ", 'name'));
console.log(printDominantProperty("Hey, مساء الخير", 'direction'));
console.log(printDominantProperty("Hey, مساء الخير", 'year'));


let countDir = f_countProperties('direction');
let countName = f_countProperties('name');
console.log(printDominantProperty2("Hello!", countName, 'name'));
console.log(printDominantProperty2("Hey, مساء الخير", countDir, 'direction'));

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

