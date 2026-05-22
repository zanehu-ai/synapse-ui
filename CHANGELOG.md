# Changelog

All notable changes to `@zanehu-ai/synapse-ui` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.8] - 2026-05-22

First release under the `@zanehu-ai/synapse-ui` npm name after the package
rename from `@techfitmaster/synapse-ui` (the latter remains at 0.1.6 and will
not see further releases).

### Added
- Console shared components surface (`feat(ui): expose console shared components`).
- Opcorbit platform primitives (`feat(ui): expose opcorbit platform primitives`).
- `Pagination` component supports `pageSize` switcher.

### Changed
- `Tabs` variant declarations made portable: `tabsListVariants` now returns
  a typed function signature; `TabsListVariant` / `TabsListVariantProps` /
  `TabsListVariantsProps` exported. This unblocks downstream consumers (such
  as opcorbit/console) that were previously pinned to commit `394f067` to
  pick up this fix.
- `SelectField` listbox testability + label association improvements.
- Dialog / AlertDialog / Button styling consistency fixes.
- Package renamed to `@zanehu-ai/synapse-ui` (was `@techfitmaster/synapse-ui`).

### Fixed
- Dist entrypoints node-resolvable.
- String table column width support.

## [0.1.6]

Last release under `@techfitmaster/synapse-ui`; no further updates planned.

[0.1.8]: https://github.com/zanehu-ai/synapse-ui/releases/tag/v0.1.8
[0.1.6]: https://github.com/zanehu-ai/synapse-ui/releases/tag/v0.1.6
