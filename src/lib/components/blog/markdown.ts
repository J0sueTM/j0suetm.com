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

  let type: string = 'text'
  let modifier: string = 'sm'
  let data: string = ''

  let isDoneWithCode: boolean = false

  let tokens: MdToken[] = []
  lines.forEach((l: string) => {
    const la = l.replaceAll(' ', '')
    if (la.length <= 0)
      data = (type === 'code') ? data + '\n' : '\n'

    if (la.includes('```') || (type === 'code' && !isDoneWithCode)) {
      type = 'code'
    } else if (la.at(0) === '-') {
      type = 'topic'
    } else if (la.includes('[]')) {
      type = 'resource'
    } else {
      type = 'text'
    }

    switch (type) {
      case 'code':
        if (la.includes('```')) {
          const lang = la.replace('```', '')
          if (lang.length >= 1)
            modifier = lang
          else
            isDoneWithCode = true
        } else {
          data += (la.length <= 0) ? l : l + '\n'
        }

        if (!isDoneWithCode)
          return

        break
      case 'text':
        if (la.includes('#')) {
          const ts = la.replace(/[^#]/g, '').split('#')
          modifier = getModifier(ts.length)
        } else {
          modifier = 'sm'
        }

        data = l.replaceAll('#', '')

        break
      case 'topic':
        data = l.replaceAll('-', '')
        modifier = l.indexOf('-').toString()

        break
      default:
        break
    }

    tokens.push({
      type: type,
      modifier: modifier,
      data: data
    })

    if (isDoneWithCode) {
      type = ''
      isDoneWithCode = false
    }
  })

  return tokens
}