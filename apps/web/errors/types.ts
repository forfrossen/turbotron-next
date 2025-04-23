import {ErrorGroups} from "@/errors/wavesurfer.errors";

export type ErrorGroup = (typeof ErrorGroups)[keyof typeof ErrorGroups];

export type ErrorGroupDetails = {
  message: string;
  description: string;
  code: number;
};

export type ErrorGroupsType = Record<ErrorGroup, ErrorGroupDetails>;

export type ErrorIdentifier = string;

export type ErrorDetailsType = {
  name: string;
  description: string;
  message: string;
  code: number;
};

export type ErrorGroupIdentifiers = Record<string, string>;

export type ErrorGroupRecord<T extends ErrorGroupIdentifiers> = Record<keyof T, ErrorDetailsType>;

export type ErrorMapType = Record<ErrorGroup, ErrorGroupRecord<ErrorGroupIdentifiers>>;
