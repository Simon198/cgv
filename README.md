# CGV

_Computer Generated Verse_

## Development

1. `npm install` to install the library dependencies
2. `npm run build` to build the cgv library
3. `cd web` to move into the frontend folder
4. `npm run install` to install the frontend dependencies
5. `npm run dev` to start the frontend

`now access http://localhost:3000/shape or http://localhost:3000/arithmetic to access the respective domain editor`

### Folder Structure

-   `src` contains the source code for the core library including the domains in `src/domains`
-   `web` contains the frontend code in react (the pages for the respective editors)

## Language Design Decisions

\*The language expresses **procedural, conditional, stochastic grammars**, which are represented as a list of **`Rules`\***

The grammar is defined in [grammar.ne](./grammar.ne).

-   **`Rules`** - like in CGA ("**Lot --> Building**")
    -   begins with the name of the rule - called **`Symbol`**
    -   followed by `->` (simplified - "-->" in CGA)
    -   followed by **`Parallel Executions`**
-   **`Parallel Execution`** - similar to CGA ("Building --> comp(f){ front : FrontFacade **|** side : SideFacade **|** top: Roof}")
    -   seperates **`Sequential Executions`** using `|` (vertical bar)
-   **`Sequential Execution`** - like in CGA ("Lot --> **extrude(height) Building**")
    -   seperates **`Operations`**, **`Constants`** or **`Symbols`** using **`whitespace`**
-   **`Operations`** - like in CGA ("**color(wallColor)**")
    -   begins with the operation name (name is domain specific)
    -   followed by opening bracket `(`, the **`Parameters`** and a closing bracket `)`
-   **`Parameters`** - like in CGA ("s(**1,1,0.1**)")
    -   seperates **`Parallel Executions`** using commas `,`
-   **`Constants`**
    -   constants can be numbers (`1`, `10.12`), strings (using quotation `""`) and booleans (true/false)
-   **`Variables`**
    -   using `this.<name>` the variable with the name `name` can be retriveved
    -   *WIP* writing to a variable called `name` can be done using `this.<name> = 1`
-   **`Special Tokens`**
    -   `this` - *does nothing* - used to represent the current value (similar to this in OOP)
    -   `return` - *jumps out of the execution* - terminates the execution prematurely (similar to most programming lanuages)
    -   `+ - * /` - arithemtic operators (similar to most programming languages)
    -   `> < == <= >=` - comparison operators (similar to most programming languages)
    -   `&& || !` - boolean operators (similar to most programming languages)
    -   `if then else switch case` - conditional operators (similar to most programming languages)

### Operator Precendence

