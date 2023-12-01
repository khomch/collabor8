'use client';

import './page.css';
import InterfaceImage from '../../public/interface.png';
import SqaureShape from '../../public/shapes/square.svg';
import CubeShape from '../../public/shapes/cube.svg';
import Image from 'next/image';
import Button from '@/components/button/button';
import Link from 'next/link';
import VStack from '@/components/ui/v-stack/v-stack';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="cta">
        <Image
          className="cta__shape-square"
          src={SqaureShape}
          alt="Interface image"
          width={100}
        />
        <div className="cta__text">
          <h1 className="h1">Collaborate, Create, Elevate</h1>
          <p className="textbody1">
            Connect with developers, build projects, and enhance your skills
            together.
          </p>
          <Link className={'cta__button'} href={'/register'}>
            <Button variant="primary" label="Register" />
          </Link>
        </div>
        <Image
          className="cta__shape-cube"
          src={CubeShape}
          alt="Interface image"
          width={100}
        />
        <Image
          className="cta__image"
          src={InterfaceImage}
          alt="Interface image"
          width={620}
        />
      </div>
      <div className="values">
        <h2 className="h3">Some cool text</h2>
      </div>
      <div className="about">
        <VStack size="12col">
          <div className="about__info">...add some info...</div>
        </VStack>
      </div>
    </div>
  );
}
