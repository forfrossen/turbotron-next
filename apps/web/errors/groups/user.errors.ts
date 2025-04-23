import {ErrorGroupRecord} from "@/errors/types";
import {ErrorGroups, ErrorGroupsDefinition} from "@/errors/wavesurfer.errors";

export const UserErrorIdentifiers = {
  Generic: "Generic"
} as const;

export const UserErrors: ErrorGroupRecord<typeof UserErrorIdentifiers> = {
  Generic: {
    name: "Generic User Error",
    description: "An error occurred due to user input",
    message: ErrorGroupsDefinition[ErrorGroups.User].message,
    code: ErrorGroupsDefinition[ErrorGroups.User].code
  }
};