Except for the parallel and sequential execution the precendence of all operators is implemented according to the operator precendence in c++ (https://en.cppreference.com/w/cpp/language/operator_precedence). Operator precedence is common and equal for most programming langugages.

## Language Features ToDo

-   writing to variables
-   differentiation between replacing the current value (only changing the leaves) and replacing all the values (changing the complete tree)

## Glossary

-   grammar - a set of rules
-   rule - a sequence of steps
-   step - alters the current value done by a operator/constant/symbol
-   operators - identifies a function defined in the domain, which take the current value and the given parameters and returns the new current value
-   constant - identifies a constant
-   variable - memorized value bound to the current value/context and identified with a name
-   symbol - executes the rule identified by the symbol and sets the result as the new current value

-   domain - set of operations and valid constants in a certain area of knowledge (e.g. 3d objects / shapes with operators like extrude)

-   input - starting value (domain value)
-   parameters - values accessible throughout the grammar interpretion to influence the outcome
-   attributes - define parameters (e.g. name, type, min, max, ...) to make them editable in a UI

-   parse - the grammar definition in text form is parsed into a interpretable object representation
-   interprete - executes the steps defined in the grammar on the input, respecting the inserted parameters and returning the result

-   sequential step - the input value is mutated
-   parallel step - the input is split/cloned into multiple values

-   premature termination - the interpretion is cancelled before all possible steps are exhausted (reducing execution time but returning an unfinished/earlier result)

## Test Grammars

### Arithmetic

*Recursion*

```
a -> if (random(0,1) > 0.1) then a1 else a2

a1 -> 1 | a 
a2 -> 0
```

*Premature termination*


*the following example returns 10 since the execution is terminated before the current value is changed to 20*
```
a -> 10 return 20
```

_currently not working, cause the event operator is missing_

```
a -> 1 + 2 max | 4 max

max -> event("a => {
   let max = 0
   let maxI = 0
   let maxII = 0;
   a.forEach((b, i) => b.forEach((c, ii) => {
      if(c > max) {
          max = c
          maxI = i
          maxII = ii
      }
   }))
   return a.map((b, i) => maxI === i ? b.filter((c,ii) => maxII === ii) : [])
}")
```

### Shape

`Recursion`

```
a -> translate(0, 10, 0) if (random(0,1) > 0.5) then a else this
```

`Forest` (currently not working - reimplementation of sample and load)

```
Forest -> sample2d(10) replace("/tree.gltf")
```

`City 1` (currently not working - reimplementation of expand and sample)

```
City -> if(this.type == "road") then Road else Building

Road -> expand(20) (this | sample(30) load("/tree.gltf"))

Building -> expand(200)
```

`Task 1`

```
City -> color(0x333343) extrude(600) faces() (select(0, 4) Wall | select(4, 5) Roof)

Wall -> splitZ(200) Floor

Roof -> color(0x8881111)

Floor -> splitX(200) WindowFrame 

WindowFrame -> if (size("x") >= 200)
	then (
		multiSplitX(50, 100) switch index()
			case 0: this
			case 1: (
				multiSplitZ(50, 100) switch index()
					case 0: this
					case 1: Window
					case 2: this
			)
			case 2: this
	)
	else this

Window -> color(0xEEEEEE)
```

`Task 2`

```
City -> color(0x333343) extrude(random(400, 600)) faces() (select(0, 4) Wall | select(4, 5) Roof)

Wall -> splitZ(random(150, 250)) Floor

Roof -> color(0x8881111)

Floor -> if (size("z") >= 140)
    then (
        splitX(random(150, 250)) WindowFrame
    )
    else this

WindowFrame -> if (size("x") >= 150)
	then (
		multiSplitX(40, 100) switch index()
			case 0: this
			case 1: (
				multiSplitZ(50, 100) switch index()
					case 0: this
					case 1: Window
					case 2: this
			)
			case 2: this
	)
	else this

Window -> color(0xEEEEEE)
```

`Task 3`

```
City -> color(0x333343) if (this.blockId == 0) then LowBuilding else HighBuilding

HighBuilding -> extrude(random(800, 1200)) Building

LowBuilding -> extrude(random(200, 600)) Building

Building -> faces() (select(0, 4) Wall | select(4, 5) Roof)

Roof -> if (this.blockId == 0) then color(0x8881111) else color(0x111111)

Wall -> splitZ(random(190, 250)) Floor

Floor -> if (size("z") >= 190)
    then (
        splitX(200) if (this.blockId == 0) then SmallTile else BigTile
    )
    else this

BigTile -> if (size("x") >= 200)
    then (
        multiSplitX(10, 190) switch index()
            case 0: this
            case 1: (
                multiSplitZ(40, 150) switch index()
                    case 0: this
                    case 1: Window
                    case 2: this
            )
            case 2: this
    )
    else this

SmallTile -> if (size("x") >= 180)
    then (
        multiSplitX(50, 100) switch index()
            case 0: this
            case 1: (
                multiSplitZ(50, 100) switch index()
                    case 0: this
                    case 1: Window
                    case 2: this
            )
            case 2: this
    )
    else this

Window -> extrude(-20) faces() (select(0, 4) | select(4, 5) color(0xEEEEEE))
```