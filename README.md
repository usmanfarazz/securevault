# 🔐 SecureVault

An **offline, encrypted password manager** and password strength checker that runs entirely in your browser. Your data never leaves your device.

**Live demo:** https://usmanfarazz.github.io/securevault/

---

## Why it's safe

- **100% client-side** — no server, no account, no network calls. Passwords never leave the browser tab.
- **Strong encryption** — your vault is encrypted with **AES-256-GCM**. The key is derived from your master password using **PBKDF2-HMAC-SHA256 (310,000 iterations)** with a random salt.
- **Zero-knowledge** — the master password is never stored, only a small encrypted verification token. If someone reads the stored data, they see nothing but ciphertext.
- **Auto-lock** — the vault locks automatically when the tab is hidden or after 90 seconds idle.

> ⚠️ There is no password reset. If you forget your master password, the data cannot be recovered — that is the point of end-to-end encryption.

## Features

- 🔍 Real-time password strength analysis (entropy, estimated offline crack time, character pool, weakness hints)
- 🎲 Strong random password generator
- 💾 Encrypted vault: save, search, reveal, copy and delete entries
- 📋 Clipboard auto-clear 20 seconds after copy
- 📱 Installable PWA — works fully offline

## Tech

Pure HTML, CSS and JavaScript. Encryption via the built-in **Web Crypto API** — no third-party crypto libraries. Offline support via a service worker.

## Run locally

Because service workers need a real origin, serve the folder over HTTP:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Security notes / roadmap

- Strength scoring uses Shannon entropy, which can over-rate dictionary-based passwords (e.g. `Word@2024`). A future version could integrate a large wordlist (like zxcvbn) and a Have I Been Pwned k-anonymity breach check.
- PBKDF2 is used because it's built into the Web Crypto API; Argon2id would be stronger and is a planned upgrade.

## License

MIT © Usman Faraz
