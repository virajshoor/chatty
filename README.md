# 🚀 CloudChat - Real-time Chat Application

A modern, real-time chat application built with React, PartyKit, and Cloudflare Workers. Experience lightning-fast messaging powered by Cloudflare's global edge network and Durable Objects.

## ✨ Features

- **Real-time messaging** - Instant message delivery using WebSocket connections
- **Modern UI** - Beautiful, responsive design with smooth animations
- **Room-based chat** - Create or join chat rooms with unique URLs
- **Message persistence** - Messages are stored in SQLite and persist across sessions
- **User avatars** - Visual user identification with colored avatars
- **Message timestamps** - See when messages were sent
- **Auto-scroll** - Automatically scroll to new messages
- **Mobile responsive** - Works perfectly on all devices
- **Global edge deployment** - Hosted on Cloudflare Pages for worldwide performance

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Real-time**: PartyKit, PartySocket
- **Backend**: Cloudflare Workers, Durable Objects
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **Styling**: Modern CSS with Inter font

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Cloudflare D1 database**
   ```bash
   # Create a D1 database
   wrangler d1 create chatty-db
   
   # Add the database binding to wrangler.json
   # (Update the wrangler.json with your database ID)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Deploy to Cloudflare Pages**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
├── src/
│   ├── client/           # React frontend
│   │   └── index.tsx     # Main chat component
│   ├── server/           # Cloudflare Workers backend
│   │   └── index.ts      # Durable Object server
│   └── shared.ts         # Shared types
├── public/               # Static assets
│   ├── index.html        # HTML template
│   └── styles.css        # Modern CSS styles
├── wrangler.json         # Cloudflare configuration
└── package.json          # Dependencies and scripts
```

## 🎨 UI Components

### Chat Interface
- **Header**: Shows room ID and current user info
- **Messages**: Scrollable message history with user avatars
- **Input**: Auto-resizing textarea with send button
- **Responsive**: Adapts to mobile and desktop screens

### Features
- **Message bubbles**: Different styles for own vs others' messages
- **Timestamps**: Shows when each message was sent
- **User avatars**: Colored circles with user initials
- **Smooth animations**: Fade-in effects for new messages
- **Auto-scroll**: Automatically scrolls to new messages

## 🔧 Configuration

### Environment Variables
- No environment variables required for basic functionality
- Database is automatically created and managed by Cloudflare D1

### Customization
- **Styling**: Modify `public/styles.css` for custom themes
- **User names**: Update the `names` array in `src/shared.ts`
- **Room behavior**: Modify routing in `src/client/index.tsx`

## 🌐 Deployment

The app is designed to run on Cloudflare Pages with the following benefits:

- **Global CDN**: Content delivered from 200+ locations worldwide
- **Edge computing**: Serverless functions run close to users
- **Durable Objects**: Stateful server instances for real-time features
- **Automatic scaling**: Handles traffic spikes automatically

### Deployment Steps

1. **Build the project**
   ```bash
   npm run check
   ```

2. **Deploy to Cloudflare**
   ```bash
   npm run deploy
   ```

3. **Access your app**
   - Visit the provided Cloudflare Pages URL
   - Create a new room or join an existing one

## 🔌 API Reference

### WebSocket Messages

#### Client to Server
```typescript
{
  type: "add" | "update",
  id: string,
  content: string,
  user: string,
  role: "user" | "assistant"
}
```

#### Server to Client
```typescript
{
  type: "add" | "update" | "all",
  id?: string,
  content?: string,
  user?: string,
  role?: "user" | "assistant",
  messages?: ChatMessage[]
}
```

### Database Schema
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  user TEXT,
  role TEXT,
  content TEXT,
  timestamp INTEGER
);
```

## 🚀 Performance

- **Sub-100ms latency** for message delivery
- **Global edge deployment** for worldwide access
- **Automatic scaling** based on demand
- **Efficient WebSocket connections** with PartyKit

## 🔒 Security

- **Input sanitization** for message content
- **SQL injection protection** with parameterized queries
- **CORS headers** properly configured
- **HTTPS enforcement** on Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [PartyKit](https://partykit.io/) for real-time features
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- Styled with modern CSS and [Inter font](https://rsms.me/inter/)

---

**Ready to chat?** Deploy this app and start messaging in real-time! 🚀
