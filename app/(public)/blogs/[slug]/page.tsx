"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Loader2,
  Send,
  Reply,
  Trash2,
  Clock,
  Calendar,
} from "lucide-react";
import { BlogService, BlogItem } from "@/lib/blog";
import api from "@/lib/api";
import toast from "react-hot-toast";

function BlogContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const blogIdFromQuery = searchParams.get("id");

  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // AUTH
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setIsAuthenticated(true);
        setCurrentUser(res.data);
        setAuthLoading(false);
      } catch {
        router.replace("/auth/login");
      }
    };
    checkAuth();
  }, []);

  // FETCH
  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    const identifier = blogIdFromQuery || (params.slug as string);
    const res = await BlogService.getBlogDetails(identifier);
    const data = res.data.data;
    setBlog(data);
    setComments(data.comments || []);
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // POST COMMENT
  const handlePostComment = async (parentId: string | null = null) => {
    if (!blog?.id) return;

    const content = parentId ? replyText : newComment;
    if (!content.trim()) return;

    setIsSubmitting(true);

    await BlogService.createComment({
      blogId: blog.id,
      content,
      parentId,
    });

    setNewComment("");
    setReplyText("");
    setReplyingTo(null);
    fetchData();
    setIsSubmitting(false);
  };

  // DELETE COMMENT
  const handleDeleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    await BlogService.deleteComment(id);
    fetchData();
  };

  // LIKE TOGGLE
  const handleToggleLike = async () => {
    if (!blog || isLiking) return;

    try {
      setIsLiking(true);

      const res = await BlogService.toggleLike(blog.id);

      if (res.data.success) {
        setBlog((prev) =>
          prev
            ? {
                ...prev,
                likesCount: res.data.data.likesCount,
              }
            : null
        );
      }
    } catch {
      toast.error("Failed to toggle like");
    } finally {
      setIsLiking(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00bf63]" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* HEADER */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <Link href="/blogs" className="text-sm text-gray-400">
            ← Back
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mt-8">

            <Image
              src={blog?.imageUrl || "/placeholder.png"}
              alt=""
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />

            <div>
              <h1 className="text-4xl font-black text-[#090044]">
                {blog?.title}
              </h1>

              {/* META + LIKE */}
              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">

                <span className="flex items-center gap-1">
                  <Clock size={14} /> 6 min
                </span>

                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(blog?.createdAt || "").toDateString()}
                </span>

                {/* LIKE BUTTON */}
                <button
                  onClick={handleToggleLike}
                  className="flex items-center gap-2 text-red-500 font-semibold hover:scale-105 transition"
                >
                  <Heart
                    size={16}
                    className={`${isLiking ? "animate-pulse" : ""} fill-red-500`}
                  />
                  {blog?.likesCount || 0}
                </button>

                {/* COMMENT COUNT */}
                <span className="flex items-center gap-1 text-[#00bf63] font-semibold">
                  <MessageCircle size={14} />
                  {blog?.commentsCount || 0}
                </span>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6">
        <main className="py-16">

          {/* MARKDOWN */}
                   {/* ARTICLE */}
       <article className="prose prose-lg prose-slate max-w-4xl prose-headings:text-[#090044] prose-headings:font-black prose-p:leading-[1.8] prose-p:text-gray-600">
  <ReactMarkdown
    components={{
      h1: ({ children }) => (
        <h1 className="text-4xl font-black mt-10 mb-6 text-[#090044]">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-8 mb-4 text-[#090044]">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-6 mb-3 text-[#090044]">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-gray-600 leading-7 mb-4">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-6 space-y-2 mb-4">
          {children}
        </ul>
      ),
      li: ({ children }) => (
        <li className="text-gray-600">
          {children}
        </li>
      ),
      strong: ({ children }) => (
        <strong className="font-bold text-[#090044]">
          {children}
        </strong>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00bf63] font-semibold underline hover:text-[#090044]"
        >
          {children}
        </a>
      ),
      img: ({ src, alt }) => (
        <img
          src={src || ""}
          alt={alt || ""}
          className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg my-6"
        />
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#00bf63] pl-4 italic text-gray-500 my-6">
          {children}
        </blockquote>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-[#090044]">
          {children}
        </code>
      ),
    }}
  >
    {blog?.content || ""}
  </ReactMarkdown>
</article>

          {/* DIVIDER */}
          <div className="my-12">
            <div className="h-px bg-gray-200" />
          </div>

          {/* COMMENTS */}
          <section>

            <div className="mb-8">
              <h3 className="text-3xl font-black text-[#090044]">
                Comments
              </h3>
              <p className="text-gray-400">
                {blog?.commentsCount} people joined
              </p>
            </div>

            {/* COMMENT BOX */}
            <div className="p-5 bg-gray-50 rounded-2xl border">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 border rounded-xl text-sm"
                placeholder="Write your thoughts..."
              />

              <button
                onClick={() => handlePostComment(null)}
                className="mt-3 px-5 py-2 bg-[#00bf63] text-white rounded-lg text-sm"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="mt-10 space-y-8">
              {comments.map((c) => (
                <div key={c.id} className="p-5 border rounded-2xl bg-white shadow-sm">

                  <div className="flex justify-between items-start">
                    <p className="font-bold text-[#090044] text-sm">
                      {c.userName}
                    </p>

                    {currentUser?.id === c.userId && (
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-600 mt-2 text-sm">{c.content}</p>

                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === c.id ? null : c.id)
                    }
                    className="text-xs text-[#00bf63] mt-3"
                  >
                    Reply
                  </button>

                  {replyingTo === c.id && (
                    <div className="mt-4">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full border p-2 rounded text-sm"
                      />
                      <button
                        onClick={() => handlePostComment(c.id)}
                        className="mt-2 bg-[#090044] text-white px-4 py-2 rounded text-sm"
                      >
                        Send
                      </button>
                    </div>
                  )}

                  {/* REPLIES */}
                  {c.replies?.map((r: any) => (
                    <div key={r.id} className="mt-4 ml-5 pl-4 border-l">

                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-xs">{r.userName}</p>

                        {currentUser?.id === r.userId && (
                          <button
                            onClick={() => handleDeleteComment(r.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm">{r.content}</p>

                    </div>
                  ))}

                </div>
              ))}
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}