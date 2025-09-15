import React from 'react';

const StartupDetailsModal = ({ isOpen, onClose, startup }) => {
    if (!isOpen || !startup) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white text-black rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeInUp">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-purple-700 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="flex items-center gap-4 mb-4">
                    <img src={startup.founder.avatar} alt={startup.founder.name} className="w-14 h-14 rounded-full border-2 border-purple-400" />
                    <div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-1">{startup.name}</h2>
                        <div className="text-sm text-gray-600">{startup.founder.name} &bull; {startup.founder.role}</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold border border-purple-400 bg-purple-100/40 text-purple-800">{startup.domain}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold border border-blue-400 bg-blue-100/40 text-blue-800">{startup.stage}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold border border-gray-400 bg-gray-100/40 text-gray-800">Founded: {startup.foundedYear}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold border border-green-400 bg-green-100/40 text-green-800">Team: {startup.teamSize}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold border border-pink-400 bg-pink-100/40 text-pink-800">{startup.location}</span>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-1">About</h3>
                    <p className="text-base text-gray-800">{startup.description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-1">Open Roles</h3>
                    {startup.openRoles && startup.openRoles.length > 0 ? (
                        <ul className="list-disc list-inside text-base text-gray-800">
                            {startup.openRoles.map(role => <li key={role}>{role}</li>)}
                        </ul>
                    ) : (
                        <div className="text-gray-500 italic">No open roles</div>
                    )}
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        className="rounded-full px-5 py-2 border font-semibold border-purple-500 bg-white text-purple-700 hover:bg-purple-700 hover:text-white transition shadow"
                        onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScKe9jhLQYgArPbL7SUNELi1hxXXl6aQgDXpive-J80cjESsQ/viewform', '_blank')}
                    >
                        Apply Now
                    </button>
                    <button
                        className="rounded-full px-5 py-2 border font-semibold border-purple-500 bg-purple-600 text-white hover:bg-purple-700 transition shadow"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartupDetailsModal;
