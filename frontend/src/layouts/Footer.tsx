import styles from "./Footer.module.css";

const Footer = () => {
  return (
    // <footer className={styles.footer}>
    <footer className="flex justify-around items-center bg-slate-200 min-h-[100px] font-bold">
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
    </footer>
  );
};

export default Footer;
