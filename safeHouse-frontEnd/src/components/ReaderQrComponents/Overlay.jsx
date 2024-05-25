
export default function ScanOverlay() {
  return (
    <svg viewBox="0 0 100 100" className="absolute z-10 top-0 left-0 m-2">
      <path fill="none" d="M13,0 L0,0 L0,13" stroke="rgba(255, 0, 0, 0.9)" strokeWidth="2" />
      <path fill="none" d="M0,87 L0,100 L13,100" stroke="rgba(255, 0, 0, 0.9)" strokeWidth="2" />
      <path fill="none" d="M87,100 L100,100 L100,87" stroke="rgba(255, 0, 0, 0.9)" strokeWidth="2" />
      <path fill="none" d="M100,13 L100,0 L87,0" stroke="rgba(255, 0, 0, 0.9)" strokeWidth="2" />
    </svg>
  );
}