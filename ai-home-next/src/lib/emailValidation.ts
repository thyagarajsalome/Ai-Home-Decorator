import dns from "dns";

// Comprehensive blocklist of disposable / temporary / burner email domains
export const DISPOSABLE_DOMAINS: Set<string> = new Set([
  // Popular Disposable Email Providers
  "mailinator.com",
  "10minutemail.com",
  "10minutemail.net",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.io",
  "tempail.com",
  "tempmailo.com",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.net",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "cool.fr.nf",
  "jetable.fr.nf",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",
  "getnada.com",
  "dispostable.com",
  "burnermail.io",
  "fakeinbox.com",
  "mohmal.com",
  "inboxkitten.com",
  "mytemp.email",
  "crazymailing.com",
  "nada.ltd",
  "dropmail.me",
  "fakemailgenerator.com",
  "generator.email",
  "emailondeck.com",
  "emailondeck.net",
  "tempinbox.com",
  "discard.email",
  "discardmail.com",
  "spambog.com",
  "mailnesia.com",
  "maildrop.cc",
  "getairmail.com",
  "mintemail.com",
  "mytempemail.com",
  "trashmail.me",
  "trashmail.org",
  "trashemail.in",
  "tempmailgen.com",
  "fakemail.net",
  "fakemail.com",
  "receivefreesms.com",
  "inboxbear.com",
  "burnermail.com",
  "boun.cr",
  "instantemailaddress.com",
  "anonymbox.com",
  "jetable.org",
  "kasmail.com",
  "emailfake.com",
  "generator.net",
  "tmailor.com",
  "tempmailaddress.com",
  "smailpro.com",
  "crazymail.com",
  "dayrep.com",
  "teleworm.us",
  "armyspy.com",
  "cuvox.de",
  "fleckens.hu",
  "gustr.com",
  "jourrapide.com",
  "rhyta.com",
  "superrito.com",
  "einrot.com",

  // Dummy / Fake / Test Domains
  "test.com",
  "testing.com",
  "example.com",
  "example.org",
  "example.net",
  "sample.com",
  "fake.com",
  "fakeemail.com",
  "asdf.com",
  "asdfgh.com",
  "qwerty.com",
  "domain.com",
  "invalid.com",
  "nowhere.com",
  "xyz.com",
  "abc.com",
  "aaa.com",
  "bbb.com",
  "none.com",
  "noemail.com",
  "nomail.com",
  "null.com",
]);

// Bogus usernames often typed to bypass forms
export const BOGUS_USERNAMES: Set<string> = new Set([
  "test",
  "testing",
  "tester",
  "fake",
  "asdf",
  "asdfgh",
  "asdfasdf",
  "qwerty",
  "admin",
  "administrator",
  "user",
  "demo",
  "none",
  "no",
  "na",
  "null",
  "sample",
  "example",
  "temp",
  "trash",
  "spam",
  "junk",
  "aaa",
  "aaaa",
  "aaaaa",
  "123",
  "1234",
  "12345",
  "123456",
  "abc",
  "abcd",
  "xyz",
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  cleanEmail?: string;
}

/**
 * Validates email format, structure, and checks against disposable domains & bogus patterns.
 */
export function validateEmailSyntax(rawEmail: string): EmailValidationResult {
  if (!rawEmail || typeof rawEmail !== "string") {
    return { isValid: false, error: "Please enter an email address." };
  }

  const clean = rawEmail.trim().toLowerCase();

  // Basic RFC 5322 regex check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean)) {
    return { isValid: false, error: "Please enter a valid email address (e.g. name@gmail.com)." };
  }

  const parts = clean.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Invalid email address." };
  }

  const [username, domain] = parts;

  // Username must be at least 2 chars
  if (username.length < 2) {
    return { isValid: false, error: "The email address prefix is too short." };
  }

  // Check for bogus usernames
  if (BOGUS_USERNAMES.has(username)) {
    return { isValid: false, error: "Please provide a genuine personal or work email address." };
  }

  // Check for repeated single character (e.g., "aaaaa@...")
  if (/^(.)\1+$/.test(username) && username.length > 2) {
    return { isValid: false, error: "Please enter a genuine email address." };
  }

  // Domain checks
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];

  if (!tld || tld.length < 2) {
    return { isValid: false, error: "Please enter a valid domain extension (e.g. .com, .org)." };
  }

  // Check disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Temporary or disposable email addresses are not accepted. Please use your real email.",
    };
  }

  return { isValid: true, cleanEmail: clean };
}

/**
 * Validates domain has active Mail Exchange (MX) DNS records.
 * Uses a 3.5s timeout to prevent long delays.
 */
export async function validateEmailDomainMx(domain: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    const mxPromise = dns.promises.resolveMx(domain);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DNS_TIMEOUT")), 3500)
    );

    const records = await Promise.race([mxPromise, timeoutPromise]);

    if (!records || records.length === 0) {
      return {
        isValid: false,
        error: `The domain "${domain}" cannot receive emails. Please use an active email address.`,
      };
    }

    return { isValid: true };
  } catch (err: any) {
    // If timeout, allow to pass so we don't block legitimate users on slow DNS
    if (err.message === "DNS_TIMEOUT") {
      return { isValid: true };
    }

    // ENOTFOUND or ENODATA means domain doesn't exist or has no mail servers
    if (err.code === "ENOTFOUND" || err.code === "ENODATA") {
      return {
        isValid: false,
        error: `The email domain "${domain}" does not exist or has no active mail server.`,
      };
    }

    // Default: allow on unexpected network errors to avoid false negatives
    return { isValid: true };
  }
}
