# 🔷 Mohammed's AI Chatbot

A modern, professional AI chatbot built with React and Vite, powered by DeepSeek AI through OpenRouter API. Features a sleek blue interface with dark mode support.

![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 💬 **Multiple Conversations** - Manage multiple chat sessions simultaneously
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 🤖 **AI Models** - Switch between different AI models (DeepSeek, OpenChat)
- 💾 **Local Storage** - Conversations persist across browser sessions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Clean, professional blue color scheme

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Symooomzip/react_chatbot.git
   cd react_chatbot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual OpenRouter API key.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173/` to see the chatbot in action!

## 📦 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **HTTP Client:** Axios
- **AI API:** OpenRouter (DeepSeek, OpenChat)
- **Styling:** CSS3 with CSS Variables
- **Code Quality:** ESLint

## 📁 Project Structure

```
chatbot/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment variables (not in git)
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎨 Customization

### Changing Colors

Edit `src/App.css` and modify the CSS variables in `.light-mode` and `.dark-mode` classes:

```css
.light-mode {
  --primary-color: #5b9fff; /* Change this for different accent color */
  --sidebar-bg: #f0f8ff; /* Sidebar background */
  /* ... more variables */
}
```

### Adding New AI Models

Edit the `models` array in `src/App.jsx`:

```javascript
const models = [
  { id: "deepseek/deepseek-chat", name: "DeepSeek Chat" },
  { id: "your-model-id", name: "Your Model Name" },
];
```

## 🔒 Security Notes

- ⚠️ **Never commit your `.env` file** - It contains your API key
- The `.env` file is already in `.gitignore`
- Keep your OpenRouter API key private

## 🐛 Troubleshooting

### PowerShell Execution Policy Error

If you get an execution policy error on Windows:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or run commands with bypass:

```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Mohammed**

- GitHub: [@Symooomzip](https://github.com/Symooomzip)

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for AI API access
- [DeepSeek](https://www.deepseek.com/) for the AI model
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [React](https://react.dev/) for the UI framework

---

**Enjoy chatting with AI! 🤖**
