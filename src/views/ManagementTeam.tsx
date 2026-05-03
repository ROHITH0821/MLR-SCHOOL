'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './ManagementTeam.css';

const MANAGEMENT_TEAM = [
  {
    name: "Sri. Ch. Malla Reddy Garu",
    title: "Founder – Chairman MRGI Hon’ble MLA – Medchal Constituency",
    image: "https://cmrschoolkompally.com/wp-content/uploads/2024/02/6685d7_fa63bc82748947ee8d8daa940a0b34bfmv2.webp",
    message: "It’s a moment of great pleasure and privilege to welcome all the parents and students of CMR School. I ensure that the school will be a place of joyful learning for all the young minds. The student’s inquisitiveness for learning is nurtured here and nourished with the modern day teaching technologies. Our school aligns the discipline of its student’s life with utmost care and concern. It caters to the learning of perfect humanity with respect, integrity and compassion."
  },
  {
    name: "Sri. Ch. Mahender Reddy",
    title: "Secretary MRGI",
    image: "https://cmrschoolkompally.com/wp-content/uploads/2024/02/mahendhar_reddy1.webp",
    message: "CMR GROUP provides a warm, caring, stimulating and challenging environment in which our students learn and develop. We aim to provide an education which explores and strengthens the potential which is innate in every individual but awaiting expression. In order to do so, we seek to provide an environment which enriches the intellectual, spiritual, emotional and physical development of the pupil in an atmosphere that is happy and nurturing."
  },
  {
    name: "Dr. Ch. Bhadra Reddy",
    title: "Joint Secretary MRGI",
    image: "https://cmrschoolkompally.com/wp-content/uploads/2024/02/badra_reddy.webp",
    message: "Our institution is a living place that shapes children’s lives and builds their character. I believe that, to assess the school’s performance only by its high academic scores is not sufficient, it is equally important for a school to be a place for happy children with a love for learning and sound value system. To achieve these objectives the heads of different branches work jointly with the parents and students to create a climate for open exchange."
  },
  {
    name: "P. Snithija Reddy",
    title: "Director CMR School – Kompally",
    image: "https://cmrschoolkompally.com/wp-content/uploads/2024/02/Director.webp",
    message: "Education is not mere accumulation of facts; it is preparation of life itself. Education is knowledge imbued with wisdom and ethics. It develops the personality of the students, moulds their character and develops mental skills to help them cope with problems and challenges of the complex world of today. One of the most significant aim is to make them successful not only in life, but also conscious of their duties and responsibilities."
  },
  {
    name: "Dr. Anuradha",
    title: "Dean, MRGI",
    image: "https://cmrschoolkompally.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-12-at-10.13.45-PM-1024x682.jpeg",
    message: "As the Dean of MRGI, it gives me immense pleasure to extend a warm welcome to all of you to CMR School. At CMR, we believe in nurturing young minds and fostering a holistic learning environment that empowers students to excel academically, socially, and personally. Our commitment to providing quality education is unwavering, and we strive to create an atmosphere where students feel supported and inspired."
  }
];

const ManagementTeam = () => {
  return (
    <div className="management-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Management <span className="text-primary">Team</span>
          </motion.h1>
          <p>The visionaries behind our excellence in education and holistic development.</p>
        </div>
      </section>

      <section className="management-content section">
        <div className="container">
          <div className="management-grid">
            {MANAGEMENT_TEAM.map((member, index) => (
              <motion.div 
                key={index}
                className="management-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="member-image-wrapper">
                  <OptimizedImage 
                    src={member.image} 
                    alt={member.name} 
                    className="member-image"
                    aspectRatio={index === 0 ? "4/5" : "1/1"}
                  />
                  <div className="quote-badge">
                    <Quote size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-title">{member.title}</p>
                  <div className="divider"></div>
                  <p className="member-message">{member.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementTeam;
