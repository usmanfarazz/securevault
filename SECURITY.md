# Security Policy

SecureVault is a fully client-side password manager: no server, no account,
and no vault data ever leaves your browser.

## Reporting a vulnerability

If you find a security issue, please do not open a public issue.
Email usmanfaraz1818@gmail.com with:

- what the issue is and where it is (file or feature)
- steps to reproduce it
- the browser and version you used

I will reply within 7 days and credit you in the fix unless you prefer
to stay anonymous.

## Scope

In scope: the encryption (AES-256-GCM, PBKDF2-HMAC-SHA256), vault storage,
encrypted backups, auto-lock, clipboard clearing and the service worker.

Out of scope: attacks that need full control of the user's device or
browser, and weak master passwords chosen by the user.
