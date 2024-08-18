'use client';

import { useEffect, useState, useRef } from "react";
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, Sandpack } from '@codesandbox/sandpack-react';

export default function Sandbox( { user } ) {
    // messages = user and AI responses to be displayed in bubble chats
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm the Web Optimizer Assistant. How can I help you today?",
        },
    ]);

    // message = text field value
    const [message, setMessage] = useState('');

    // to disable send button while loading
    const [isLoading, setIsLoading] = useState(false);

    // to scroll down for every new message
    const messagesEndRef = useRef(null);

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return; // Empty message check

        setMessage(''); // Clear text field
        setIsLoading(true);
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message }, // Add the user's message to the chat
        ]);

        // Function to send prompt to model
        try {
            const completeInput = referencedCode ? message + ": " + referencedCode : message
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ body: completeInput }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessages((messages) => [
                    ...messages,
                    { role: 'assistant', content: data.output },
                ]);
            } else {
                setMessages((messages) => [
                    ...messages,
                    { role: 'assistant', content: data.error || "Error occurred" },
                ]);
            }
        } catch (error) {
            console.log("Post request error: %s", error);
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: "I'm sorry, but I encountered an error. Please wait a few minutes and try again." },
            ]);
        }

        // Response was received
        setIsLoading(false);
        // Turn off referenced code
        setReferencedCode('')
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    // Scroll to bottom of each new message
    useEffect(() => {
        scrollToBottom();
        //console.log(messages[messages.length - 1].content)
    }, [messages]);

    // Sandpack initial config (app.js code and app.css code for the sandpack)
    const [code, setCode] = useState(`
    import React from 'react'
    function App() { 
        return ( 
            <div> 
                <h1>Start creating!</h1> 
                <p>Generate a React App</p>
                <p>Disclaimer: external dependencies are not supported yet</p>
            </div> ) 
    } 
    export default App;`);

    const [style, setStyle] = useState()
    const [referencedCode, setReferencedCode] = useState("")

    // Function to update the sandbox code dynamically
    const handleChangeCode = (newCode) => {
        setCode(newCode.appResponse)
        setStyle(newCode.styleResponse)
        setReferencedCode(newCode.codeResponse)
    };

    // Functions to format code responses from model
    const responseFormat = (text) => {
        // isolate code and styling from explanation
        const codeResponse = text.slice(0, text.indexOf("Response"))
        const appResponse = codeResponse.slice(codeResponse.indexOf("import"), codeResponse.indexOf("export default App;") + 19) // end of app code inclusive     
        const styleResponse = text.includes("```css") ? codeResponse.slice(codeResponse.indexOf("```css") + 6, codeResponse.lastIndexOf("}") + 1) : ""// end of css code inclusive
        const explanation = text.includes("Response:") ? text.slice(text.indexOf("Response:") + 10, text.length) : text

        return { appResponse, styleResponse, explanation, codeResponse }
    }

    return (
        <Box
            width="90vw"
            height="90vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stack id="chat-and-display" direction={'row'} maxWidth={'80vw'} spacing={3}>
                <Stack
                    id="chatbox"
                    direction={'column'}
                    width="50vw"
                    height="70vh"
                    border="1px solid #ccc"
                    p={2}
                    spacing={3}
                    borderRadius={8}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Web Optimizer Support
                    </Typography>
                    <Stack
                        direction={'column'}
                        spacing={2}
                        flexGrow={1}
                        overflow="auto"
                        maxHeight="100%"
                        borderRadius={8}
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent={
                                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                                }
                                mb={1}
                            >
                                <Box
                                    bgcolor={
                                        message.role === 'assistant'
                                            ? '#e0f2f7' // Light blue for assistant
                                            : '#f0f0f0' // Light grey for user
                                    }
                                    color="black"
                                    borderRadius={16}
                                    p={2}
                                    maxWidth="70%"
                                >
                                    <p>{message.role === 'assistant' ? responseFormat(message.content).explanation : message.content}</p>
                                </Box>
                                <Button sx={{ display: message.role === 'assistant' && message.content.includes('import') ? 'inline-block' : 'none' }} onClick={() => handleChangeCode(responseFormat(messages[index].content))}>
                                    Use code
                                </Button>
                            </Box>
                        ))}
                        <div id="end-of-msg" ref={messagesEndRef} />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label="Message"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            onClick={sendMessage}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating...' : 'Send'}
                        </Button>
                    </Stack>
                </Stack>
                {
                    hydrated && (
                        <SandpackProvider
                            template="react"
                            files={{
                                '/App.js': {
                                    code: code,
                                    active: true,
                                },
                                'App.css': {
                                    code: style,
                                    active: true
                                }
                            }}
                        >
                            <SandpackLayout>
                                <SandpackCodeEditor />
                            </SandpackLayout>
                            <br></br>
                            <SandpackLayout >
                                <SandpackPreview />
                            </SandpackLayout>
                        </SandpackProvider>
                    )
                }

            </Stack>
        </Box>
    );
}
