import Head from 'next/head';
import { FaArrowLeft } from 'react-icons/fa';
import { AiOutlineCalendar } from "react-icons/ai";
import {
    Box, Heading, HStack,
    VStack, Text, Tag, TagLabel, Wrap, WrapItem
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from 'react';

import BlogCard from '@/components/BlogCard';

import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml.min.js';


export async function getStaticPaths() {
    const res = await fetch('https://api-barbarpotato.vercel.app/labs?index=6b86b273ff34f');
    if (!res.ok) return { paths: [], fallback: false };

    const { data } = await res.json();
    return {
        paths: data.map(article => ({ params: { slug: article.slug } })),
        fallback: false
    };
}


export async function getStaticProps({ params }) {
    const res = await fetch(`https://api-barbarpotato.vercel.app/labs?slug=${params.slug}`);
    if (!res.ok) return { notFound: true };

    let article = await res.json();
    if (article.data) article = article.data[0];

    const res2 = await fetch(`https://api-barbarpotato.vercel.app/labs/search?blog_id=${article.blog_id}`);
    const data = await res2.json();
    const tagArticles = data.data[0];

    const tags = tagArticles.tags.join(',');
    const recommendedRes = await fetch(`https://api-barbarpotato.vercel.app/labs/search?tag=${tags}`);
    const recommendedData = await recommendedRes.json();

    const recommendedPosts = (recommendedData.data || [])
        .filter((p) => p.blog_id !== article.blog_id)
        .slice(0, 3);

    return { props: { article, recommendedPosts } };
}


export default function ArticlePage({ article, recommendedPosts }) {
    const [isMobile, setIsMobile] = useState(false);
    const [tocVisible, setTocVisible] = useState(false);
    const [toc, setToc] = useState([]);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = article?.description || '';
        const headers = div.querySelectorAll('h1, h2, h3');
        setToc(Array.from(headers).map((header, index) => ({
            id: `toc-header-${index}`,
            text: header.innerText,
            level: parseInt(header.tagName.substring(1)),
        })));
    }, [article]);

    useEffect(() => {
        const contentDiv = document.querySelector('.content');
        const headers = contentDiv?.querySelectorAll('h1, h2, h3') || [];
        headers.forEach((header, index) => {
            header.setAttribute('id', `toc-header-${index}`);
        });
    }, [article]);

    useEffect(() => {
        const contentDiv = document.querySelector('.content');
        const preTags = contentDiv?.querySelectorAll('pre') || [];
        const codeTags = contentDiv?.querySelectorAll('code') || [];

        preTags.forEach(tag => {
            tag.style.maxWidth = '100%';
            tag.style.overflowX = 'auto';
        });

        codeTags.forEach(tag => {
            tag.classList.add('language-js');
        });

        Prism.highlightAll();

        const observer = new MutationObserver(() => Prism.highlightAll());
        if (contentDiv) observer.observe(contentDiv, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [article]);

    return (
        <>
            <Head>
                <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445" />
                <title>{article.title}</title>
                <meta name="description" content={article.short_description} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.short_description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://barbarpotato.github.io/labs/${article.slug}`} />
            </Head>

            {/* ── Table of Contents (fixed left) ── */}
            <div style={{ position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1000 }}>

                {/* Desktop TOC */}
                {!isMobile && (
                    <div
                        onMouseEnter={() => setTocVisible(true)}
                        onMouseLeave={() => setTocVisible(false)}
                        style={{
                            backgroundColor: '#2a2540',
                            border: '1px solid rgba(134, 107, 171, 0.3)',
                            borderLeft: 'none',
                            padding: tocVisible ? '16px 18px' : 0,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            overflow: 'hidden',
                            maxHeight: '75vh',
                            overflowY: tocVisible ? 'auto' : 'hidden',
                            boxShadow: '4px 0 20px rgba(0,0,0,0.35)',
                            transition: 'width 0.3s ease, padding 0.3s ease',
                            width: tocVisible ? '260px' : '26px',
                            fontFamily: "'Outfit', system-ui, sans-serif",
                        }}
                    >
                        {!tocVisible ? (
                            <div style={{
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                cursor: 'pointer',
                                color: '#866bab',
                                fontWeight: '700',
                                padding: '16px 0 16px 14px',
                                letterSpacing: '0.12em',
                                fontSize: '0.6rem',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                            }}>
                                Table of Contents
                            </div>
                        ) : (
                            <>
                                <div style={{
                                    color: '#866bab',
                                    fontWeight: '700',
                                    fontSize: '0.6rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    marginBottom: '14px',
                                    whiteSpace: 'nowrap',
                                }}>
                                    Table of Contents
                                </div>
                                {toc.map(item => (
                                    <div key={item.id} style={{ marginLeft: (item.level - 1) * 14, padding: '4px 0' }}>
                                        <a
                                            href={`#${item.id}`}
                                            style={{
                                                color: '#c0c0c0',
                                                textDecoration: 'none',
                                                fontSize: '0.78rem',
                                                lineHeight: 1.5,
                                                display: 'block',
                                                transition: 'color 0.2s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#cc7bc9'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#c0c0c0'}
                                        >
                                            {item.text}
                                        </a>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Mobile TOC */}
                {isMobile && (
                    <>
                        <button
                            onClick={() => setTocVisible(prev => !prev)}
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: 0,
                                transform: 'translateY(-50%)',
                                zIndex: 1100,
                                backgroundColor: '#2a2540',
                                color: '#866bab',
                                border: '1px solid rgba(134, 107, 171, 0.4)',
                                borderLeft: 'none',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                padding: '8px 4px',
                                cursor: 'pointer',
                                writingMode: 'vertical-rl',
                                fontSize: '0.55rem',
                                fontWeight: '700',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                height: 68,
                                width: 22,
                                fontFamily: "'Outfit', system-ui, sans-serif",
                            }}
                        >
                            TOC
                        </button>

                        {tocVisible && (
                            <div style={{
                                position: 'fixed',
                                top: '50%',
                                left: 28,
                                transform: 'translateY(-50%)',
                                backgroundColor: '#2a2540',
                                border: '1px solid rgba(134, 107, 171, 0.3)',
                                padding: '14px 18px',
                                borderRadius: 12,
                                maxHeight: '70vh',
                                width: '220px',
                                overflowY: 'auto',
                                boxShadow: '4px 4px 20px rgba(0,0,0,0.4)',
                                zIndex: 1099,
                                fontFamily: "'Outfit', system-ui, sans-serif",
                            }}>
                                <div style={{
                                    color: '#866bab',
                                    fontWeight: '700',
                                    fontSize: '0.6rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}>
                                    Table of Contents
                                </div>
                                {toc.map(item => (
                                    <div key={item.id} style={{
                                        marginLeft: (item.level - 1) * 12,
                                        padding: '5px 0',
                                        borderBottom: '1px solid rgba(134, 107, 171, 0.1)',
                                    }}>
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => setTocVisible(false)}
                                            style={{ color: '#c0c0c0', textDecoration: 'none', fontSize: '0.8rem', display: 'block' }}
                                        >
                                            {item.text}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ── Article ── */}
            <Box as="article" bg="#292b37" minH="100vh">

                {/* ── Hero ── */}
                <Box
                    position="relative"
                    overflow="hidden"
                    pt={{ base: 10, md: 16 }}
                    pb={{ base: 8, md: 12 }}
                    borderBottom="1px solid rgba(134, 107, 171, 0.12)"
                >
                    {/* Ambient glow decoration */}
                    <Box
                        position="absolute"
                        top="-80px"
                        left="50%"
                        transform="translateX(-50%)"
                        w="700px"
                        h="320px"
                        borderRadius="full"
                        bg="rgba(134, 107, 171, 0.05)"
                        filter="blur(80px)"
                        pointerEvents="none"
                    />

                    <Box mx="auto" maxW="720px" px={{ base: 5, md: 8 }} position="relative">

                        {/* Back button */}
                        <Box
                            as="button"
                            onClick={() => window.location.href = '/Labs/'}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            mb={10}
                            color="#866bab"
                            fontFamily="'Outfit', system-ui, sans-serif"
                            fontSize="sm"
                            fontWeight="500"
                            transition="color 0.2s ease"
                            _hover={{ color: "#cc7bc9" }}
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            p={0}
                        >
                            <FaArrowLeft size={13} />
                            Back to Labs
                        </Box>

                        {/* Tags */}
                        <Wrap spacing={2} mb={6}>
                            {article.tags.map((tag, i) => (
                                <WrapItem key={i}>
                                    <Tag
                                        size="sm"
                                        borderRadius="full"
                                        bg="rgba(134, 107, 171, 0.1)"
                                        border="1px solid rgba(134, 107, 171, 0.4)"
                                        color="#866bab"
                                        fontFamily="'Outfit', system-ui, sans-serif"
                                        fontWeight="500"
                                        px={3}
                                        py={1}
                                    >
                                        <TagLabel fontSize="xs">{tag}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>

                        {/* Title */}
                        <Heading
                            fontFamily="'Playfair Display', Georgia, serif"
                            fontWeight="800"
                            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                            color="#faf9ff"
                            lineHeight="1.2"
                            letterSpacing="-0.01em"
                            mb={6}
                        >
                            {article.title}
                        </Heading>

                        {/* Date */}
                        <HStack spacing={2}>
                            <AiOutlineCalendar size={15} style={{ color: '#866bab', flexShrink: 0 }} />
                            <Text
                                fontFamily="'Outfit', system-ui, sans-serif"
                                fontSize="sm"
                                color="#c0c0c0"
                            >
                                {article.timestamp}
                            </Text>
                        </HStack>
                    </Box>
                </Box>

                {/* ── Content body ── */}
                <Box mx="auto" maxW="720px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
                    <div
                        className="content"
                        style={{ overflowX: 'auto' }}
                        dangerouslySetInnerHTML={{ __html: article.description }}
                    />
                </Box>

                {/* ── Recommended posts ── */}
                {recommendedPosts.length > 0 && (
                    <Fragment>
                        <Box
                            bg="rgba(56, 58, 74, 0.35)"
                            borderTop="1px solid rgba(134, 107, 171, 0.12)"
                            py={{ base: 12, md: 16 }}
                        >
                            <Box mx="auto" maxW="720px" px={{ base: 5, md: 8 }}>

                                {/* Section heading */}
                                <Box mb={10}>
                                    <Heading
                                        fontFamily="'Playfair Display', Georgia, serif"
                                        fontWeight="800"
                                        fontStyle="italic"
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        color="#faf9ff"
                                        display="inline-block"
                                    >
                                        Artikel{" "}
                                        <Box as="span" position="relative" display="inline-block">
                                            Terkait
                                            <svg
                                                viewBox="0 0 200 14"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-6px',
                                                    left: 0,
                                                    width: '100%',
                                                    overflow: 'visible',
                                                    pointerEvents: 'none',
                                                }}
                                            >
                                                <path
                                                    d="M 4,7 C 50,1 150,1 196,7"
                                                    fill="none"
                                                    stroke="#cc7bc9"
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </Box>
                                    </Heading>
                                </Box>

                                <VStack spacing={5}>
                                    {recommendedPosts.map((post) => (
                                        <BlogCard
                                            key={post.blog_id}
                                            article={{
                                                id: post.blog_id,
                                                title: post.title,
                                                slug: post.slug,
                                                excerpt: post.short_description,
                                                date: post.timestamp,
                                                index: post.index,
                                                categories: post.tags,
                                                image: post.image
                                            }}
                                        />
                                    ))}
                                </VStack>
                            </Box>
                        </Box>
                    </Fragment>
                )}

            </Box>
        </>
    );
}
