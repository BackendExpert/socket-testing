import { useEffect, useState } from 'react';
import './App.css'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_APP_API, {
    transports: ["websocket"]
});

function App() {
    const [room, setRoom] = useState("")
    const [sendmessage, setsendmessage] = useState("")
    const [gotmessage, setgotmessage] = useState("")

    const joinRoom = () => {
        if(room !== ""){
            socket.emit("join_room", room)
        }
    }

    const sendMessage = () => {
        socket.emit("send_message", { sendmessage, room })
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setgotmessage(data.sendmessage)
        });
    }, [socket])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg space-y-4">

                <input
                    type="text"
                    placeholder="Enter Room id"
                    onChange={(e) => {
                        setRoom(e.target.value)
                    }}
                    className="w-full border border-lime-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                />

                <button
                    type="submit"
                    onClick={joinRoom}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 rounded-lg transition active:scale-95"
                >
                    Join Room
                </button>

                <input
                    type="text"
                    placeholder="Enter Message..."
                    onChange={(e) => {
                        setsendmessage(e.target.value)
                    }}
                    className="w-full border border-lime-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                />

                <button
                    type="submit"
                    onClick={sendMessage}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 rounded-lg transition active:scale-95"
                >
                    Send Message
                </button>

                <h1 className="">Message: </h1>
                <p className="">{gotmessage}</p>

            </div>
        </div>
    )
}

export default App
