import Breadcrumb from "@/components/Breadcrumb";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing and using the Rev Sione Kami Memorial Church (RSKMC) website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.",
  },
  {
    title: "2. Use of the Website",
    body: "This website is provided for informational and ministry purposes. You may access content on this site for personal, non-commercial use only. You must not reproduce, duplicate, copy, sell, or exploit any portion of this website without express written permission from RSKMC.",
  },
  {
    title: "3. Intellectual Property",
    body: "All content on this website — including text, images, graphics, audio, and video — is the property of Rev Sione Kami Memorial Church or its content suppliers and is protected by applicable copyright and intellectual property laws. The RSKMC name, logo, and related marks are the property of the church.",
  },
  {
    title: "4. Contact Submissions",
    body: "When you submit a message through our contact form, you consent to RSKMC using that information to respond to your enquiry. We will not use your contact information for unsolicited commercial communications. Please see our Privacy Policy for more information on how we handle your data.",
  },
  {
    title: "5. External Links",
    body: "This website may contain links to third-party websites. These links are provided for convenience only. RSKMC has no control over the content of those sites and accepts no responsibility for them or for any loss or damage arising from your use of them.",
  },
  {
    title: "6. Disclaimer of Warranties",
    body: "This website is provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. RSKMC does not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.",
  },
  {
    title: "7. Limitation of Liability",
    body: "To the fullest extent permitted by law, RSKMC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.",
  },
  {
    title: "8. Changes to These Terms",
    body: "RSKMC reserves the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms of Service are governed by the laws of Papua New Guinea. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Papua New Guinea.",
  },
  {
    title: "10. Contact Us",
    body: "If you have any questions about these Terms of Service, please contact us at info@rskmc.org.pg or call 325 5448. Our office is located at Gabaka Street, Port Moresby, NCD 675, Papua New Guinea.",
  },
];

export const metadata = {
  title: "Terms of Service | RSKMC",
  description: "Terms of Service for the Rev Sione Kami Memorial Church website.",
};

export default function TermsOfService() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=75" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Terms of Service" }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Terms of Service</h1>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl">
            Please read these terms carefully before using the RSKMC website.
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
          <h2 className="text-2xl font-bold mb-3">Questions About Our Terms?</h2>
          <p className="text-blue-200 mb-6">Contact the church office and we will be happy to help.</p>
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
