import React from "react";

const ContentSection: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">AI ShowPrep</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Engage and Inspire Your Audience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Use AI-powered tools to create engaging content, manage your show,
            and keep your audience coming back for more.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  Real-Time Data
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Get the latest data and trends to keep your show relevant and
                engaging.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  AI Integration
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Use AI to generate content, manage your schedule, and more.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
