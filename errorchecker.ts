/* -------------- How to run `errorchecker.ts` --------------
    1. run yarn <typecheck>   >  <filename>.txt        <----to generate your error log 
    2. run node errorchecker.ts  <filename>.txt        <----to run this script on your error log
-------------------------------------------------------------*/

import * as fs from 'fs'

console.log(
  '\x1b[36m',
  `
  ------------------------------------------------------
    
                    Error Checker 💥
                
  ------------------------------------------------------ 
`
)

// regex to match the parent folder
const parentFolderRegex = /src\/([^/]*)/

// regex to match "error TS" aka type of errors
const errorRegex = /\berror TS[0-9]{4}/gm

// get name of the <filename>.txt file
const filename: string = process.argv[2]

// read error log file
const errorLog: string = fs.readFileSync(filename, 'utf8')

// split error log file into individual lines
const lines: string[] = errorLog.trim().split('\n')

// fileCounts object to store the counts of files with errors for each parent folder
const fileCounts: { [key: string]: { [key: string]: number } } = {}

// find all unique error codes in the error log file and count their occurrences
const uniqueErrors: { [key: string]: number } = {}
let match: RegExpExecArray | null
while ((match = errorRegex.exec(errorLog))) {
  const errorCode: string = match[0]
  if (uniqueErrors[errorCode]) {
    uniqueErrors[errorCode]++
  } else {
    uniqueErrors[errorCode] = 1
  }
}

// loop thru each line of the error log
for (const line of lines) {
  // extract parent folder and filename from the line
  const match: RegExpExecArray | null = parentFolderRegex.exec(line)

  if (match) {
    const parentFolder: string = match[1]
    const parts: string[] = line.split('(')
    const fileName: string = parts[0].substring(parts[0].lastIndexOf('/') + 1)
    const relativePath: string = parts[0].substring(
      0,
      parts[0].lastIndexOf('/')
    )

    // increment count for this file in fileCounts object
    if (!fileCounts[parentFolder]) {
      fileCounts[parentFolder] = {}
    }
    if (!fileCounts[parentFolder][`${relativePath}/${fileName}`]) {
      fileCounts[parentFolder][`${relativePath}/${fileName}`] = 0
    }
    fileCounts[parentFolder][`${relativePath}/${fileName}`]++
  }
}

// sort parent folder in ascending order
const parentFolders: string[] = Object.keys(fileCounts).sort()

// loop through each parent folder and output the file counts
for (const parentFolder of parentFolders) {
  console.log('📂' + '\x1b[33m%s\x1b[0m', ` ${parentFolder}`)
  const uniqueFileCount: number = Object.keys(fileCounts[parentFolder]).length
  let total = 0
  for (const fileName in fileCounts[parentFolder]) {
    console.log(`• ${fileName} errors: ${fileCounts[parentFolder][fileName]}`)
    total += fileCounts[parentFolder][fileName]
  }
  console.log(
    '--------------------------------------------------------------------------------------------------------------'
  )
  console.log(
    `Total number of UNIQUE files with errors in src/${parentFolder}: ${uniqueFileCount}`
  )

  console.log(
    '\x1b[41m%s\x1b[0m',
    `Total number of files with errors in  src/${parentFolder}: ${total}`
  )
  console.log('\n')
}

const TS7006 = 'error TS7006'
const TS7031 = 'error TS7031'
const TS2339 = 'error TS2339'
const TS2769 = 'error TS2769'
const TS2345 = 'error TS2345'
const TS2322 = 'error TS2322'
const TS2559 = 'error TS2559'
const TS2746 = 'error TS2746'
const TS2786 = 'error TS2786'

console.log('🔻 ' + '\x1b[35m%s\x1b[0m', 'Types of errors')
// output the results
for (const errorCode in uniqueErrors) {
  switch (true) {
    case TS7006 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        `\tParameter 'xxx' implicitly has an 'any' type`
      )
      break
    case TS7031 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tBinding element 'xxx' implicitly has an 'any' type`
      )
      break
    case TS2339 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tProperty 'x' does not exist on type 'Y'`
      )
      break
    case TS2769 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tNo overload matches this call`
      )
      break
    case TS2345 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tArgument of type 'T' is not assignable to parameter of type 'xxx'`
      )
      break
    case TS2322 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tType 'Object[]' is not assignable to type '[Object]'`
      )
      break
    case TS2559 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tType '{ children: Element[]; }' has no properties in common with type 'IntrinsicAttributes'`
      )
      break
    case TS2746 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \tThis JSX tag's 'children' prop expects a single child of type 'Element | undefined', but multiple children were provided`
      )
      break
    case TS2786 == errorCode:
      console.log(
        `${errorCode}: ${uniqueErrors[errorCode]}` + '\x1b[35m%s\x1b[0m',
        ` \t'Component' cannot be used as a JSX component`
      )
  }
}

console.log('\n💥💥💥💥💥💥💥💥💥💥💥💥💥💥')
const count: number = (errorLog.match(/error TS/g) || []).length
console.log(`Total number of errors: ${count}`)
console.log('💥💥💥💥💥💥💥💥💥💥💥💥💥💥')
