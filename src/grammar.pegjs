{{
  function getOp(op, a, b) {
    return {
      ">": (a, b) => a > b,
      "<": (a, b) => a < b,
      "<=": (a, b) => a <= b,
      ">=": (a, b) => a >= b
    }[op](a,b);
  }
}}

{
  const functions = {};
  let functionCounter = 0;
}

start = map:EXP {
    return { map, functions };
  }

EXP
  = head:PAIR tail:(_ @PAIR)* _ catchall:WORD? {
    const map = head;
    
    for (let i = 0; i < tail.length; i++) {
      Object.assign(map, tail[i]);
    }
    
    catchall && Object.assign(map, { "*": catchall });
    
    return map;
  }

PAIR
  = key:KEY _ ":"? _ value:VALUE {
    return { [key]: value };
  }
  
KEY
  = JSON / WORD / CONDITION

VALUE
  = JSON / WORD / ("{" _ @EXP _ "}")

CONDITION
  = op:OPERATOR _ number:NUMBER {
    const key = "$$" + ++functionCounter;
    functions[key] = (input) => getOp(op, input, number);
    return key;
  }
  
JSON
  = json:('<' @($[^\<\>]*) '>') {
    return JSON.parse(json);
  }

OPERATOR
  = ">" / "<" / "="

NUMBER "number"
  = ("-" / "+")? INT FRAC? {
    return parseFloat(text());
  }

FRAC
  = "." DIGIT+

INT
  = "0" / (DIGIT1_9 DIGIT*)

WORD
  = $[a-z0-9_]i+

DIGIT1_9
  = [1-9]

DIGIT 
  = [0-9]

_
  = [ \t\n\r]*