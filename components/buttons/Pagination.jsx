import { useState } from "react";
import styles from "../../styles/Pagination.module.css";
import { useRouter } from "next/router";

const Pagination = ({ pagination, }) => {
    const router = useRouter();
    const { previous, next, current, total } = pagination;
    const [customPage, setCustomPage] = useState("");

    const onPageChange = (page) => {
        if (page) {
            router.push({
                pathname: router.pathname,
                query: {
                    page, 
                    ...router.query
                }
            }, undefined, { shallow: false, scroll: true });
        }
    };

    // Xử lý khi nhấn nút chuyển trang
    const handlePageClick = (page) => {
        if (page > 0 && page <= total) {
            onPageChange(page);
        }
    };

    // Xử lý nhập số trang thủ công
    const handleCustomPageSubmit = () => {
        const pageNumber = parseInt(customPage, 10);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= total) {
            onPageChange(pageNumber);
            setCustomPage("");
        }
    };

    return (
        <div className={styles.pagination} data-aos="slide-up">
            {/* Nút "Đầu Trang" */}
            <button onClick={() => handlePageClick(1)} disabled={!previous}>
                ⏮
            </button>

            {/* Nút "Trang Trước" */}
            <button onClick={() => handlePageClick(previous)} disabled={!previous}>
                ⬅
            </button>

            {/* Hiển thị số trang trung tâm */}
            {current > 2 && total > 4 && (
                <>
                    <button onClick={() => handlePageClick(1)}>1</button>
                    <input
                        type="number"
                        min={1}
                        max={total}
                        value={customPage}
                        onChange={(e) => setCustomPage(e.target.value)}
                        onBlur={handleCustomPageSubmit}
                        placeholder="..."
                        style={{ width: "50px", textAlign: "center" }}
                    />
                </>
            )}

            {/* 3 số trang trung tâm */}
            {(() => {
                let pages = [];
                if (total <= 3) {
                    pages = Array.from({ length: total }, (_, i) => i + 1);
                } else {
                    let start = Math.max(1, current - 1);
                    let end = Math.min(total, start + 2);
                    if (end === total) start = Math.max(1, total - 2);
                    pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
                return pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => handlePageClick(p)}
                        className={p === current && styles.active}
                    >
                        {p}
                    </button>
                ));
            })()}

            {/* Nút "..." (chỉ hiển thị nếu còn nhiều trang sau) */}
            {current < total - 1 && total > 4 && (
                <>
                    <input
                        type="number"
                        min={1}
                        max={total}
                        value={customPage}
                        onChange={(e) => setCustomPage(e.target.value)}
                        onBlur={handleCustomPageSubmit}
                        placeholder="..."
                        style={{ width: "50px", textAlign: "center" }}
                    />
                    <button onClick={() => handlePageClick(total)}>{total}</button>
                </>
            )}

            {/* Nút "Trang Sau" */}
            <button onClick={() => handlePageClick(next)} disabled={!next}>
                ➡
            </button>

            {/* Nút "Trang Cuối Cùng" */}
            <button onClick={() => handlePageClick(total)} disabled={!next}>
                ⏭
            </button>
        </div>
    );
};

export default Pagination;
