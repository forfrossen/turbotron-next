import {ErrorGroupRecord} from "@/errors/types";
import {ErrorGroups, ErrorGroupsDefinition} from "@/errors/wavesurfer.errors";

export const SystemErrorIdentifiers = {
  Generic: "Generic"
} as const;

export const SystemErrors: ErrorGroupRecord<typeof SystemErrorIdentifiers> = {
  [SystemErrorIdentifiers.Generic]: {
    name: "Generic System Error",
    description: "An error occurred in the system",
    message: ErrorGroupsDefinition[ErrorGroups.System].message,
    code: ErrorGroupsDefinition[ErrorGroups.System].code
  }
};
