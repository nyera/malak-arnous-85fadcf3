# Grant admin access to fouad16adam@gmail.com

## Current state

I checked the roles table: there is **no admin account yet**. The only role row is `fouad16adam@gmail.com` → `customer` (created 10 Aug 2026). So `/admin` is currently blocked for everyone.

## What I'll do

A single database change that adds the `admin` role to the existing account for `fouad16adam@gmail.com`, keeping the current `customer` role as-is.

- Looks up the account by email (case-insensitive) in the profiles table
- Inserts an `admin` role row for that account, doing nothing if it already exists

No code, layout, or webhook changes.

## After it runs

Sign out and sign back in with `fouad16adam@gmail.com`, then open `/admin` — the admin dashboard (Programs, Modules, Lessons, Students) will be available.
