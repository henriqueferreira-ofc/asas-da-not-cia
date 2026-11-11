import { describe, expect, it } from 'vitest';
import { getDonationOptions, isDonationLinkValid, validateDonationOptions } from '@/lib/donations';

describe('Admin-managed donations', () => {
  it('preserves existing configured amounts and payment codes', () => {
    expect(getDonationOptions({ donationValue1: '9,90', donationPixCode1: 'pix1', donationValue2: '19,90', donationPixCode2: 'pix2', donationValue3: '39,90', donationPixCode3: 'pix3' })).toEqual([
      { value: '9,90', link: '', pixCode: 'pix1' },
      { value: '19,90', link: '', pixCode: 'pix2' },
      { value: '39,90', link: '', pixCode: 'pix3' },
    ]);
  });
  it('supports more than three amounts with their own links', () => {
    const donationOptions = ['9,90', '19,90', '39,90', '75,50'].map(value => ({ value, link: `https://example.com/pay/${value}`, pixCode: '' }));
    expect(getDonationOptions({ donationOptions })).toEqual(donationOptions);
    expect(validateDonationOptions(donationOptions)).toBeNull();
  });
  it('allows removal of all amounts without recreating legacy ones', () => {
    expect(getDonationOptions({ donationOptions: [], donationValue1: '9,90' })).toEqual([]);
  });
  it('requires a positive monetary amount', () => {
    expect(validateDonationOptions([{ value: '0', link: 'https://example.com', pixCode: '' }])).not.toBeNull();
    expect(validateDonationOptions([{ value: '12,345', link: 'https://example.com', pixCode: '' }])).not.toBeNull();
  });
  it('accepts external payment links and rejects unsafe protocols', () => {
    expect(isDonationLinkValid('https://example.com/payment')).toBe(true);
    expect(isDonationLinkValid('javascript:alert(1)')).toBe(false);
    expect(isDonationLinkValid('/payment')).toBe(false);
  });
  it('requires a payment destination', () => {
    expect(validateDonationOptions([{ value: '9,90', link: '', pixCode: '' }])).not.toBeNull();
  });
});