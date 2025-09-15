import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield, Users } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => navigate("/home"), 1200);
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      setTimeout(() => navigate("/home"), 1200);
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "url('/bg1') center center / 140% 140% no-repeat, #0a001a",
        backgroundSize: '140% 140%',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <motion.div
        className="w-full flex items-center justify-center p-4 md:p-12"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className="w-full max-w-3xl flex flex-col md:flex-row shadow-xl"
          style={{
            background: 'rgba(10, 0, 30, 0.92)',
            borderRadius: '1.5rem',
            boxShadow: '0 0 0 0.5px #a259ff, 0 0 16px 4px #a259ff44',
            border: '0.15px solid #a259ff',
            backdropFilter: 'blur(8px)',
            minHeight: 'auto',
            overflow: 'visible',
          }}
        >
          {/* Left form column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 py-8 md:px-10 md:py-12 rounded-l-[1.5rem]">
            <div className="md:hidden text-center mb-8">
              <Link to="/home" className="inline-block mb-2">
                <img src="/logo3.png" alt="Guide Bazaar Logo" className="h-10 mx-auto" style={{ borderRadius: '10px' }} />
              </Link>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
                Login to your account
              </h2>
              <p className="mt-2 text-lg bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent">
                Or{' '}
                <Link to="/signup" className="font-medium gradient-text hover:opacity-80 transition-opacity">
                  create a new account
                </Link>
              </p>
            </div>
            <form className="space-y-8" onSubmit={handleSignIn}>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <Mail className="w-4 h-4 text-white" />
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <Lock className="w-4 h-4 text-white" />
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember-me" className="ml-2 text-sm bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                    Remember me
                  </Label>
                </div>
                <Link to="#" className="text-sm font-medium gradient-text hover:opacity-80 transition-opacity">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full h-12 btn-primary text-lg font-semibold group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <div className="flex items-center gap-2 mt-6">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
                <span className="px-2 bg-black bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
                  Or login with
                </span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="mt-6 flex justify-center">
                <Button type="button" variant="outline" className="h-12 btn-secondary hover:scale-105 transition-transform min-w-[180px]" onClick={handleGoogleLogin}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
              </div>
            </form>
          </div>
          {/* Right branding/info column */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-gradient-to-br from-[#a259ff22] to-transparent rounded-r-[1.5rem] border-l border-[#a259ff44]">
            <Link to="/home" className="mb-4">
              <img src="/logo3.png" alt="Guide Bazaar Logo" className="h-12" style={{ borderRadius: '10px' }} />
            </Link>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4 text-center whitespace-nowrap">
              <b>Login to your account</b>
            </h2>
            <p className="text-lg bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent text-center max-w-xs">
              Welcome back to the student marketplace.<br />
              Or{' '}
              <Link to="/signup" className="font-medium gradient-text hover:opacity-80 transition-opacity">
                create a new account
              </Link>
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-6 h-6" />
                <span>Exclusive student deals</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Shield className="w-6 h-6" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Users className="w-6 h-6" />
                <span>Community driven</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
