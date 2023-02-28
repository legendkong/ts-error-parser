/* -------------- How to run `errorchecker.ts` --------------
    1. run yarn typecheck >  <filename>.txt to generate your error log 
    2. run node errorchecker.ts  <filename>.txt 
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

// get name of the <filename>.txt file
const filename: string = process.argv[2]

// read error log file
const errorLog: string = fs.readFileSync(filename, 'utf8')

// split error log file into individual lines
const lines: string[] = errorLog.trim().split('\n')

// fileCounts object to store the counts of files with errors for each parent folder
const fileCounts: { [key: string]: { [key: string]: number } } = {}

let match: RegExpExecArray | null

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

console.log('\n💥💥💥💥💥💥💥💥💥💥💥💥💥💥')
const count: number = (errorLog.match(/error TS/g) || []).length
console.log(`Total number of errors: ${count}`)
console.log('💥💥💥💥💥💥💥💥💥💥💥💥💥💥')
