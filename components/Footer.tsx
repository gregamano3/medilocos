'use client';

import { Phone, Mail, MapPin, Clock, Shield, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold">MediLocos</h3>
                <p className="text-sm text-gray-400">Your Trusted Pharmacy</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Licensed pharmacy serving the community for over 20 years with quality medications and expert care.
            </p>
            <div className="flex space-x-2">
              <div className="flex items-center text-xs text-gray-400">
                <Shield className="w-4 h-4 mr-1" />
                FDA Licensed
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Award className="w-4 h-4 mr-1" />
                Certified
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                info@medilocos.com
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                123 Health St, Medical District
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Prescription Refills</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transfer Prescription</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Screenings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vaccination Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insurance Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Medication Therapy Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compounding Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Immunizations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medicare Part D</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 MediLocos Pharmacy. All rights reserved. Licensed Pharmacy #PH123456
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">HIPAA Notice</a>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Powered by{' '}
              <a 
                href="https://ilocosscript.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ilocosscript I.T. Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}