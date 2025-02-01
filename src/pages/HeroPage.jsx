import Hero from "@/Hero/Hero";

const HeroPage = () => {
    const images = [
        ['wildlife', 'images/wildlife_main.png', '#D72638'],
        ['nature', 'images/nature_main.png', '#DEA81A'],
        ['history', 'images/history_main.png', '#7D8D83'],
    ]

    return (
        <>
            <Hero images={images} />
        </>
    );
};

export default HeroPage;