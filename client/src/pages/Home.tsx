import { useState, useEffect, FormEvent } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Message {
  name: string;
  message: string;
}


function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && message) {
      socket.emit('sendMessage', { name, message });
      setName('');
      setMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;