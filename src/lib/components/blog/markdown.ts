export interface MdToken {
  type: string
  modifier: string
  data: any
}

const getModifier = (size: number) => {
  let modifier: string
  switch (size) {
    case 4:
      modifier = 'md'
      break;
    case 3:
      modifier = '3xl'
      break;
    case 2:
      modifier = '4xl'
      break;
    case 1:
      modifier = '5xl'
      break;
    default:
      modifier = 'sm'
      break;
  }

  return modifier
}

export const textToMarkdown = (text: string) => {
  let lines: string[] = text.split('\n')


  let isReadingCode: boolean = false
  let codeLanguage: string = ''
  let codeBuffer: string = ''

  let type: string = 'text'
  let modifier: string = 'sm'
  let tokens: MdToken[] = []
  lines.forEach((l: string) => {
    const la = l.replaceAll(' ', '')
    if (la.length <= 0 && isReadingCode) {
      codeBuffer += '\n'
      return
    } else if (la.length <= 0)
      return

    if (la.includes('#') && !isReadingCode) {
      const ts = la.replace(/[^#]/g, '').split('#')
      modifier = getModifier(ts.length)
      l = l.replaceAll('#', '')

      type = 'text'
    } else if (la.includes('```')) {
      isReadingCode = !isReadingCode
      if (isReadingCode) {
        codeLanguage = la.replace('```', '')
        l = ''

        type = 'code'
        modifier = codeLanguage

        return
      }
    }
    if (isReadingCode && !la.includes('```')) {
      codeBuffer += l + '\n'
    } else if (isReadingCode && la.includes('```')) {
      isReadingCode = false
    }

    if (!isReadingCode) {
      tokens.push({
        type: type,
        modifier: modifier,
        data: (codeBuffer !== '') ? codeBuffer : l 
      })

      modifier = 'sm'
      codeBuffer = ''
    }
  })

  return tokens
}