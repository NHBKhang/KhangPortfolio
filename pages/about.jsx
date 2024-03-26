const AboutPage = () => {
  return (
    <>
      <h3 style={{color: "red", padding: 5}}>Một chút xíu thông tin về tôi</h3>
      <div style={{padding: 15}}>
        <p> - Họ tên: Nguyễn Hà Bảo Khang</p>
        <p> - Ngày sinh: 29/01/2003</p>
        <p> - Nơi sinh: TP Hồ Chí Minh</p>
        <p> - Giới tính: Nam (for sure)</p>
        <p> - Quốc tịch: Việt Nam</p>
        <p> - Quê quán: Long An</p>
        <p> - Sở thích: Nghe nhạc, anime và bạn :3</p>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
