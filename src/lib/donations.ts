export interface DonationOption {
  value: string;
  link: string;
  pixCode: string;
}

const text = (value: unknown) => typeof value === 'string' ? value : '';

export function getDonationOptions(content: Record<string, unknown>): DonationOption[] {
  if (Array.isArray(content.donationOptions)) {
    return content.donationOptions.filter((item): item is Record<string, unknown> =>
      typeof item === 'object' && item !== null && !Array.isArray(item)
    ).map(item => ({ value: text(item.value), link: text(item.link), pixCode: text(item.pixCode) }));
  }
  return [1, 2, 3].map(index => ({
    value: text(content[`donationValue${index}`]),
    link: text(content[`donationLink${index}`]),
    pixCode: text(content[`donationPixCode${index}`]),
  })).filter(option => option.value.trim());
}

export function isDonationLinkValid(link: string): boolean {
  try {
    const url = new URL(link);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validateDonationOptions(options: DonationOption[]): string | null {
  for (const [index, option] of options.entries()) {
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(option.value.trim()) || Number(option.value.trim().replace(',', '.')) <= 0) {
      return `Doação ${index + 1}: informe um valor maior que zero, com até duas casas decimais.`;
    }
    if (option.link.trim() && !isDonationLinkValid(option.link.trim())) {
      return `Doação ${index + 1}: informe um link completo começando com https:// ou http://.`;
    }
    if (!option.link.trim() && !option.pixCode.trim()) {
      return `Doação ${index + 1}: informe o link de pagamento ou o código PIX.`;
    }
  }
  return null;
}