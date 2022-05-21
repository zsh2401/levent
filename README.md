# 🚌 EventX
A better solution of distributing events in TS and JS.

🌟 High performance   
🌟 Async supported   
🌟 Sticky event   
🌟 Preventable
🌟 Lightful   

## Getting Started
```
yarn add eventx
```

### Quick Start
```typescript
import eventx from "eventx"

//subscribe event
eventx.on("test",(arg:string)=>{
    return arg
})

//publish event.
const values = eventx.emit("test","I love you.")

console.log(values) // ['I love you.']
```
### Strict event types.
```typescript
import { EventBus } from "eventx"

// create your own event bus instance
const bus : EventBus<{
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
git clone https://github.com/zsh2401/eventx && cd eventx
```
### 2. Go
```sh
# Download dependencies
yarn
# Build it
yarn build
# Or run unit test
yarn test
```

All pull requests are welcomed!🧑‍💻