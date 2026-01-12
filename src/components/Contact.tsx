import React, { useState } from "react";
import { ContactBackground } from "./ui/ContactBackground.tsx";
import Layout from "./Layout.jsx";


const contacts = [
    { id: 1, name: 'LinkedIn', icone: 'https://api.iconify.design/uiw:linkedin.svg', url: 'https://www.linkedin.com/in/mohamed-lamine-kon%C3%A9-b51999193/', color: 'bg-blue-500 text-white' },
    { id: 2, name: 'Github', icone: 'https://api.iconify.design/mdi:github.svg', url: 'https://github.com/malladev', color: 'bg-gray-900 ring-slate-100 ring-1 text-white' }
];

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission not implemented yet
        console.log('Form data:', formData);
    };

    return (
        <section id="contact" className="relative" aria-label="Contact">
            <div className="absolute h-full -z-10 w-full flex justify-center items-start -top-8">
                <img
                    src="./triangle-down.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-20 gray-icon"
                />
            </div>

            <Layout>
                <div className="my-20 mx-auto max-w-5xl lg:p-0 sm:px-5">
                    <ContactBackground className="rounded-[22px] p-4 sm:p-10 bg-white">
                        <p className="text-2xl sm:text-3xl mt-4 mb-2 font-bold text-gray-700">
                            Contacts
                        </p>
                        <p className="text-base text-gray-500">
                            Let&apos;s discuss something cool together
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mt-3 mb-8">
                            {contacts.map((contact) => (
                                <a 
                                    key={contact.id} 
                                    href={contact.url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${contact.color} py-2 px-6 w-fit rounded text-sm flex items-center justify-center gap-1 hover:shadow-md hover:-translate-y-1 duration-300 transition-all`}
                                >
                                    <img src={contact.icone} alt={`Icône ${contact.name}`} className="white-icon w-4 h-4" />
                                    {contact.name}
                                </a>
                            ))}
                            <a 
                                href="mailto:konelamine1122@gmail.com" 
                                className="py-2 px-6 w-fit rounded text-sm flex items-center justify-center gap-1 bg-slate-100 hover:shadow-md hover:-translate-y-1 duration-300 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.33em" height="1em" viewBox="0 0 256 193"><path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"></path><path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"></path><path fill="#EA4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"></path><path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"></path><path fill="#C5221F" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"></path></svg>
                                Gmail
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                                Send me a message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ContactBackground>
                </div>
            </Layout>
        </section>
    );
}
