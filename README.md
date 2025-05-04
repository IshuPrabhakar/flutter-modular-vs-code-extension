## 📦 Flutter Modular Structure Generator

A Visual Studio Code extension that generates a modular folder structure for Flutter projects using **Riverpod** and **GoRouter**, following clean architecture principles.

---

### ✨ Features

* 📁 **Generate Base Flutter Project Structure**

  * Creates a well-organized `lib/src` folder structure
  * Sets up directories for app, routing, features, resources, and more
  * Auto-generates essential Dart files like `main.dart`, `app.dart`, and `app_router.dart`
  * Adds dependencies for `flutter_riverpod` and `go_router`

* 🧩 **Generate a New Feature**

  * Prompts for a feature name (e.g., `auth`, `home`)
  * Creates clean architecture layers:

    * `application/services`
    * `data/`
    * `domain/models`
    * `ui/pages`, `widgets`, `states`, `controllers`
  * Auto-generates a sample screen for the feature

---

### 🛠 Commands

| Command ID                                   | Description                                    |
| -------------------------------------------- | ---------------------------------------------- |
| `flutter-modular.flutterDirStructure`        | Generate the full Flutter app folder structure |
| `flutter-modular.flutterFeatureDirStructure` | Generate a folder structure for a new feature  |

---

### 🚀 Usage

1. Open a Flutter project in VS Code.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).
3. Run the command:

   * **Generate Base Structure**: `Flutter Modular: Generate Project Structure`
   * **Generate Feature**: `Flutter Modular: Generate Feature Folder Structure`
4. For features, you'll be prompted to:

   * Select the `lib/` folder
   * Enter a feature name like `profile`, `settings`, etc.

---

### 📁 Example Output (Feature: `auth`)

```
lib/
└── src/
    └── features/
        └── auth/
            ├── application/services/
            ├── data/repository/
            ├── data/dtos/
            ├── data/data_sources/
            ├── domain/models/
            └── ui/
                ├── controllers/
                ├── states/
                ├── widgets/
                └── pages/
                    └── auth_screen.dart
```

---

### 📦 Dependencies Added

```yaml
flutter_riverpod: ^2.6.1
go_router: ^15.1.1
```

---

### ✅ Requirements

* Flutter SDK
* VS Code
* Dart & Flutter extensions installed

---

### 💡 Future Ideas (Optional Enhancements)

* Generate additional base files (controller, state, model)
* User-defined dependency versions
* Configuration via a `.flutter_modularrc` file
* Add CLI support

---

### 🧑‍💻 Contributing

Pull requests, ideas, and issues are always welcome!
