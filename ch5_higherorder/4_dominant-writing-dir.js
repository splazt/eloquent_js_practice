import './scripts.js';
import {characterScript, countBy} from './05_higher_order.js';



function dominantDirection(text) {
    //use countBy and characterScript ---- ientifies which character is what
    let scripts = CountPropertyArr(text, char => {
        let script = characterScript(char.codePointAt(0));
        // console.log(Object.keys(script).length);
        // console.log(script?.direction);
        return script ? script.direction : 'none';
    }, 'direction').filter(e => e.dir !== 'none');

    console.log(scripts);
    //iterate over script objects, and compare;
   return scripts.reduce((a, b) => {
        if (a.count < b.count) return b;
        else return a;
    }).dir;
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

//function that creates functions on counting properties
function CountPropertyArr(items, groupName, propertyName){
    let counts = [];
    console.log(propertyName);
    for (let item of items){
        let prop = groupName(item);
        console.log(prop);
        let knownIdx = counts.findIndex(c => c[propertyName] === prop);
        if (knownIdx === -1) counts.push({[propertyName] : prop, count: 1}); //note how propertyname is bracketed to create property name from variable
        else counts[knownIdx].count++;
    }
    return counts;
}

  console.log(dominantDirection("Hello!"));
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

