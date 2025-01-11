import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Games = () => {
    return (
        <div>
            <h1>Stay stuned!</h1>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        },
    };
}

export default Games;