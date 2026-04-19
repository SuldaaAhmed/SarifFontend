import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const collaborators = [
  {
    name: "Eng. Sharif",
    role: "Frontend Developer",
    description:
      "Collaborates on building responsive and scalable web applications using React and Next.js.",
    avatar: "/Images/shariif.jpeg",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Eng. Bashir",
    role: "UX/UI Designer",
    description:
      "Works with me on creating intuitive user experiences and modern interface designs.",
    avatar: "/Images/Bashir.jpeg",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Eng. Kahiye",
    role: "Backend Developer",
    description:
      "I handle backend architecture and API development using ASP.NET Core and Laravel.",
    avatar: "/Images/justone.jpeg",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Eng. Amina",
    role: "Mobile App Developer",
    description:
      "Collaborates on cross-platform mobile applications built with Flutter.",
    avatar: "/Images/picture.png",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
];

export default function CollaborationSection() {
  return (
    <section className="bg-gray-50 py-4">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block mb-3 rounded-full
            bg-white px-4 py-1 text-xs font-semibold
            text-[#00bf63] uppercase"
          >
            Collaboration Team
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044]">
            People I Collaborate With
          </h2>

          <p className="mt-4 text-gray-700">
            While this is my personal platform, I collaborate with talented
            professionals across different fields to deliver complete and
            high-quality digital solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collaborators.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl bg-white p-6 shadow-md
              border border-[#00bf63]/20
              hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="relative h-24 w-24 mx-auto overflow-hidden rounded-full
                border-4 border-[#00bf63]"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-6 text-center">
                <h4 className="font-semibold text-[#090044] text-lg">
                  {member.name}
                </h4>

                <span className="text-sm font-medium text-[#00bf63]">
                  {member.role}
                </span>

                <p className="mt-3 text-sm text-gray-600">
                  {member.description}
                </p>

                {/* Social Icons */}
                <div className="mt-4 flex justify-center gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#00bf63]/10 text-[#00bf63]
                    hover:bg-[#00bf63] hover:text-white transition"
                  >
                    <Linkedin size={18} />
                  </a>

                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#00bf63]/10 text-[#00bf63]
                    hover:bg-[#00bf63] hover:text-white transition"
                  >
                    <Facebook size={18} />
                  </a>

                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#00bf63]/10 text-[#00bf63]
                    hover:bg-[#00bf63] hover:text-white transition"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#090044]">
            Want to Join Our Team?
          </h3>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            If you are passionate about building modern digital products and
            want to collaborate on impactful projects, we welcome you to connect with us.
          </p>

          <Link
            href="/Member"
            className="mt-8 inline-flex items-center justify-center
            px-8 py-3 rounded-full
            bg-[#00bf63] text-white font-semibold
            shadow-md hover:bg-[#00a653]
            hover:shadow-lg transition-all duration-300"
          >
            Join Our Team
          </Link>
        </div>

      </div>
    </section>
  );
}