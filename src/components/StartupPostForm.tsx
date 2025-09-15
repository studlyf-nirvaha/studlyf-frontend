import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
// If you have a custom AppImage component, import it here. Otherwise, use <img>.

const STAGES = ['Idea', 'MVP', 'Funded', 'Other'];

const StartupPostForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    logo: null,
    domain: '',
    stage: '',
    location: '',
    foundedYear: '',
    teamSize: '',
    vision: '',
    currentProjects: [{ name: '', description: '' }],
    team: [{ name: '', role: '', avatar: null, bio: '' }],
    opportunities: [{ title: '', type: '', description: '', skills: [''] }],
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, logo: file }));
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleListChange = (list, idx, field, value) => {
    const updated = [...form[list]];
    updated[idx][field] = value;
    setForm(prev => ({ ...prev, [list]: updated }));
  };
  const addListItem = (list, item) => setForm(prev => ({ ...prev, [list]: [...prev[list], item] }));
  const removeListItem = (list, idx) => setForm(prev => ({ ...prev, [list]: prev[list].filter((_, i) => i !== idx) }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg max-w-3xl mx-auto space-y-6 shadow-lg">
      <h2 className="font-heading text-2xl font-bold mb-4">Post a New Startup</h2>
      <div>
        <label className="block mb-1 font-medium">Startup Name</label>
        <Input
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Logo</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          required
        />
        {logoPreview && (
          <div className="mt-2">
            <img src={logoPreview} alt="Logo Preview" className="w-20 h-20 object-cover rounded-lg" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Domain/Industry</label>
          <Input
            value={form.domain}
            onChange={e => handleChange('domain', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stage</label>
          <select
            value={form.stage}
            onChange={e => handleChange('stage', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md"
            required
          >
            <option value="">Select stage</option>
            {STAGES.map(stage => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <Input
            value={form.location}
            onChange={e => handleChange('location', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Founded Year</label>
          <Input
            type="number"
            value={form.foundedYear}
            onChange={e => handleChange('foundedYear', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Team Size</label>
          <Input
            type="number"
            value={form.teamSize}
            onChange={e => handleChange('teamSize', e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Vision / Description</label>
        <textarea
          value={form.vision}
          onChange={e => handleChange('vision', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Current Projects</label>
        {form.currentProjects.map((proj, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input
              placeholder="Project Name"
              value={proj.name}
              onChange={e => handleListChange('currentProjects', idx, 'name', e.target.value)}
              required
            />
            <Input
              placeholder="Description"
              value={proj.description}
              onChange={e => handleListChange('currentProjects', idx, 'description', e.target.value)}
              required
            />
            <Button type="button" variant="ghost" onClick={() => removeListItem('currentProjects', idx)}>Remove</Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => addListItem('currentProjects', { name: '', description: '' })}>Add Project</Button>
      </div>
      <div>
        <label className="block mb-1 font-medium">Team Members</label>
        {form.team.map((member, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <Input
              placeholder="Name"
              value={member.name}
              onChange={e => handleListChange('team', idx, 'name', e.target.value)}
              required
            />
            <Input
              placeholder="Role"
              value={member.role}
              onChange={e => handleListChange('team', idx, 'role', e.target.value)}
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={e => handleListChange('team', idx, 'avatar', e.target.files[0])}
            />
            <Input
              placeholder="Bio"
              value={member.bio}
              onChange={e => handleListChange('team', idx, 'bio', e.target.value)}
              required
            />
            <Button type="button" variant="ghost" onClick={() => removeListItem('team', idx)}>Remove</Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => addListItem('team', { name: '', role: '', avatar: null, bio: '' })}>Add Member</Button>
      </div>
      <div>
        <label className="block mb-1 font-medium">Opportunities</label>
        {form.opportunities.map((opp, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <Input
              placeholder="Title"
              value={opp.title}
              onChange={e => handleListChange('opportunities', idx, 'title', e.target.value)}
              required
            />
            <Input
              placeholder="Type"
              value={opp.type}
              onChange={e => handleListChange('opportunities', idx, 'type', e.target.value)}
              required
            />
            <Input
              placeholder="Description"
              value={opp.description}
              onChange={e => handleListChange('opportunities', idx, 'description', e.target.value)}
              required
            />
            <Input
              placeholder="Skills (comma separated)"
              value={opp.skills.join(', ')}
              onChange={e => handleListChange('opportunities', idx, 'skills', e.target.value.split(',').map(s => s.trim()))}
              required
            />
            <Button type="button" variant="ghost" onClick={() => removeListItem('opportunities', idx)}>Remove</Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => addListItem('opportunities', { title: '', type: '', description: '', skills: [''] })}>Add Opportunity</Button>
      </div>
      <div className="flex gap-4 mt-6">
        <Button type="submit" variant="default">Post Startup</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
};

export default StartupPostForm; 