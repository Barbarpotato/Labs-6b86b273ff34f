import React from "react";
import {
    Box,
    Container,
    Flex,
    Grid,
    Text,
    Link,
    HStack,
    VStack,
    Icon,
} from "@chakra-ui/react";
import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTiktok,
    FaWhatsapp,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const NAV_LINKS = [
    { label: "Beranda", href: "https://barbarpotato.github.io/" },
    { label: "Tentang", href: "https://barbarpotato.github.io/About/" },
    { label: "Labs", href: "https://barbarpotato.github.io/Labs/" },
];

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/Barbarpotato",
        icon: FaGithub,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/darmawan-jr-b16135220/",
        icon: FaLinkedin,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/darmajr94?igsh=OGgwNTRnaGFxeTY1",
        icon: FaInstagram,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@darma.devforeverybody",
        icon: FaTiktok,
    },
    {
        label: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=6282148282424&text&type=phone_number&app_absent=0",
        icon: FaWhatsapp,
    },
];

const CONNECT_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/Barbarpotato",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/darmawan-jr-b16135220/",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/darmajr94?igsh=OGgwNTRnaGFxeTY1",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@darma.devforeverybody",
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box as="footer" bg="#ffffff" borderTop="1px solid rgba(0, 0, 0, 0.15)" position="relative" overflow="hidden">
            {/* ── Main footer columns ── */}
            <Container maxW="7xl" position="relative" zIndex={1}>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        md: "2fr 1fr 1fr",
                    }}
                    gap={{ base: 12, md: 16 }}
                    py={{ base: 14, md: 16 }}
                    borderBottom="1px solid rgba(0, 0, 0, 0.12)"
                >
                    {/* Brand column */}
                    <Box>
                        {/* Wordmark */}
                        <Flex align="flex-end" gap="2px" mb={4}>
                            <Text
                                fontFamily="'Space Grotesk', system-ui, sans-serif"
                                fontWeight="900"
                                fontSize="2xl"
                                color="#000000"
                                letterSpacing="-0.03em"
                                lineHeight="1"
                            >
                                DARMA
                            </Text>
                            <Text
                                fontFamily="'Space Grotesk', system-ui, sans-serif"
                                fontWeight="900"
                                fontSize="2xl"
                                color="#000000"
                                letterSpacing="-0.03em"
                                lineHeight="1"
                            >
                                WAN
                            </Text>
                            <Box
                                w="5px"
                                h="5px"
                                borderRadius="full"
                                bg="#000000"
                                ml="2px"
                                mb="3px"
                            />
                        </Flex>

                        <Box
                            w="36px"
                            h="2px"
                            bg="#000000"
                            borderRadius="full"
                            mb={5}
                        />

                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            color="#666666"
                            fontSize="md"
                            lineHeight="1.85"
                            maxW="300px"
                            mb={7}
                        >
                            Software Engineer, Content Creator, dan penulis
                            e-book yang fokus pada pola pikir pengembangan
                            perangkat lunak.
                        </Text>

                        {/* Social icons */}
                        <HStack spacing={4}>
                            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="social-icon"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    borderRadius="full"
                                    border="1px solid rgba(0, 0, 0, 0.35)"
                                    color="#000000"
                                    _hover={{
                                        borderColor: "#000000",
                                        bg: "rgba(0, 0, 0, 0.08)",
                                    }}
                                    transition="all 0.25s ease"
                                >
                                    <Icon as={icon} boxSize={4} />
                                </Link>
                            ))}
                        </HStack>
                    </Box>

                    {/* Navigation column */}
                    <Box>
                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            fontWeight="700"
                            fontSize="10px"
                            letterSpacing="0.22em"
                            textTransform="uppercase"
                            color="#000000"
                            mb={6}
                        >
                            Navigasi
                        </Text>
                        <VStack align="flex-start" spacing={4}>
                            {NAV_LINKS.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    color="#666666"
                                    fontSize="md"
                                    fontWeight="400"
                                    _hover={{ color: "#000000" }}
                                    transition="color 0.2s ease"
                                >
                                    {label}
                                </Link>
                            ))}
                        </VStack>
                    </Box>

                    {/* Connect column */}
                    <Box>
                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            fontWeight="700"
                            fontSize="10px"
                            letterSpacing="0.22em"
                            textTransform="uppercase"
                            color="#000000"
                            mb={6}
                        >
                            Terhubung
                        </Text>
                        <VStack align="flex-start" spacing={4}>
                            {CONNECT_LINKS.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="inline-flex"
                                    alignItems="center"
                                    gap={1.5}
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    color="#666666"
                                    fontSize="md"
                                    fontWeight="400"
                                    _hover={{ color: "#000000" }}
                                    transition="color 0.2s ease"
                                >
                                    {label}
                                    <FiArrowUpRight size={14} style={{ opacity: 0.5 }} />
                                </Link>
                            ))}
                        </VStack>
                    </Box>
                </Grid>

                {/* ── Bottom bar ── */}
                <Flex
                    justify="space-between"
                    align="center"
                    py={5}
                    direction={{ base: "column", md: "row" }}
                    gap={2}
                >
                    <Text
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontSize="sm"
                        color="rgba(0, 0, 0, 0.45)"
                    >
                        © {currentYear} Barbarpotato. All rights reserved.
                    </Text>
                    <Text
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontSize="sm"
                        color="rgba(0, 0, 0, 0.45)"
                    >
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;
