# 🚌 Levent
A better solution of distributing events in TS and JS.    
[![Test](https://github.com/zsh2401/eventx/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/eventx/actions/workflows/test.yml)
[![Publish](https://github.com/zsh2401/eventx/actions/workflows/publish.yml/badge.svg)](https://github.com/zsh2401/eventx/actions/workflows/publish.yml)
    
🌟 High performance   
🌟 Async supported   
🌟 Sticky event   
🌟 Preventable   
🌟 Lightful (Minified + Gzipped = 1kB)   

## Getting Started
```
pnpm add levent
yarn add levent
npm install --save levent
```

### Quick Start
```typescript
import levent from "levent"

//subscribe event
levent.on("test",(arg:string)=>{
    return arg
})

//publish event.
const values = levent.emit("test","I love you.")

console.log(values) // ['I love you.']
```
### Strict event types.
```typescript
import { Levent } from "levent"

// create your own event bus instance
const bus : Levent<{
    "example-event":[string,number]
}>

//define the handler
function handler(arg:string){
    return arg.length;
}

//subscribe
bus.on("example-event",handler)

// publish event
const values = bus.emit( "example-event","I Love You")

//desubscribe
bus.off("example-event",handler)
```


### Async☘️
```typescript
bus.on("example-event",async (arg)=>{
    return await someAsyncOperation(arg)
})

// emit event and wait all handler returns.
const values = await bus.emit("example-event",null,{ async:true })

```
### Hooks
```typescript
eventx.emit("example-event",null,{
    afterEach:(r:any)=>{
        console.log("last handler's result: " + r)
    }
})


```
## Join in development!🏋🏻‍♂️
### 1. Get the source
```sh
git clone https://github.com/zsh2401/levent && cd levent
```
### 2. Go
```sh
# Download dependencies
pnpm
# Build it
pnpm build
# Or run unit test
pnpm test
```

All pull requests are welcomed!🧑‍💻