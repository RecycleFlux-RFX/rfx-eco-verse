import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ConfigureSettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/super-admin/settings');
        setSettings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (id: string, field: string, value: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting._id === id ? { ...setting, [field]: value } : setting
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Assuming the backend expects individual PATCH requests for each setting
      for (const setting of settings) {
        await axios.patch(`/api/super-admin/settings`, { 
          key: setting.key, 
          value: setting.value, 
          description: setting.description 
        });
      }
      navigate('/super-admin'); // Redirect to super admin dashboard after action
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="container-responsive">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Configure Platform Settings</CardTitle>
            <CardDescription>Adjust global platform parameters.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                {settings.map((setting: any) => (
                  <Card key={setting._id} className="glass-card-secondary p-4">
                    <div className="grid gap-2">
                      <Label htmlFor={setting.key}>{setting.key}</Label>
                      <Input
                        id={setting.key}
                        name={setting.key}
                        value={setting.value}
                        onChange={(e) => handleChange(setting._id, 'value', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor={`${setting.key}-description`}>Description</Label>
                      <Textarea
                        id={`${setting.key}-description`}
                        name={`${setting.key}-description`}
                        value={setting.description}
                        onChange={(e) => handleChange(setting._id, 'description', e.target.value)}
                      />
                    </div>
                  </Card>
                ))}
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving Settings...' : 'Save Settings'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigureSettingsPage;
