'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  Link,
} from '@mui/material';
import { useAuthStore } from '@/stores/authStore';
import { authAPI } from '@/api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const user = await authAPI.register({ 
        username, 
        password, 
        email: email || undefined 
      });
      
      const loginResponse = await authAPI.login({ username, password });
      login(loginResponse.user, loginResponse.access_token);
      
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Username may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#eff2fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              padding: 4,
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#2196F3',
                mb: 1,
              }}
            >
              🤖 MCP Agent
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#666666',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Create your account to get started
            </Typography>

            <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bdbdbd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#2196F3',
                  },
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                name="email"
                label="Email (optional)"
                type="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bdbdbd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#2196F3',
                  },
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bdbdbd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#2196F3',
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bdbdbd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#2196F3',
                  },
                }}
              />

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    border: '1px solid #ffcdd2',
                    '& .MuiAlert-icon': {
                      color: '#c62828',
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#2196F3',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#1976D2',
                    boxShadow: 'none',
                  },
                  '&:disabled': {
                    backgroundColor: '#bdbdbd',
                  },
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleLogin}
                    sx={{
                      color: '#2196F3',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
} 