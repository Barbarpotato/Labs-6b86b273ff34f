import { Badge, Text, Box, Heading, Flex } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogCard = ({ article }) => {
    const href = `https://barbarpotato.github.io/Labs-${article.index}/${article.slug}`;

    return (
        <Box
            w="100%"
            bg="#383a4a"
            borderRadius="xl"
            border="1px solid rgba(134, 107, 171, 0.2)"
            p={6}
            className="project-card"
            _hover={{
                boxShadow: '0px 0px 25px rgba(204, 123, 201, 0.25)',
                borderColor: 'rgba(204, 123, 201, 0.4)',
            }}
            transition="all 0.2s ease"
        >
            <Flex wrap="wrap" gap={2} mb={4}>
                {article.categories.map((category) => (
                    <Badge
                        key={category}
                        bg="rgba(134, 107, 171, 0.15)"
                        color="#866bab"
                        borderRadius="full"
                        px={2.5}
                        py={0.5}
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontSize="xs"
                        fontWeight="500"
                        textTransform="none"
                    >
                        {category}
                    </Badge>
                ))}
            </Flex>

            <Heading
                as="h3"
                fontFamily="'Playfair Display', Georgia, serif"
                fontWeight="700"
                fontSize="xl"
                color="#faf9ff"
                mb={2}
                noOfLines={2}
                lineHeight="1.3"
            >
                <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {article.title}
                </a>
            </Heading>

            <Flex align="center" gap={1.5} mb={4}>
                <FaCalendarAlt size={12} style={{ color: '#866bab', flexShrink: 0 }} />
                <Text fontFamily="'Outfit', system-ui, sans-serif" fontSize="xs" color="#c0c0c0">
                    {formatDate(article.date)}
                </Text>
            </Flex>

            <Text
                fontFamily="'Outfit', system-ui, sans-serif"
                color="#d0d0d0"
                fontSize="sm"
                lineHeight="1.7"
                noOfLines={3}
                mb={5}
            >
                {article.excerpt}
            </Text>

            <Box
                as="a"
                href={href}
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                fontFamily="'Outfit', system-ui, sans-serif"
                fontWeight="500"
                fontSize="sm"
                color="#866bab"
                borderBottom="1px solid"
                borderColor="#866bab"
                _hover={{ color: '#cc7bc9', borderColor: '#cc7bc9' }}
                transition="all 0.2s ease"
                style={{ textDecoration: 'none' }}
            >
                Baca Selengkapnya
                <FiArrowRight size={13} />
            </Box>
        </Box>
    );
};

export default BlogCard;
