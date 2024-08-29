import React, { useState } from "react";
import './About.css'; 
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import ruby from '../assets/Ruby.jpg';
import anshul from '../assets/anshul.jpg';
import nij from '../assets/nij.jpg';


const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    {
      name: "Ruby Prajapati",
      position: "UI/UX Designer",
      image: ruby, 
      description: "Ruby is a creative UI/UX designer with a passion for user-centered design.",
      linkedin: "https://www.linkedin.com/in/ruby",
      github: "https://github.com/ruby",
      instagram: "https://www.instagram.com/ruby",
    },
    {
      name: "Anshul Purohit",
      position: "Frontend Developer",
      image: anshul, 
      description: "Anshul is a skilled frontend developer with a focus on responsive design.",
      linkedin: "https://www.linkedin.com/in/anshul",
      github: "https://github.com/anshul",
      instagram: "https://www.instagram.com/anshul",
    },
    {
      name: "Nij Padariya",
      position: "Backend Developer",
      image: nij, 
      description: "Nij specializes in backend development and database management.",
      linkedin: "https://www.linkedin.com/in/nij",
      github: "https://github.com/nij",
      instagram: "https://www.instagram.com/nij",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="relative flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={` mt-10 relative w-full w-80 md:w-80 lg:w-96 h-96 perspective transition-transform duration-3000 ease-in-out ${
              hoveredCard === index ? "z-20 scale-105" : "z-10"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className={`absolute w-full h-full flip-card transform-style-preserve-3d ${
                hoveredCard === index ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full bg-gray-100 backface-hidden flex flex-col items-center justify-center p-4 rounded-lg shadow-lg border border-gray-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-cover rounded-full mb-4 border border-gray-300"
                />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{member.position}</p>
                <div className="flex space-x-4 mt-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FaGithub size={20} />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-700 text-white backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-cover rounded-full mb-4 border border-gray-800"
                />
                <h3 className="text-lg sm:text-xl font-bold">{member.name}</h3>
                <p className="text-sm sm:text-base text-center">{member.description}</p>
                <div className="flex space-x-4 mt-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FaGithub size={20} />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
