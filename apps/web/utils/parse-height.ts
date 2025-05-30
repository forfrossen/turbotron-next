export const parseHeight = (value: string) => parseInt(value.replace(/rem/g, "")) * 10;
