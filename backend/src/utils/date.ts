export function iso8601ToDateTime(iso8601: string) {
  return new Date(iso8601);
}

export function parseValidUntil(validUntil?: string): Date | undefined {
  if (!validUntil) return undefined;

  let date = new Date(validUntil);

  if (isNaN(date.getTime())) {
    const withSeconds = `${validUntil}:00`;
    date = new Date(withSeconds);
  }

  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}
