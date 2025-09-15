
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Shield, Bell, Link, Key, Mail } from 'lucide-react';

const SettingsSection = () => {
  const settingsCategories = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Edit Profile Information', action: 'edit' },
        { label: 'Change Profile Picture', action: 'upload' },
        { label: 'Update Academic Details', action: 'edit' },
      ]
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      items: [
        { label: 'Change Password', action: 'edit' },
        { label: 'Enable Two-Factor Authentication', action: 'toggle', enabled: false },
        { label: 'Privacy Settings', action: 'edit' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', action: 'toggle', enabled: true },
        { label: 'SMS Notifications', action: 'toggle', enabled: false },
        { label: 'Push Notifications', action: 'toggle', enabled: true },
        { label: 'Weekly Digest', action: 'toggle', enabled: true },
      ]
    },
    {
      title: 'Connected Accounts',
      icon: Link,
      items: [
        { label: 'LinkedIn', action: 'connect', connected: true },
        { label: 'GitHub', action: 'connect', connected: false },
        { label: 'Google Account', action: 'connect', connected: true },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Settings & Preferences
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <IconComponent className="w-5 h-5" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <span className="text-white font-medium">{item.label}</span>
                      
                      {item.action === 'toggle' && (
                        <Switch 
                          checked={item.enabled} 
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-brand-purple data-[state=checked]:to-brand-pink"
                        />
                      )}
                      
                      {item.action === 'edit' && (
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          Edit
                        </Button>
                      )}
                      
                      {item.action === 'upload' && (
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          Upload
                        </Button>
                      )}
                      
                      {item.action === 'connect' && (
                        <Button 
                          variant={item.connected ? "outline" : "default"}
                          size="sm" 
                          className={item.connected 
                            ? "border-green-500 text-green-400 hover:bg-green-500/10" 
                            : "bg-gradient-to-r from-brand-purple to-brand-pink"
                          }
                        >
                          {item.connected ? 'Connected' : 'Connect'}
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Key className="w-5 h-5" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Export Data
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsSection;
