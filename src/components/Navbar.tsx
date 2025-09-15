import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import "./ui/NavbarPremium.css";
import { Menu, X, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  // Simulate user signup state (replace with real auth logic in production)
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { user } = useAuth();
  const [showStepSlider, setShowStepSlider] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [
    'Basic Info',
    'Contact & Social',
    'Education & Skills',
    'Profile & Preferences',
    'Uploads',
  ];

  const prevUser = useRef(user);
  useEffect(() => {
    if (!prevUser.current && user) {
      setShowStepSlider(true);
    }
    prevUser.current = user;
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide navbar completely on profile page
  if (location.pathname === "/profile") {
    return null;
  }

  // Always show all navItems and resourcesDropdownItems regardless of user auth state
  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Finance", href: "/finance" },
    { name: "Events", href: "/events" },
    { name: "Network", href: "/network" },
    { name: "Project Hunt", href: "/project-hunt" },
    { name: "Startups", href: "/startups" },
  ];
  const resourcesDropdownItems = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Courses", href: "/courses" },
    { name: "Student Discounts", href: "/student-discounts" },
  ];

  const isResourcesActive = location.pathname === "/scholarships" || location.pathname === "/courses" || location.pathname === "/paid-courses" || location.pathname === "/free-courses" || location.pathname === "/student-discounts" || location.pathname === "/marketplace";

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
      )}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto min-h-[56px]">
          {/* Extended Oval Background - Now spans the entire navbar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10 w-full">
            <div
              className="premium-navbar-oval px-3 py-2 flex items-center w-full justify-between"
              style={{
                width: '100%',
                maxWidth: '100vw',
                height: '56px',
                minWidth: '0',
                boxSizing: 'border-box',
              }}
            >
              {/* Logo Section - always left */}
              <div className="flex items-center z-20 flex-shrink-0">
                <Link to="/home" className="flex items-center">
                  <img
                    src="/logo3.png"
                    alt="Studlyf Logo"
                    style={{
                      height: '32px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: '10px',
                    }}
                  />
                </Link>
              </div>
              {/* Navigation Items Section - Centered */}
              <div className="flex-1 flex items-center justify-center min-w-0">
                <div className="hidden lg:flex items-center space-x-1">
                  {navItems.map((item) => (
                    item.name === "Startups" ? (
                      <div
                        key={item.name}
                        onMouseEnter={() => setIsStartupsDropdownOpen(true)}
                        onMouseLeave={() => setIsStartupsDropdownOpen(false)}
                        className="relative"
                      >
                        <DropdownMenu open={isStartupsDropdownOpen} onOpenChange={setIsStartupsDropdownOpen}>
                          <DropdownMenuTrigger asChild>
                            <button
                              className={cn(
                                "premium-navbar-btn relative px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center",
                                location.pathname === item.href && "active"
                              )}
                              tabIndex={0}
                            >
                              {item.name}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl" align="center">
                            <DropdownMenuItem asChild>
                              <Link to="/startups" className={cn("text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl", location.pathname === "/startups" && "text-brand-purple")}>Startups</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/studverse" className={cn("text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl", location.pathname === "/studverse" && "text-brand-purple")}>Studverse</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <div key={item.name}>
                        <Link
                          to={item.href}
                          className={cn(
                            "premium-navbar-btn relative px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center",
                            location.pathname === item.href && "active"
                          )}
                          onClick={user ? () => setShowStepSlider(true) : undefined}
                        >
                          {item.name}
                        </Link>
                      </div>
                    )
                  ))}
                </div>
                {/* Resources Dropdown - Centered with navigation */}
                <div
                  onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
                  onMouseLeave={() => isDesktop && setIsResourcesDropdownOpen(false)}
                  className="hidden lg:block"
                >
                  <DropdownMenu open={isDesktop ? isResourcesDropdownOpen : undefined} onOpenChange={setIsResourcesDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "premium-navbar-btn relative px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center",
                          isResourcesActive && "active"
                        )}
                        tabIndex={0}
                      >
                        Resources
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
                      align="center"
                    >
                      {resourcesDropdownItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
                              location.pathname === item.href && "text-brand-purple"
                            )}
                            onClick={user ? () => setShowStepSlider(true) : undefined}
                          >
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* User Actions Section - always right */}
              <div className="flex items-center z-20 gap-2 flex-shrink-0">
                {/* Only show Sign Up button if not logged in */}
                {!user && (
                  <div className="flex items-center gap-2">
                    <Link to="/signup">
                      <InteractiveHoverButton
                        text="Sign Up"
                        className="w-32 text-base"
                      />
                    </Link>
                  </div>
                )}
                {user && isDesktop && (
                  <div className="flex items-center gap-2">
                    <Link to="/profile" aria-label="Profile Dashboard">
                      <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-white/20 bg-black cursor-pointer">
                        <AvatarFallback>
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                )}
                {/* Menu icon for mobile - right side */}
                {!isDesktop && user && (
                  <button
                    className="lg:hidden flex items-center justify-center p-2 rounded-full text-white focus:outline-none z-30 ml-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open menu"
                    style={{}}
                  >
                    <Menu className="w-7 h-7" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Replace mobile menu with a right-side drawer */}
      {isMobileMenuOpen && !isDesktop && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-[99] transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <div
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-black/95 shadow-2xl z-[100] flex flex-col transition-transform duration-300"
            style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              {/* Profile Icon (remains in mobile menu) */}
              <Link to={user ? "/profile" : "/login"} aria-label="Profile Dashboard">
                <Avatar className="h-10 w-10 border border-white/20 bg-black cursor-pointer">
                  <AvatarFallback>
                    <User className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <button
                className="p-2 rounded-full text-white hover:bg-white/10 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-4 px-4">
              {navItems.map((item) => (
                item.name === "Startups" ? (
                  <div key={item.name} className="flex flex-col">
                    <span className={cn(
                      "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-base touch-target cursor-pointer",
                      location.pathname === "/startups" || location.pathname === "/studverse"
                        ? "text-white font-bold bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}>
                      {item.name}
                    </span>
                    <div className="ml-4 flex flex-col gap-1">
                      <Link
                        to="/startups"
                        className={cn(
                          "block px-4 py-2 rounded-lg font-medium transition-all duration-300 text-base touch-target",
                          location.pathname === "/startups"
                            ? "text-white font-bold bg-white/10"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                        style={{ minHeight: 40 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Startups
                      </Link>
                      <Link
                        to="/studverse"
                        className={cn(
                          "block px-4 py-2 rounded-lg font-medium transition-all duration-300 text-base touch-target",
                          location.pathname === "/studverse"
                            ? "text-white font-bold bg-white/10"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                        style={{ minHeight: 40 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Studverse
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-base touch-target",
                      location.pathname === item.href
                        ? "text-white font-bold bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    style={{ minHeight: 48 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 px-4">
              <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
                Resources
              </div>
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                {resourcesDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-base touch-target",
                      location.pathname === item.href
                        ? "text-white font-bold bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    style={{ minHeight: 44 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Login/Signup for mobile if not logged in */}
            {!user && (
              <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-2 rounded-xl bg-brand-purple text-white font-semibold">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
