import Breadcrumb from "@/components/Breadcrumb";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you voluntarily provide when you use our contact form, including your name, email address, subject, and message. We do not collect personal information automatically unless you submit it through our forms.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Information submitted through our contact form is used solely to respond to your enquiry and to serve your pastoral or administrative needs. We do not use your information for marketing purposes, and we do not send unsolicited communications.",
  },
  {
    title: "3. Information Sharing",
    body: "RSKMC does not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers (such as our cloud hosting provider, AWS) who assist us in operating our website, subject to those parties agreeing to keep this information confidential.",
  },
  {
    title: "4. Data Storage and Security",
    body: "Contact form submissions are stored securely using AWS Amplify, which provides industry-standard encryption and data protection. We take reasonable precautions to protect your personal information. However, no data transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Data Retention",
    body: "We retain contact form submissions for as long as necessary to fulfil the purpose for which they were collected, or as required by applicable law. You may request deletion of your data at any time by contacting us at the details below.",
  },
  {
    title: "6. Cookies",
    body: "Our website may use cookies to improve your browsing experience. Cookies are small data files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you disable cookies, some features of the website may not function properly.",
  },
  {
    title: "7. Third-Party Services",
    body: "Our website is hosted on AWS Amplify. By using our website, you acknowledge that your data may be processed by AWS in accordance with their Privacy Policy. We may also embed content from third-party platforms (e.g., YouTube) that may set their own cookies.",
  },
  {
    title: "8. Children's Privacy",
    body: "Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.",
  },
  {
    title: "9. Your Rights",
    body: "You have the right to access, correct, or request deletion of any personal information we hold about you. To exercise these rights, please contact us using the details below. We will respond to your request within a reasonable timeframe.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically.",
  },
  {
    title: "11. Contact Us",
    body: "If you have any questions about this Privacy Policy or how we handle your information, please contact us at info@rskmc.org.pg or call 325 5448. Our office is located at Gabaka Street, Port Moresby, NCD 675, Papua New Guinea.",
  },
];

export const metadata = {
  title: "Privacy Policy | RSKMC",
  description: "Privacy Policy for the Rev Sione Kami Memorial Church website.",
};

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=75" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Privacy Policy</h1>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl">
            How Rev Sione Kami Memorial Church collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-10 border-b border-gray-200 pb-6">
            Last updated: {new Date().toLocaleDateString("en-PG", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <div className="max-w-3xl space-y-8">
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-navy-700 mb-2">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-navy-700 text-white py-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-3">Questions About Your Privacy?</h2>
          <p className="text-blue-200 mb-6">We are committed to protecting your information. Reach out to us anytime.</p>
          <a
            href="/give"
            className="inline-block bg-gold-500 text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-gold-400 active:scale-95 transition-all duration-200"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
