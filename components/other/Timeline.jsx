import styles from "../../styles/components/Timeline.module.css";

const Timeline = ({ data }) => {
    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={styles.timelineItem}
                    style={{ animationDelay: `${index * 0.2}s` }}
                >
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineOrganization}>
                        {item.organization}
                    </p>
                    <time className={styles.timelineDate}>{item.date}</time>

                    {Array.isArray(item.description) ? (
                        <ul className={styles.timelineDescription}>
                            {item.description.map((desc, descIndex) => (
                                <li key={descIndex}>{desc}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.timelineDescription}>
                            {item.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Timeline;
