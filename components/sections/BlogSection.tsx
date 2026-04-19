"use client";

import { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, Heart, MessageCircle, User, Loader2, 
  ChevronLeft, ChevronRight, ArrowRight, Filter, Search // Added Search icon
} from "lucide-react";
import { BlogService } from "@/lib/blog"; 
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  categoryName: string;
  content: string;
  authorName: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export default function TechJournal() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Added search state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLiking, setIsLiking] = useState(false);

  const pageSize = 6;
  // Added "Case Study" to categories
  const categories = ["All", "Technology", "Business IT", "Case Study"];

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await BlogService.getBlogs(currentPage, pageSize);
      
      if (response.data?.success) {
        setBlogs(response.data.data.items || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load journal entries");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); 
  };

  const handleToggleLike = async (blogId: string) => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      const res = await BlogService.toggleLike(blogId);
      if (res.data.success) {
        setBlogs(prev => prev.map(blog => 
          blog.id === blogId ? { ...blog, likesCount: res.data.data.likesCount } : blog
        ));
        toast.success("Updated reaction", { icon: '❤️' });
      }
    } catch (err) {
      toast.error("Could not update like");
    } finally {
      setIsLiking(false);
    }
  };

  // Logic to handle both Category filter and Search filter
  const filteredArticles = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = activeCategory === "All" || blog.categoryName?.trim() === activeCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="flex flex-col mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#00bf63] mb-4">
              Intelligence & Insights
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#090044] leading-tight">
              The Tech Journal <span className="text-[#00bf63]">.</span>
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-4">
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#090044] text-white shadow-xl translate-y-[-2px]"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-[#090044]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Added Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-full text-sm focus:bg-white focus:border-[#00bf63] transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Article Feed */}
        <div className="grid grid-cols-1 gap-24 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#00bf63] animate-spin mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching Journal...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <>
              {filteredArticles.map((blog) => (
                <article key={blog.id} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="lg:col-span-6 relative overflow-hidden rounded-2xl aspect-[16/9] shadow-lg bg-gray-50">
                    <Link href={`/blogs/${blog.slug}?id=${blog.id}`}>
                      <Image
                        src={blog.imageUrl || "/Images/placeholder.png"}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </Link>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-6">
                      <span className="flex items-center gap-1.5 text-[#00bf63]"><User size={14} /> {blog.authorName}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <Link href={`/blogs/${blog.slug}?id=${blog.id}`}>
                      <h4 className="text-2xl md:text-3xl font-black text-[#090044] hover:text-[#00bf63] transition-colors leading-[1.2] mb-6">
                        {blog.title}
                      </h4>
                    </Link>
                    
                    <div className="text-gray-500 text-lg leading-relaxed mb-8 line-clamp-3 prose prose-sm max-w-none 
                        prose-p:m-0 prose-headings:text-base prose-headings:m-0">
                      <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleToggleLike(blog.id)}
                          disabled={isLiking}
                          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all active:scale-90"
                        >
                          <Heart size={20} className={isLiking ? "animate-pulse" : ""} />
                          <span className="text-sm font-bold text-gray-600">{blog.likesCount}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MessageCircle size={20} />
                          <span className="text-sm font-bold text-gray-600">{blog.commentsCount}</span>
                        </div>
                      </div>
                      
                      <Link href={`/blogs/${blog.slug}?id=${blog.id}`} className="flex items-center gap-1 text-sm font-black uppercase tracking-tighter text-[#090044] group-hover:gap-3 transition-all">
                        Read Story <ArrowRight size={18} className="text-[#00bf63]" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {/* Added Pagination UI */}
              <div className="flex items-center justify-center gap-4 pt-16 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-gray-200 text-[#090044] hover:bg-[#090044] hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#090044] transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-full text-xs font-black transition-all ${
                        currentPage === i + 1
                          ? "bg-[#00bf63] text-white shadow-lg"
                          : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-gray-200 text-[#090044] hover:bg-[#090044] hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#090044] transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Filter size={48} className="mb-4 opacity-20" />
              <p className="text-xl font-medium">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}