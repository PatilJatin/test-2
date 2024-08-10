// src/app/showprep/page.tsx
"use client";

import ImpossibleTrivia from "@/components/ImpossibleTrivia";
import TodayInHistory from "@/components/TodayInHistory";
import Birthdays from "@/components/Birthdays";
import PhoneTopics from "@/components/PhoneTopics";
import PublicHolidays from "@/components/PublicHolidays";

import NewMusic from "@/components/NewMusic";
import WouldYouRather from "@/components/WouldYouRather";
import GuessTheMovieQuote from "@/components/GuessTheMovieQuote";
import OurStudySays from "@/components/OurStudySays";
import WeeklyBoxOfficeCharts from "@/components/WeeklyBoxOfficeCharts";

import Entertainment from "@/components/Entertainment";
import WeirdNews from "@/components/WeirdNews";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import TopSongs from "@/components/Top40Songs";
import Billboard from "@/components/BillboardHot100";
import AIFlashback from "@/components/AIFlashbackCompo";
import TodaysHeadlines from "@/components/TodaysHeadlines";
import DownloadPDF from "@/components/GeneratePDF";

const ShowPrepPage = () => {
  return (
    <ProtectedRoute>
      <div className="bg-white text-black scroll-smooth">
        {/* <Banner /> */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center flex flex-col items-center gap-5">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/airprep-1ba82.appspot.com/o/showpreplogo-white.svg?alt=media&token=fb2eff8f-a550-43ed-b7bf-293f921244cf"
                }
                alt="logo"
                width={200}
                height={100}
                className="block text-center mb-5"
              />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {
                  new Date(
                    new Date().toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  ).toLocaleDateString("en-US", { weekday: "long" }) // Gets the day name
                }
                {" | "}
                {
                  new Date(
                    new Date().toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  )
                    .toISOString()
                    .split("T")[0] // Gets the date in YYYY-MM-DD format
                }
              </h1>
              <div className="mt-6 text-lg leading-8 text-gray-600 hover:underline">
                <Link href={"/"}>AISHOWPREP.COM</Link>
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* <a
                  href="#headline"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a> */}
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <TodaysHeadlines />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-black">
          {/* Additional Content Sections */}
          <TopSongs />
          <Billboard />
          <ImpossibleTrivia />
          <TodayInHistory />
          <Birthdays />
          <PhoneTopics />
          <PublicHolidays />
          <NewMusic />
          <WeirdNews />
          <WouldYouRather />
          <GuessTheMovieQuote />
          <OurStudySays />
          <WeeklyBoxOfficeCharts />
          <AIFlashback />
          <Entertainment />
          <DownloadPDF />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ShowPrepPage;
