## TypeScript error parser 💥💥💥

### Run this script to parse your TS errors from your error log.

The script automatically groups them into their error types for easier debugging and visualization.

```
    1. run yarn typecheck >  <filename>.txt to generate your error log
    2. run node errorchecker.ts  <filename>.txt
```

<br>

### Expected output

<p align="center">
  <img src="https://github.com/legendkong/ts-error-parser/blob/main/example.png?raw=true" width="800">
</p>

### Use cases

- For teams migrating from legacy React to newer verisons on React, such as v18.
- When theres too damn many type errors scattered across your files.
