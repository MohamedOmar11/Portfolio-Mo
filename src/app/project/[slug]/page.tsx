import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CustomCursor } from '@/components/CustomCursor';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  await dbConnect();
  const project = await Project.findOne({ slug: params.slug, isVisible: true }).lean();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      <CustomCursor />
      <div className="px-8 pt-28 pb-20">
        <div className="container mx-auto">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{project.category}</div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95]">{project.title}</h1>
            </div>
            <Link
              href="/#work"
              className="hidden md:inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-white/40 transition"
            >
              Back to Work
            </Link>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
            <div className="aspect-[16/9] w-full bg-zinc-900">
              <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              <section className="md:col-span-1">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Problem</div>
                <p className="text-gray-200 leading-relaxed">{project.problem}</p>
              </section>
              <section className="md:col-span-1">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Solution</div>
                <p className="text-gray-200 leading-relaxed">{project.solution}</p>
              </section>
              <section className="md:col-span-1">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Result</div>
                <p className="text-gray-200 leading-relaxed">{project.result}</p>
              </section>
            </div>
          </div>

          {Array.isArray(project.images) && project.images.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((src: string, i: number) => (
                <div key={`${src}-${i}`} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                  <div className="aspect-[4/3]">
                    <img src={src} alt={`${project.title} image ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-20 rounded-3xl border border-white/10 bg-zinc-950 p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Next Step</div>
                <div className="text-3xl md:text-4xl font-extrabold tracking-tighter">Want results like this?</div>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-black hover:bg-gray-200 transition"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
