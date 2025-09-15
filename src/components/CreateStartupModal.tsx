import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Plus, Trash2, Check, ChevronLeft, ChevronRight, Info, Users, Briefcase, CheckCircle } from 'lucide-react';

const CreateStartupModal = ({ isOpen, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    stage: '',
    description: '',
    vision: '',
    foundedYear: new Date().getFullYear(),
    location: '',
    website: '',
    logo: null,
    teamMembers: [{ name: '', role: '', bio: '', avatar: null, linkedin: '' }],
    opportunities: [''],
    currentProjects: [{ name: '', description: '' }]
  });

  const domains = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'education', label: 'Education' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'sustainability', label: 'Sustainability' }
  ];

  const stages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP' },
    { value: 'funded', label: 'Funded' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      name: '',
      domain: '',
      stage: '',
      description: '',
      vision: '',
      foundedYear: new Date().getFullYear(),
      location: '',
      website: '',
      logo: null,
      teamMembers: [{ name: '', role: '', bio: '', avatar: null, linkedin: '' }],
      opportunities: [''],
      currentProjects: [{ name: '', description: '' }]
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: 'Basic Info', icon: Info },
    { number: 2, title: 'Team', icon: Users },
    { number: 3, title: 'Opportunities', icon: Briefcase },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`flex items-center space-x-2 ${
            currentStep >= step.number ? 'text-primary' : 'text-text-muted'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step.number ? 'bg-primary text-white' : 'bg-secondary-200'
            }`}>
              {currentStep > step.number ? (
                <Check size={16} />
              ) : (
                React.createElement(step.icon, { size: 16 })
              )}
            </div>
            <span className="text-sm font-medium hidden sm:block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${
              currentStep > step.number ? 'bg-primary' : 'bg-secondary-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300" aria-modal="true" tabIndex={-1} ref={modalRef}>
      <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-purple-600 bg-black scale-100 opacity-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100 bg-black">
          <h2 className="font-heading font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create Startup Profile
          </h2>
          <Button variant="ghost" onClick={onClose} className="p-2 text-purple-400 hover:bg-purple-900/30">
            <X size={20} />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[75vh] scrollbar-thin bg-black">
          {/* Stepper/progress bar */}
          <div className="flex items-center mb-8">
            {[1,2,3,4].map(step => (
              <div key={step} className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${currentStep >= step ? 'bg-purple-500' : 'bg-white/20'}`}></div>
            ))}
          </div>
          <StepIndicator />
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Startup Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter startup name"
                      required
                      className="rounded-full px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Domain *
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => handleInputChange('domain', e.target.value)}
                      className="w-full rounded-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-lg"
                      required
                    >
                      <option value="">Select domain</option>
                      {domains.map(domain => (
                        <option key={domain.value} value={domain.value} className="bg-black text-white font-semibold">
                          {domain.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Stage *
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => handleInputChange('stage', e.target.value)}
                      className="w-full rounded-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-lg"
                      required
                    >
                      <option value="">Select stage</option>
                      {stages.map(stage => (
                        <option key={stage.value} value={stage.value} className="bg-black text-white font-semibold">
                          {stage.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Founded Year *
                    </label>
                    <Input
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value))}
                      min="2000"
                      max={new Date().getFullYear()}
                      required
                      className="rounded-full px-4 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location *
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    required
                    className="rounded-full px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="rounded-full px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your startup..."
                    rows={3}
                    className="w-full rounded-3xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Vision Statement *
                  </label>
                  <textarea
                    value={formData.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    placeholder="Describe your startup's vision and mission..."
                    rows={4}
                    className="w-full rounded-3xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Logo
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('logo', e.target.files[0])}
                    className="rounded-full px-4 py-2"
                  />
                </div>
              </div>
            )}
            {/* Step 2: Team */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                    Team Members
                  </h3>
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="bg-surface-hover p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-text-primary">
                          Member {index + 1}
                        </h4>
                        {formData.teamMembers.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeArrayItem('teamMembers', index)}
                            className="text-error p-1"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          type="text"
                          placeholder="Full name"
                          value={member.name}
                          onChange={(e) => handleArrayChange('teamMembers', index, 'name', e.target.value)}
                          required
                          className="rounded-full px-4 py-2"
                        />
                        <Input
                          type="text"
                          placeholder="Role/Position"
                          value={member.role}
                          onChange={(e) => handleArrayChange('teamMembers', index, 'role', e.target.value)}
                          required
                          className="rounded-full px-4 py-2"
                        />
                      </div>
                      <textarea
                        placeholder="Brief bio..."
                        value={member.bio}
                        onChange={(e) => handleArrayChange('teamMembers', index, 'bio', e.target.value)}
                        rows={2}
                        className="w-full rounded-3xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
                      />
                      <Input
                        type="url"
                        placeholder="LinkedIn Profile URL"
                        value={member.linkedin}
                        onChange={(e) => handleArrayChange('teamMembers', index, 'linkedin', e.target.value)}
                        className="rounded-full px-4 py-2"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('teamMembers', { name: '', role: '', bio: '', avatar: null, linkedin: '' })}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Team Member
                  </Button>
                </div>
                <div>
                  <h3 className="font-heading font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                    Current Projects
                  </h3>
                  {formData.currentProjects.map((project, index) => (
                    <div key={index} className="bg-surface-hover p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-text-primary">
                          Project {index + 1}
                        </h4>
                        {formData.currentProjects.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeArrayItem('currentProjects', index)}
                            className="text-error p-1"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                      <Input
                        type="text"
                        placeholder="Project name"
                        value={project.name}
                        onChange={(e) => handleArrayChange('currentProjects', index, 'name', e.target.value)}
                        className="mb-4 rounded-full px-4 py-2"
                        required
                      />
                      <textarea
                        placeholder="Project description..."
                        value={project.description}
                        onChange={(e) => handleArrayChange('currentProjects', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full rounded-3xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        required
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('currentProjects', { name: '', description: '' })}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Project
                  </Button>
                </div>
              </div>
            )}
            {/* Step 3: Opportunities */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                    Open Opportunities
                  </h3>
                  <p className="text-text-muted mb-4">
                    List the roles and opportunities available at your startup
                  </p>
                  {formData.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-3">
                      <Input
                        type="text"
                        placeholder="e.g., Frontend Developer, Marketing Intern"
                        value={opportunity}
                        onChange={(e) => {
                          const newOpportunities = [...formData.opportunities];
                          newOpportunities[index] = e.target.value;
                          handleInputChange('opportunities', newOpportunities);
                        }}
                        className="flex-1 rounded-full px-4 py-2"
                      />
                      {formData.opportunities.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const newOpportunities = formData.opportunities.filter((_, i) => i !== index);
                            handleInputChange('opportunities', newOpportunities);
                          }}
                          className="text-error p-2"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleInputChange('opportunities', [...formData.opportunities, ''])}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Opportunity
                  </Button>
                </div>
              </div>
            )}
            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="font-heading font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                  Review Your Startup Profile
                </h3>
                <div className="bg-surface-hover p-4 rounded-lg">
                  <h4 className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-muted">Name:</span>
                      <span className="ml-2 text-text-primary">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Domain:</span>
                      <span className="ml-2 text-text-primary">{formData.domain}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Stage:</span>
                      <span className="ml-2 text-text-primary">{formData.stage}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Founded:</span>
                      <span className="ml-2 text-text-primary">{formData.foundedYear}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-hover p-4 rounded-lg">
                  <h4 className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Team</h4>
                  <p className="text-sm text-text-secondary">
                    {formData.teamMembers.length} team member(s) added
                  </p>
                </div>
                <div className="bg-surface-hover p-4 rounded-lg">
                  <h4 className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Opportunities</h4>
                  <p className="text-sm text-text-secondary">
                    {formData.opportunities.filter(o => o.trim()).length} opportunity(ies) listed
                  </p>
                </div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-purple-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <Check size={16} /> Create Startup
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStartupModal; 