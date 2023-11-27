import { ReactNode } from 'react';
import './v-stack.css';

type VStackProps = {
  children: ReactNode;
  size: "3col" | "9col";
};

function VStack({ children, size }: VStackProps) {
  return (
    <div className={`vstack vstack_${size} vstack__bottom`}>{children}</div>
  );
}
export default VStack;
