# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-05-04

### Added

- Command: `Flutter: Generate Flutter Folder Structure`
  - Generates full project directory under `lib/`
  - Adds initial files like `main.dart`, `app.dart`, and router config
  - Sets up features like `home` and `user`
  - Adds Riverpod and GoRouter dependencies to `pubspec.yaml`

- Command: `Flutter: Generate New Feature Structure`
  - Prompts for feature name
  - Creates clean modular architecture:
    - `application/services`
    - `data/repository`, `dtos`, `data_sources`
    - `domain/models`
    - `ui/controllers`, `states`, `widgets`, `pages`
  - Adds a sample screen file for the new feature

### Notes

- Extension uses `fs` and `path` Node modules for folder creation
- Encourages scalable, maintainable Flutter architecture
