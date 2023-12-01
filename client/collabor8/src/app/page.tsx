// landing-page.js

'use client';

import Button from '@/components/button/button';
import Image from 'next/image';
import Link from 'next/link';
import InterfaceImage from '../../public/interface.png';
import LandingImage1 from '../../public/landing1.png';
import LandingImage2 from '../../public/landing2.png';
import LandingImage3 from '../../public/landing3.png';
import LandingImage4 from '../../public/landing4.png';
import CubeShape from '../../public/shapes/cube.svg';
import TubeShape from '../../public/shapes/tube.svg';
import SqaureShape from '../../public/shapes/square.svg';
import CurveShape from '../../public/shapes/curve.svg';
import './page.css';

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
        <Image
          className="cta__shape-curve"
          src={CurveShape}
          alt="Interface image"
          width={40}
        />
        <div className="cta__text">
          <h1 className="h1">Collaborate, Create, Elevate</h1>
          <p className="textbody1">
            Connect with developers, build projects, and enhance your skills
            together.
          </p>
          <Link className={'cta__button'} href={'/register'}>
            <Button variant="primary" label="Get started" />
          </Link>
        </div>
        <Image
          className="cta__shape-cube"
          src={CubeShape}
          alt="Interface image"
          width={40}
        />
        <Image
          className="cta__shape-tube"
          src={TubeShape}
          alt="Interface image"
          width={20}
        />
        <Image
          className="cta__image"
          src={InterfaceImage}
          alt="Interface image"
          width={620}
        />
      </div>
      <div className="about">
        {/* <VStack size="12col"> */}
        <div className="about__info">
          <h2 className="h2">Our Service</h2>
          <div className="about__wrapper" style={{ marginTop: 50 }}>
            <div className="about__text">
              <div className="about__text-title h4">
                Connect with developers, build projects!
              </div>
              <div className="about__text-desc sub2 ">
                Collabor8 streamlines developer connections for diverse
                projects. Manage share project cards, matching skills and
                interests effortlessly for seamless team collaboration.
              </div>
            </div>
            <Image
              className="about__image"
              src={LandingImage1}
              alt="Landing1"
            />
          </div>

          <div className="about__wrapper">
            <Image
              className="about__image2"
              src={LandingImage3}
              alt="Landing3"
            />

            <div className="about__text" style={{ marginLeft: 100 }}>
              <div className="about__text-title h4">
                Verified users only for reviews
              </div>
              <div className="about__text-desc sub2">
                Utilize the review feature to easily find highly skilled
                individuals. Our platform introduces high-quality collaboration
                partners through various reviews.
              </div>
            </div>
          </div>

          <div className="about__wrapper">
            <div className="about__text">
              <div className="about__text-title h4">
                Enhance your skills together
              </div>
              <div className="about__text-desc sub2 ">
                Grow your skills with Collabor8. Connect, collaborate, and
                elevate your coding as a team. Whether you're a pro or beginner,
                join us to take your skills higher!
              </div>
            </div>
            <Image
              className="about__image"
              src={LandingImage2}
              alt="Landing2"
            />
          </div>
        </div>

        {/* </VStack> */}
      </div>

      <div className="join">
        <div className="join__wrapper">
          <div className="about__text-title h3 bodytext1_semibold">
            Start collaborating Today!
          </div>

          <div className="join__bottom">
            <div className="join__left-item">
              <p className="bodytext1" style={{ lineHeight: 2 }}>
                Connect with developers, build projects, and enhance your skills
                together. Connect with developers, build projects,
              </p>

              <span className="sub2">
                Sign up for free by clicking the button below.
              </span>
              <a href={'/register'} className={'cta__button'}>
                <Button variant="primary" label="Register" />
              </a>
            </div>

            <div className="join__btn">
              <Image
                src={LandingImage4}
                className="about__image2"
                alt="landing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
