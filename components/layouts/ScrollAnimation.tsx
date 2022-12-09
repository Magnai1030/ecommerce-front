import { motion } from "framer-motion";
import { ReactNode } from "react";
type Props = {
  children?: ReactNode;
  className?: string;
};
const ScrollAnimationWrapper = ({ children, className, ...props }: Props) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export default ScrollAnimationWrapper;
