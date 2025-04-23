"use client";

export function assertThat(condition: unknown, message?: string): asserts condition is true {
  if (condition) {
    return;
  }

  message && console.log(message);

  throw new Error("Condition must be true");
}

export function assertExists<T>(value: T | null | undefined): asserts value is T {
  if (!value) {
    throw new Error(`${value} does not exist.`);
  }
}

export function validateExists<T>(value: T | null | undefined): T;
export function validateExists<T>(value: Promise<T | null | undefined>): Promise<T>;
export function validateExists<T>(
  valueOrPromise: T | Promise<T | null | undefined> | null | undefined
): T | Promise<T> {
  if (valueOrPromise instanceof Promise) {
    return valueOrPromise.then((value) => {
      if (value == null) {
        throw new Error(`${value} does not exist.`);
      }
      return value;
    });
  }

  if (valueOrPromise == null) {
    throw new Error(`${valueOrPromise} does not exist.`);
  }

  return valueOrPromise;
}
