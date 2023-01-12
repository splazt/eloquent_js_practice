import './scripts.js';
import {characterScript, countBy} from './05_higher_order.js';



function dominantDirection(text) {
    let scripts = CountPropertyArr(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : 'none';
    }, 'direction').filter(e => e.direction !== 'none');

    console.log(scripts);
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


//first, a function that creates an array with counts of whatever property
function CountPropertyArr(items, groupName, propertyName){
    let counts = [];
    // console.log(propertyName);
    for (let item of items){
        let prop = groupName(item);
        // console.log(prop);
        let knownIdx = counts.findIndex(c => c[propertyName] === prop);
        if (knownIdx === -1) counts.push({[propertyName] : prop, count: 1}); //note how propertyname is bracketed to create property name from variable
        else counts[knownIdx].count++;
    }
    return counts;
}

//second, a function that spits out the most dominant property of a certain string
function printDominantProperty(text, propertyStr){
    let scripts = CountPropertyArr(text, ch => {
        let script = characterScript(ch.codePointAt(0));
        return script ? script[propertyStr] : 'none';
    }, propertyStr).filter(s => s[propertyStr] !== 'none');

    return `dominant ${propertyStr}: ${
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

let countDir = f_countProperties('direction');
console.log(countDir("Hello!"));
console.log(printDominantProperty2("Hello!", countDir, 'direction'));

//forth, a function that prints out the dominant property
function printDominantProperty2(text, f, propName){
    let scripts = f(text).filter(s => s[propName] !== 'none');

    return `dominant ${propName}: ${
        scripts.reduce((a, b) => {
            if (a.count < b.count) return b;
            else return a;
        })[propName]}`;
}


//   console.log(dominantDirection("Hello!"));
//   console.log(printDominantProperty("Hello!", 'direction'));
  // → ltr
//   console.log(dominantDirection("Hey, مساء الخير"));
  // → rtl

//   console.log(countBy([1, 2, 3, 4, 5], n => n > 2));

//   console.log(textScripts2('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
//   console.log(characterScript(121));

  //countby iterates over the text and for each name, it tries to find a name for it to label it, then a count for that script

//   console.log(scripts);

//   console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
  // → [{name: false, count: 2}, {name: true, count: 3}]

//   console.log(filter(SCRIPTS, script => script.living));
//console.log(SCRIPTS);

