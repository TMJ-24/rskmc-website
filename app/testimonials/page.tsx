import { Quote, Star } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const testimonials = [
  { id: "1", name: "Sister Grace Naime",  role: "Church Member — 8 years", quote: "RSKMC has been my spiritual home for eight years. The teaching is rooted in the Word of God and the community genuinely cares for one another. I came broken, and this church helped me find wholeness in Christ.", highlight: true  },
  { id: "2", name: "Brother Joseph Katu", role: "Youth Leader",             quote: "Joining the youth ministry here transformed my walk with God. The leadership invested in me personally, and I saw my faith grow in ways I never expected. This church is truly a family.",                                highlight: false },
  { id: "3", name: "Evelyn & Peter Rosi", role: "Married Couple",           quote: "We were married here and have watched our family grow in faith together. The pastoral care we received during a difficult season was a true reflection of Christ's love. We are forever grateful.",                         highlight: false },
  { id: "4", name: "Deaconess Mary Tora", role: "Women's Ministry Leader",  quote: "The legacy of Rev Sione Kami is alive in this congregation. His heart for the community, the poor, and the lost continues to shape everything we do. It is a privilege to serve here.",                                  highlight: false },
  { id: "5", name: "Pastor David Lewa",   role: "Worship Ministry",         quote: "I have been in many churches but the depth of worship at RSKMC is different. There is a genuine hunger for God's presence here, and it pushes me closer to Him every single week.",                                       highlight: false },
  { id: "6", name: "Sister Rachel Ume",   role: "New Member — 1 year",      quote: "I was a new believer when I walked through these doors. The patience, love, and discipleship I received helped me build a strong foundation in faith. I am so glad I found RSKMC.",                                        highlight: false },
  { id: "7", name: "Brother Samuel Vatu", role: "Board Elder",              quote: "The vision of this church has never wavered. From the very beginning, it has been about honouring God and serving people. That consistency is rare, and I believe it is the fruit of God's hand upon us.",                 highlight: false },
  { id: "8", name: "Mama Ruth Kapi",      role: "Senior Member — 12 years", quote: "This church prayed with me through sickness, through loss, and through breakthrough. They have walked every chapter of my life with me. That kind of love does not come from people alone — it comes from God.",         highlight: false },
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
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function Testimonials() {
  const featured = testimonials.find((t) => t.highlight);
  const rest = testimonials.filter((t) => !t.highlight);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1920&q=75" alt="" fill className="object-cover opacity-15" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Testimonials" }]} />
          <p className="eyebrow text-gold-400 mb-4">Stories of Grace</p>
          <h1 className="h-section text-white mb-4">Testimonials</h1>
          <p className="body-lg text-blue-200 max-w-2xl">
            Lives transformed by God&rsquo;s grace. Hear what our church family has to say.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow text-gold-600 mb-4">Featured Story</p>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[var(--shadow-card)] relative max-w-3xl">
              <Quote size={48} className="text-gold-500/25 absolute top-6 left-8" />
              <StarRating />
              <p className="body-lg text-gray-700 italic mb-8 relative z-10">
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
      {rest.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow text-gold-600 mb-4">From Our Family</p>
            <h2 className="h-section text-navy-700 mb-12">More Stories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((t) => (
                <article key={t.id} className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col">
                  <Quote size={28} className="text-gold-400/40 mb-3 shrink-0" />
                  <StarRating />
                  <p className="body text-gray-600 italic flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                      {initials(t.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-700 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scripture */}
      <section className="bg-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[280px] font-serif leading-none text-white/[0.03]">&ldquo;</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="block font-serif text-gold-400 text-5xl leading-none mb-6">&ldquo;</span>
          <blockquote>
            <p className="font-serif text-white text-2xl md:text-3xl font-normal italic leading-relaxed tracking-wide mb-8">
              I will tell of all your wonderful deeds. I will be glad and exult in you; I will sing praise to your name, O Most High.
            </p>
            <cite className="eyebrow text-gold-400 not-italic mx-auto">— Psalm 9:1–2</cite>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-400 mb-4">Your Story Matters</p>
          <h2 className="h-section text-white mb-4">Share Your Testimony</h2>
          <p className="body-lg text-blue-200 mb-8 max-w-xl">
            Has God done something amazing in your life through RSKMC? We&apos;d love to hear it.
          </p>
          <Link href="/give" className="inline-flex items-center gap-2 bg-gold-500 text-navy-800 font-bold px-8 py-3.5 rounded-xl hover:bg-gold-400 transition-colors text-sm">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
