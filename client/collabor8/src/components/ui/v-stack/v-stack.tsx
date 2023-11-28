import { ReactNode } from 'react';
import './v-stack.css';

type VStackProps = {
  children: ReactNode;
  size: '3col' | '6col' | '9col';
};

function VStack({ children, size }: VStackProps) {
  return (
    <section className={`vstack vstack_${size} vstack__bottom`}>{children}</section>
  );
}
export default VStack;
