"use client";

import { useState } from "react";
import { adminLogin } from "@/actions/admin-auth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaHotel } from "react-icons/fa";
import Image from "next/image";
import { motion, type Easing } from "framer-motion";

const easeInOut: Easing = [0.76, 0, 0.24, 1];
const easeOut: Easing = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const iconFloat = {
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, -3, 3, 0],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut },
  },
};

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await adminLogin(formData);
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        return;
      }
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="hidden lg:flex lg:w-1/2 relative bg-stellar-blue overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeOut }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stellar-blue/90 via-stellar-blue/70 to-stellar-blue/90 z-10" />
          <Image src="/skyinn.png" alt="Hotel" fill className="object-cover" priority />
        </motion.div>
        <div className="relative z-20 flex flex-col justify-between p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <motion.div
              variants={iconFloat}
              animate="animate"
              className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center"
            >
              <FaHotel className="text-brand text-lg" />
            </motion.div>
            <span className="font-heading text-2xl text-white tracking-wide">Sky Inn</span>
          </motion.div>

          <div>
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="font-heading text-3xl text-white leading-relaxed max-w-md"
            >
              &ldquo;Providing exceptional stays since day one.&rdquo;
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-white/60 text-sm mt-4 tracking-wide uppercase"
            >
              Management Portal
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-white/40 text-xs tracking-widest uppercase"
          >
            &copy; {new Date().getFullYear()} Sky Inn Hotel
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-white"
      >
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:hidden flex items-center justify-center gap-3 mb-10"
          >
            <motion.div
              variants={iconFloat}
              animate="animate"
              className="w-10 h-10 rounded-full bg-stellar-blue flex items-center justify-center"
            >
              <FaHotel className="text-brand text-lg" />
            </motion.div>
            <span className="font-heading text-2xl text-stellar-blue tracking-wide">Sky Inn</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center lg:text-left mb-10"
          >
            <h1 className="font-heading text-3xl text-stellar-blue mb-2">Welcome back</h1>
            <p className="text-stellar-grey text-sm">Sign in to access the management dashboard</p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-2 font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full border border-stellar-light-grey px-4 py-3.5 bg-white text-stellar-blue placeholder:text-stellar-grey/50 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all text-sm rounded-full"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full border border-stellar-light-grey px-4 py-3.5 bg-white text-stellar-blue placeholder:text-stellar-grey/50 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all text-sm rounded-full pr-11"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stellar-grey hover:text-stellar-blue transition-colors"
                >
                  <motion.div
                    key={showPassword ? "slash" : "eye"}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-stellar-blue text-white py-3.5 font-medium text-sm uppercase tracking-[0.07em] hover:bg-brand transition-colors disabled:opacity-50 rounded-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
