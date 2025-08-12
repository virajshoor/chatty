import {
  type Connection,
  Server,
  type WSMessage,
  routePartykitRequest,
} from "partyserver";

import type { ChatMessage, Message } from "../shared";

export class Chat extends Server<Env> {
  static options = { hibernate: true };

  messages = [] as ChatMessage[];

  broadcastMessage(message: Message, exclude?: string[]) {
    this.broadcast(JSON.stringify(message), exclude);
  }

  onStart() {
    // Create the messages table if it doesn't exist
    this.ctx.storage.sql.exec(
      `CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY, 
        user TEXT, 
        role TEXT, 
        content TEXT,
        timestamp INTEGER
      )`,
    );

    // Load the messages from the database
    this.messages = this.ctx.storage.sql
      .exec(`SELECT * FROM messages ORDER BY timestamp ASC`)
      .toArray() as ChatMessage[];
  }

  onConnect(connection: Connection) {
    connection.send(
      JSON.stringify({
        type: "all",
        messages: this.messages,
      } satisfies Message),
    );
  }

  saveMessage(message: ChatMessage) {
    const timestamp = message.timestamp || Date.now();
    
    // Check if the message already exists
    const existingMessage = this.messages.find((m) => m.id === message.id);
    if (existingMessage) {
      this.messages = this.messages.map((m) => {
        if (m.id === message.id) {
          return { ...message, timestamp };
        }
        return m;
      });
    } else {
      this.messages.push({ ...message, timestamp });
    }

    // Save to database with timestamp
    this.ctx.storage.sql.exec(
      `INSERT INTO messages (id, user, role, content, timestamp) 
       VALUES ('${message.id}', '${message.user}', '${message.role}', ${JSON.stringify(message.content)}, ${timestamp}) 
       ON CONFLICT (id) DO UPDATE SET 
         content = ${JSON.stringify(message.content)},
         timestamp = ${timestamp}`,
    );
  }

  onMessage(connection: Connection, message: WSMessage) {
    // Broadcast the raw message to everyone else
    this.broadcast(message);

    // Update our local messages store
    const parsed = JSON.parse(message as string) as Message;
    if (parsed.type === "add" || parsed.type === "update") {
      this.saveMessage(parsed);
    }
  }
}

export default {
  async fetch(request, env) {
    return (
      (await routePartykitRequest(request, { ...env })) ||
      env.ASSETS.fetch(request)
    );
  },
} satisfies ExportedHandler<Env>;
