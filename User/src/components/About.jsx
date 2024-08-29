import React, { useState } from "react";
import './About.css'; 
import ruby from '../assets/Ruby.jpg';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    {
      name: "Ruby Prajapati",
      position: "UI/UX Designer",
      image: ruby, // Replace with your image path
      description: "John is a skilled frontend developer with 5 years of experience.",
    },
    {
      name: "Anshul Purohit",
      position: "Frontend Developer",
      image: "path_to_image_2", // Replace with your image path
      description: "Jane specializes in backend development and database management.",
    },
    {
      name: "Nij Padariya",
      position: "Backend Developer",
      image: "path_to_image_3", // Replace with your image path
      description: "Emily is a creative UI/UX designer with a passion for user-centered design.",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="relative flex space-x-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`relative w-96 h-96 perspective transition-transform duration-3000 ease-in-out ${
              hoveredCard === index ? "z-20" : "z-10"
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
              <div className="absolute w-full h-full bg-gray-200 backface-hidden flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-44 h-44 object-cover rounded-full mb-4 border-4 border-blue-400"
                />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-800 text-white backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-44 h-44 object-cover rounded-full mb-4 border-4 border-blue-400"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
