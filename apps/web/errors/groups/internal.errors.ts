import {ErrorGroupRecord} from "@/errors/types";
import {ErrorGroups, ErrorGroupsDefinition} from "@/errors/wavesurfer.errors";

export const InternalErrorIdentifiers = {
  Generic: "Generic"
} as const;

export const InternalErrors: ErrorGroupRecord<typeof InternalErrorIdentifiers> = {
  Generic: {
    name: "Generic Internal Error",
    description: "An internal error occurred",
    message: ErrorGroupsDefinition[ErrorGroups.Internal].message,
    code: ErrorGroupsDefinition[ErrorGroups.Internal].code
  }
};
