import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'receptionist') {
        navigate('/receptionist');
      } else {
        navigate('/customer');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@hotel.com', password: 'admin123' },
    { role: 'Receptionist', email: 'reception@hotel.com', password: 'reception123' },
    { role: 'Customer', email: 'customer@hotel.com', password: 'customer123' }
  ];

  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Hotel className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Luxury Stay</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Demo Accounts</CardTitle>
            <CardDescription>Click to auto-fill credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.role}
                variant="outline"
                className="w-full justify-start"
                onClick={() => quickLogin(account.email, account.password)}
              >
                <div className="text-left">
                  <div className="font-semibold">{account.role}</div>
                  <div className="text-xs text-gray-500">{account.email}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
