import {InternalErrors, SystemErrors, UserErrors} from "@/errors/groups";
import {ErrorGroupsType, ErrorMapType} from "@/errors/types";

export const ErrorGroups = {
  System: "System",
  User: "User",
  Internal: "Internal"
} as const;

export const ErrorGroupsDefinition: ErrorGroupsType = {
  [ErrorGroups.System]: {
    message: "System error",
    description: "An error occurred in the system",
    code: 500
  },

  [ErrorGroups.User]: {
    message: "User error",
    description: "An error occurred due to user input",
    code: 400
  },

  [ErrorGroups.Internal]: {
    message: "Internal error",
    description: "An internal error occurred",
    code: 500
  }
} as const;

export const WaveSurferErrors: ErrorMapType = {
  Internal: InternalErrors,
  System: SystemErrors,
  User: UserErrors
} as const;
