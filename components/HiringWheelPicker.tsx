"use client"
import React, { useState, useEffect } from 'react';
import { Icon, Icon as Wheel } from 'lucide-react';
import { Button } from '@/components/ui/button';

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#F1948A'];
const options = [
    "Best Teammate",
    "Most Compatible",
    "Hardest-worker",
    "Great Personality",
    "Most Creative",
    "Top Communicator",
    "Technically Savvy",
    "Destiny's Pick"
];

const HiringWheelPicker = () => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const spinWheel = () => {
        setIsSpinning(true);
        const newRotation = rotation + 1440 + Math.random() * 360; // Spin at least 4 full rotations
        setRotation(newRotation);
        setTimeout(() => {
            setIsSpinning(false);
            //setSelectedOption("Tara Rowell");
        }, 5000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
                    {options.map((option, index) => (
                        <g key={index} transform={`rotate(${index * 45} 50 50)`}>
                            <path
                                d="M50 50 L50 0 A50 50 0 0 1 85.36 14.64 Z"
                                fill={colors[index]}
                            />
                            <text
                                x="75"
                                y="10"
                                fontSize="4"
                                fill="white"
                                textAnchor="middle"
                                transform="rotate(22.5 50 50)"
                            >
                                {option}
                            </text>
                        </g>
                    ))}
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Wheel className="w-8 h-8 text-gray-800" iconNode={[]} />
                </div>
            </div>
            <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
            </Button>
            {selectedOption && (
                <div className="mt-4 text-xl font-bold">
                    Selected Candidate: {selectedOption}
                </div>
            )}
        </div>
    );
};

export default HiringWheelPicker;