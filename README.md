# 🌍 Guess The Flag

An interactive quiz application that challenges users to identify countries based on their flags.
Built with a modern React architecture and fully typed using TypeScript for reliability and scalability.

---

## 📸 Preview

<p align="center">
  <img src="./public/assets/home-page.png" width="45%" />
  <img src="./public/assets/game-page.png" width="45%" />
</p>

---

## 🚀 Features

* 🎯 Multiple game modes:

  * **Streak Mode** – play until your first mistake
  * **Time Mode** – answer within a time limit

* 🧠 Dynamic quiz generation from live country data

* 🔊 Optional sound effects for correct/incorrect answers

* 📊 Score tracking with persistent storage (`localStorage`)

* ⏱️ Real-time countdown timer (Time Mode)

* 🎨 Responsive and interactive UI

---

## 🛠️ Tech Stack

* **React** – Component-based UI
* **TypeScript** – Type safety and maintainability
* **Vite** – Fast development and build tooling
* **CSS3** – Custom styling
* **REST API** – Country data from `flagcdn.com`

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/port-iamniraj/Guess-The-Flag.git
cd guess-the-flag
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🌐 Live Demo

> https://port-iamniraj.github.io/Guess-The-Flag/

---

## 🧠 Implementation Highlights

* Strongly typed global state using React Context
* Custom hook abstraction for safer context consumption
* Dynamic quiz generation with randomized options
* Controlled side effects using `useEffect`
* Defensive programming for async data and local storage

---

## 📌 Notes

* All game data is generated dynamically from an external API
* TypeScript ensures safer state and event handling
* The application avoids unnecessary re-renders and side effects

---

## 🔮 Future Enhancements

* Difficulty levels (Easy / Medium / Hard)
* Category-based quizzes
* Leaderboard system
* Animations and transitions
* Mobile UI improvements
