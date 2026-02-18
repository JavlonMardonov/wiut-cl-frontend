export type InputNumberValue = string | number | null | undefined;
type Options = Intl.NumberFormatOptions | undefined;

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

export function fNumber(inputValue: InputNumberValue, options?: Options) {
  const locale = { code: "uz", currency: "UZS" };

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}
