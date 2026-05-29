"use client";

import { Quote, Star, Heart } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sister Grace Naime",
    role: "Church Member — 8 years",
    quote:
      "RSKMC has been my spiritual home for eight years. The teaching is rooted in the Word of God and the community genuinely cares for one another. I came broken, and this church helped me find wholeness in Christ.",
    highlight: true,
  },
  {
    id: 2,
    name: "Brother Joseph Katu",
    role: "Youth Leader",
    quote:
      "Joining the youth ministry here transformed my walk with God. The leadership invested in me personally, and I saw my faith grow in ways I never expected. This church is truly a family.",
    highlight: false,
  },
  {
    id: 3,
    name: "Evelyn & Peter Rosi",
    role: "Married Couple",
    quote:
      "We were married here and have watched our family grow in faith together. The pastoral care we received during a difficult season was a true reflection of Christ's love. We are forever grateful.",
    highlight: false,
  },
  {
    id: 4,
    name: "Deaconess Mary Tora",
    role: "Women's Ministry Leader",
    quote:
      "The legacy of Rev Sione Kami is alive in this congregation. His heart for the community, the poor, and the lost continues to shape everything we do. It is a privilege to serve here.",
    highlight: false,
  },
  {
    id: 5,
    name: "Pastor David Lewa",
    role: "Worship Ministry",
    quote:
      "I have been in many churches but the depth of worship at RSKMC is different. There is a genuine hunger for God's presence here, and it pushes me closer to Him every single week.",
    highlight: false,
  },
  {
    id: 6,
    name: "Sister Rachel Ume",
    role: "New Member — 1 year",
    quote:
      "I was a new believer when I walked through these doors. The patience, love, and discipleship I received helped me build a strong foundation in faith. I am so glad I found RSKMC.",
    highlight: false,
  },
  {
    id: 7,
    name: "Brother Samuel Vatu",
    role: "Board Elder",
    quote:
      "The vision of this church has never wavered. From the very beginning, it has been about honouring God and serving people. That consistency is rare, and I believe it is the fruit of God's hand upon us.",
    highlight: false,
  },
  {
    id: 8,
    name: "Mama Ruth Kapi",
    role: "Senior Member — 12 years",
    quote:
      "This church prayed with me through sickness, through loss, and through breakthrough. They have walked every chapter of my life with me. That kind of love does not come from people alone — it comes from God.",
    highlight: false,
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Testimonials() {
  const featured = testimonials.find((t) => t.highlight);
  const rest = testimonials.filter((t) => !t.highlight);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1920&q=75" alt="" fill className="object-cover opacity-20" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Testimonials" }]} />
          <div className="w-14 h-14 bg-gold-500 text-navy-800 rounded-full flex items-center justify-center mb-5">
            <Heart size={26} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Testimonials</h1>
          <p className="text-blue-200 text-base md:text-xl max-w-2xl">
            Lives transformed by God&rsquo;s grace. Hear what our church family has to say.
          </p>
        </div>
      </section>

      {/* Featured testimonial */}
      {featured && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-10 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-gold-500" />
              Featured Story
            </p>
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 relative max-w-3xl transition-all duration-300">
              <Quote size={48} className="text-gold-500/30 absolute top-6 left-8" />
              <StarRating />
              <p className="text-gray-700 text-xl leading-relaxed italic mb-8 relative z-10">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {initials(featured.name)}
                </div>
                <div>
                  <p className="font-bold text-navy-700">{featured.name}</p>
                  <p className="text-gray-500 text-sm">{featured.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            From Our Family
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-12">More Stories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((t) => (
              <div
                key={t.id}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gold-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <Quote size={28} className="text-gold-400/50 mb-3 shrink-0" />
                <StarRating />
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-navy-600 transition-colors duration-300">
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-700 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="bg-gold-500 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote>
            <p className="text-navy-800 text-xl font-bold italic mb-3">
              &ldquo;I will tell of all your wonderful deeds. I will be glad and exult in you; I will sing praise to your name, O Most High.&rdquo;
            </p>
            <cite className="text-navy-700 font-semibold not-italic">— Psalm 9:1–2</cite>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-400" />
            Share Your Story
          </p>
          <h2 className="text-3xl font-bold mb-4">Has God moved in your life at RSKMC?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl">
            We would love to hear your story. Share how God has worked in your life through our church community.
          </p>
          <Link
            href="/give"
            className="inline-block bg-gold-500 text-navy-800 font-bold px-8 py-3 rounded-lg hover:bg-gold-400 active:scale-95 transition-all duration-200"
          >
            Connect With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
