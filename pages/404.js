import React from "react";

// Components
import Bubbles from "../components/Bubbles/Bubbles.jsx";
import Button from "../components/Button/Button";
import Section from "../components/Layout/Section/Section";
import Container from "../components/Layout/Container/Container";
import GridContainer from "../components/Layout/Container/GridContainer.jsx";
import Footer from "../components/Layout/Footer/Footer";
import { Hexagon, WhiteBlur } from "../components/Layout/Section/Flair";

function Custom404({ matic }) {
  return (
    <>
      <Bubbles />
      <main className="flex flex-col justify-between overflow-hidden lg:min-h-[calc(100vh-116px)]">
        <Section>
          <Container>
            <GridContainer>
              <div className="col-span-12 flex flex-col justify-center relative min-h-[500px]">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[.05em] leading-normal text-center">
                  <span className="text-[#FFB444] flex justify-center leading-normal">
                    Geez, who dropped the honey?
                  </span>
                </h1>
                <p className="mt-6 lg:mt-12 text-white text-base lg:text-lg text-center">
                  Sorry, we couldn&apos;t find the page you were looking for.
                </p>
                <p className="flex space-x-4 mt-6 lg:mt-12 justify-center">
                  <Button href="/">Go back to home</Button>
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 relative">
              </div>
            </GridContainer>
          </Container>
          <div className="absolute -left-[150px] bottom-[70%] z-0">
            <Hexagon />
          </div>
          <div className="absolute -left-[500px] top-32 z-0">
            <WhiteBlur />
          </div>
        </Section>
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export default Custom404;