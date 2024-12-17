import styles from "../styles/Timeline.module.css";

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
                    <p className={styles.timelineOrganization}>{item.organization}</p>
                    <time className={styles.timelineDate}>{item.date}</time>
                    <p className={styles.timelineDescription}>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
