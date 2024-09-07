import path from 'path';
import { Config } from './types';
import { compact } from 'lodash'
import format from 'date-format';
import * as fs from 'fs';

export type PathVariables = {
  name: string,
  dir: string,
  ext: string,
  timestamp: string,
  date: string,
  time: string,
  phew: string
}

export const extractPathVariables = (file: string, config: Config): PathVariables => {
  const p = path.resolve(file)
  const dir = path.dirname(p)
  const ext = path.extname(p);
  const name = path.basename(p, ext);

  const { layout, variation, background } = config
  const blur = background === 'blur' ? background : null
  const overlay = config.layout === 'card' && config.overlay ? 'overlay' : null

  return {
    name, dir, ext,
    timestamp: Date.now().toString(),
    date: dateFormat('yyyy-MM-dd'),
    time: dateFormat('hh:mm:ss'),
    phew: compact(['phew', layout, variation, overlay, blur]).join('-')
  }
}

const resolvePath = (pattern: string, pathVariables: PathVariables, resolve = true) => {
  const {name, dir, ext, timestamp, date, time, phew} = pathVariables

  const p = pattern
    .replaceAll('{name}', name)
    .replaceAll('{dir}', dir)
    .replaceAll('{ext}', ext)
    .replaceAll('{timestamp}', timestamp)
    .replaceAll('{date}', date)
    .replaceAll('{time}', time)
    .replaceAll('{phew}', phew)

  return resolve ? path.resolve(p) : p
}

export const parsePath = (pathVariables: PathVariables, dest?: string) => {
  if (dest) {
    const destPath = resolvePath(dest, pathVariables)

    if (!path.extname(destPath)) {
      fs.mkdirSync(destPath, {recursive: true})
      return path.join(destPath, resolvePath('{name}-{phew}{ext}', pathVariables, false))
    }
    return destPath
  }
  return resolvePath('{dir}/{name}-{phew}{ext}', pathVariables)
}


export const dateFormat = (pattern: string, date = new Date()): string => {
  return format(pattern, date)
}
