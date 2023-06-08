import { CommonCommandFactory } from "../history/common/command-factory";
import { CommonCommandMap, commonCommandKeys } from "../history/common/command-map";
import { Command } from "../history/model";
import { BuildDetails } from "../pcparts/build-details.model";


export interface BuildCommandMap extends CommonCommandMap<BuildDetails> {
  // Implement Build-specific commands here
  // 'my-Build-command': MyCommandData;
}

type BuildCommandkeys = keyof BuildCommandMap;

export class BuildCommandFactory extends CommonCommandFactory<BuildDetails> {
  public create<K extends BuildCommandkeys>(key: K, commandData: BuildCommandMap[K]): Command {
    // if (isBuildCommand(commandData, key, 'my-Build-command')) {
    //
    // }
    return super.create(key as commonCommandKeys<BuildDetails>, commandData as any);
  }
}

export function isBuildCommand<K extends keyof BuildCommandMap>(
  commandData: BuildCommandMap[keyof BuildCommandMap],
  actualKey: string,
  expectedKey: K): commandData is BuildCommandMap[K] {
  return actualKey === expectedKey;
}