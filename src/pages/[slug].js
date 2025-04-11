import Head from 'next/head';
import { MdSupportAgent } from "react-icons/md";
import { Box, Button, Center, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';
import Darwin from '../components/Darwin';

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

    return { props: { article } };
}

export default function ArticlePage({ article }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const [isMobile, setIsMobile] = useState(false);
    const [tocVisible, setTocVisible] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const contentDiv = document.querySelector('.content');
        const preTags = contentDiv?.querySelectorAll('pre') || [];
        const codeTags = contentDiv?.querySelectorAll('code') || [];

        preTags.forEach(tag => {
            tag.style.width = "1024px";
            tag.parentNode.style.overflowX = 'scroll';
            tag.parentNode.style.marginBlock = '15px';
            tag.style.backgroundColor = '#272822';
        });

        codeTags.forEach(tag => {
            tag.classList.add('custom-code');
        });

        const observer = new MutationObserver(() => {
            preTags.forEach(tag => tag.style.width = "1024px");
        });

        if (contentDiv) observer.observe(contentDiv, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [article]);

    // Generate TOC
    const generateTOC = () => {
        const div = document.createElement('div');
        div.innerHTML = article?.description || '';
        const headers = div.querySelectorAll('h1, h2, h3');
        return Array.from(headers).map((header, index) => ({
            id: `toc-header-${index}`,
            text: header.innerText,
            level: parseInt(header.tagName.substring(1)),
        }));
    };

    const toc = generateTOC();

    // Assign IDs to headers in actual DOM
    useEffect(() => {
        const contentDiv = document.querySelector('.content');
        const headers = contentDiv?.querySelectorAll('h1, h2, h3') || [];
        headers.forEach((header, index) => {
            header.setAttribute('id', `toc-header-${index}`);
        });
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

            {/* TOC Component */}
            <Box position="fixed" left="0" top="50%" transform="translateY(-50%)" zIndex="1000">
                {!isMobile ? (
                    <Box
                        onMouseEnter={() => setTocVisible(true)}
                        onMouseLeave={() => setTocVisible(false)}
                        bg="#1E1E1E"
                        p={tocVisible ? 4 : 1}
                        borderTopRightRadius="12px"
                        borderBottomRightRadius="12px"
                        color="white"
                        maxH="80vh"
                        overflowY="auto"
                        transition="width 0.3s ease, padding 0.3s ease"
                        w={tocVisible ? '240px' : '20px'}
                        fontSize="0.9em"
                    >
                        {!tocVisible ? (
                            <Box writingMode="vertical-rl" transform="rotate(180deg)" cursor="pointer" fontWeight="bold" color="#aaa">
                                TOC
                            </Box>
                        ) : (
                            toc.map(item => (
                                <Box key={item.id} ml={(item.level - 1) * 3} py={1} borderBottom="1px solid #333">
                                    <a href={`#${item.id}`} style={{ color: '#f0f0f0', textDecoration: 'none' }}>
                                        {item.text}
                                    </a>
                                </Box>
                            ))
                        )}
                    </Box>
                ) : (
                    <>
                        <Button
                            onClick={() => setTocVisible(prev => !prev)}
                            position="fixed"
                            top="50%"
                            left="8px"
                            transform="translateY(-50%)"
                            zIndex="1100"
                            bg="#3F3F3F"
                            color="white"
                            borderRadius="12px"
                            h="60px"
                            w="28px"
                            fontSize="0.7em"
                            writingMode="vertical-rl"
                            boxShadow="2px 2px 6px rgba(0,0,0,0.3)"
                        >
                            TOC
                        </Button>
                        {tocVisible && (
                            <Box
                                position="fixed"
                                top="50%"
                                left="42px"
                                transform="translateY(-50%)"
                                bg="#1E1E1E"
                                p="12px 25px"
                                borderRadius="8px"
                                color="white"
                                maxH="70vh"
                                w="220px"
                                overflowY="auto"
                                boxShadow="2px 2px 8px rgba(0,0,0,0.3)"
                                zIndex="1099"
                            >
                                {toc.map(item => (
                                    <Box key={item.id} ml={(item.level - 1) * 3} py={1} borderBottom="1px solid #333">
                                        <a href={`#${item.id}`} style={{ color: '#f0f0f0', textDecoration: 'none' }}>
                                            {item.text}
                                        </a>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* Article Content */}
            <article>
                <Box mx="auto" w={{ base: '70%', md: '35%' }}>
                    <Heading color="whitesmoke">{article.title}</Heading>
                </Box>
                <Center pt={2} pb={10}>
                    <Image src={article.image} w={{ base: '70%', md: '35%' }} borderRadius="lg" />
                </Center>
                <Box mx="auto" w={{ base: '70%', md: '35%' }} display="flex" justifyContent="center">
                    <div
                        className="content"
                        style={{ overflowX: 'auto', fontSize: '1.3em' }}
                        dangerouslySetInnerHTML={{ __html: article.description }}
                    />
                </Box>

                {/* Floating Button */}
                {isMobile ? (
                    <button
                        ref={btnRef}
                        onClick={onOpen}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 1000,
                            background: '#6B46C1',
                            borderRadius: '50%',
                            padding: '12px',
                            border: 'none'
                        }}
                    >
                        <MdSupportAgent size={30} color="white" />
                    </button>
                ) : (
                    <Button
                        ref={btnRef}
                        position="fixed"
                        right="20px"
                        bottom="20px"
                        zIndex={1000}
                        colorScheme="purple"
                        onClick={onOpen}
                    >
                        Ask Darwin AI
                    </Button>
                )}
                <Darwin btnRef={btnRef} isOpen={isOpen} onOpen={onOpen} onClose={onClose} content={article.description} />
            </article>
        </>
    );
}
